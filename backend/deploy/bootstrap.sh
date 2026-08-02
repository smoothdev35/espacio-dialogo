#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# bootstrap.sh — First-time server provisioning for Strapi
# Run once on a fresh Ubuntu 24.04 (or 22.04) droplet.
#
# Usage:
#   scp deploy/* root@<droplet-ip>:~
#   ssh root@<droplet-ip> \
#     REPO=https://github.com/org/repo.git \
#     bash /root/bootstrap.sh
# ============================================================

STACK_USER="${STACK_USER:-strapi}"
APP_DIR="/opt/${STACK_USER}"
DOMAIN="${DOMAIN:-api.espaciodialogo.com}"
REPO="${REPO:-}"

echo "==> Updating system packages"
apt-get update && apt-get upgrade -y

echo "==> Installing system dependencies"
apt-get install -y \
    curl gnupg ca-certificates \
    postgresql postgresql-contrib \
    nginx certbot python3-certbot-nginx \
    git build-essential

echo "==> Installing Node.js 22"
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
corepack enable
npm install -g pnpm

echo "==> Creating ${STACK_USER} user"
id -u "${STACK_USER}" &>/dev/null || useradd -m -s /bin/bash -d "${APP_DIR}" "${STACK_USER}"

echo "==> Configuring PostgreSQL"
sudo -u postgres psql <<SQL
CREATE USER ${STACK_USER} WITH PASSWORD 'changeme-in-env-file';
CREATE DATABASE ${STACK_USER} OWNER ${STACK_USER};
\du
\l
SQL

echo "==> Hardening PostgreSQL"
sudo -u postgres psql -c "ALTER USER ${STACK_USER} SET password_encryption = 'scram-sha-256';"

echo "==> Creating application directory"
mkdir -p "${APP_DIR}"
chown "${STACK_USER}:${STACK_USER}" "${APP_DIR}"

echo "==> Creating uploads directory"
mkdir -p "${APP_DIR}/backend/public/uploads"
chown -R "${STACK_USER}:${STACK_USER}" "${APP_DIR}/backend/public"

if [ -n "${REPO}" ]; then
    echo "==> Cloning repository (sparse — backend + types only)"
    sudo -u "${STACK_USER}" git clone --filter=blob:none --sparse "${REPO}" "${APP_DIR}"
    cd "${APP_DIR}"
    sudo -u "${STACK_USER}" git sparse-checkout set backend types
    echo "==> Repository cloned. Skipping build — .env required first."
else
    echo "==> Skipping repo clone (REPO not set). Clone manually:"
    echo "    ssh ${STACK_USER}@<host> 'cd ${APP_DIR} && git clone --filter=blob:none --sparse <repo> . && git sparse-checkout set backend types'"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Setting up nginx"
rm -f /etc/nginx/sites-enabled/default
cp "${SCRIPT_DIR}/strapi.nginx" "/etc/nginx/sites-available/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${DOMAIN}" /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo "==> Obtaining SSL certificate (if DNS points here)"
certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "admin@${DOMAIN}" || true

echo "==> Installing Strapi systemd service"
cp "${SCRIPT_DIR}/strapi.service" /etc/systemd/system/strapi.service
systemctl daemon-reload

echo ""
echo "============================================================"
echo "  Bootstrap complete!"
echo ""
echo "  Next steps:"
echo "    1. Create .env from deploy/env.tpl"
echo "       scp backend/deploy/env.tpl root@<host>:${APP_DIR}/backend/.env"
echo "       ssh root@<host> 'chmod 600 ${APP_DIR}/backend/.env && chown ${STACK_USER}:${STACK_USER} ${APP_DIR}/backend/.env'"
echo "       ssh root@<host> 'nano ${APP_DIR}/backend/.env'  # fill secrets"
echo ""
echo "    2. Build and start:"
echo "       ssh root@<host> 'cd ${APP_DIR}/backend && pnpm install --prod && pnpm run build'"
echo "       ssh root@<host> 'systemctl enable --now strapi'"
echo ""
echo "    3. Watch logs:"
echo "       ssh root@<host> 'journalctl -u strapi -f'"
echo ""
echo "    4. Set SEED_ON_BOOT=true, restart once to seed, set back to false"
echo ""
echo "    5. Add GitHub secrets: DEPLOY_HOST, DEPLOY_USER, DEPLOY_SSH_KEY"
echo "============================================================"
