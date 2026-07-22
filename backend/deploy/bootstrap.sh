#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# bootstrap.sh — First-time server provisioning for Strapi
# Run once on a fresh Ubuntu 24.04 (or 22.04) droplet.
#
# Usage:
#   scp deploy/* root@<droplet-ip>:~
#   ssh root@<droplet-ip> ./bootstrap.sh
# ============================================================

STACK_USER="${STACK_USER:-strapi}"
APP_DIR="/opt/${STACK_USER}"
DOMAIN="${DOMAIN:-api.espaciodialogo.com}"

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
mkdir -p "${APP_DIR}/public/uploads"
chown -R "${STACK_USER}:${STACK_USER}" "${APP_DIR}/public"

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
echo "    1. scp your .env file to ${APP_DIR}/.env"
echo "       chmod 600 ${APP_DIR}/.env"
echo "       chown ${STACK_USER}:${STACK_USER} ${APP_DIR}/.env"
echo ""
echo "    2. Deploy the app:"
echo "       git clone <repo> ${APP_DIR}/tmp && mv ${APP_DIR}/tmp/backend/* ${APP_DIR}"
echo "       cd ${APP_DIR} && pnpm install && pnpm build"
echo ""
echo "    3. Start Strapi:"
echo "       systemctl enable --now strapi"
echo "       journalctl -u strapi -f"
echo ""
echo "    4. Set SEED_ON_BOOT=true, restart once to seed, then set back to false"
echo "============================================================"
