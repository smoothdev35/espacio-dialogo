#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# bootstrap.sh — First-time server provisioning for Strapi
# Run once on a fresh Ubuntu 24.04 (or 22.04) droplet.
#
# Usage:
#   scp deploy/* root@<droplet-ip>:~
#   ssh root@<droplet-ip> 'DOMAIN=api.espaciodialogo.com bash /root/bootstrap.sh'
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
# Use the package.json-packaged pnpm version (packageManager); corepack downloads it on demand
corepack pnpm --version

echo "==> Creating ${STACK_USER} user"
id -u "${STACK_USER}" &>/dev/null || useradd -m -s /bin/bash -d "${APP_DIR}" "${STACK_USER}"

echo "==> Configuring PostgreSQL"
sudo -u postgres psql <<SQL
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${STACK_USER}') THEN
      CREATE ROLE ${STACK_USER} LOGIN PASSWORD 'changeme-in-env-file';
   END IF;
END
\$\$;
SQL
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '${STACK_USER}'" | grep -q 1 || \
    sudo -u postgres createdb -O "${STACK_USER}" "${STACK_USER}"

echo "==> Hardening PostgreSQL"
sudo -u postgres psql -c "ALTER USER ${STACK_USER} SET password_encryption = 'scram-sha-256';"

echo "==> Creating application directory"
mkdir -p "${APP_DIR}"
chown "${STACK_USER}:${STACK_USER}" "${APP_DIR}"

echo "==> Creating uploads directory"
mkdir -p "${APP_DIR}/backend/public/uploads"
chown -R "${STACK_USER}:${STACK_USER}" "${APP_DIR}/backend"

echo "==> Skipping repo clone (do manually after adding a deploy key):"
echo "    1. Deploy key as ${STACK_USER}:"
echo "       sudo -u ${STACK_USER} ssh-keygen -t ed25519 -C deploy -f ${APP_DIR}/.ssh/id_ed25519 -N ''"
echo "    2. Add public key to GitHub repo (Settings > Deploy keys, read-only)."
echo "    3. Clone sparse (backend + types only):"
echo "       sudo -u ${STACK_USER} ssh-keyscan github.com >> ${APP_DIR}/.ssh/known_hosts"
echo "       sudo -u ${STACK_USER} git clone --filter=blob:none --sparse <repo> /tmp/repo"
echo "       sudo -u ${STACK_USER} git -C /tmp/repo sparse-checkout set backend types"
echo "       sudo -u ${STACK_USER} cp -a /tmp/repo/. ${APP_DIR}/ && rm -rf /tmp/repo"
echo "       chown -R ${STACK_USER}:${STACK_USER} ${APP_DIR}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Setting up nginx"
rm -f /etc/nginx/sites-enabled/default
sed "s/__DOMAIN__/${DOMAIN}/g" "${SCRIPT_DIR}/strapi.nginx" > "/etc/nginx/sites-available/${DOMAIN}"
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
echo "       ssh ${STACK_USER}@<host> 'cd ${APP_DIR}/backend && corepack pnpm install --frozen-lockfile && NODE_OPTIONS=--max-old-space-size=2048 pnpm run build'"
echo "       ssh root@<host> 'systemctl enable --now strapi'"
echo ""
echo "    3. Watch logs:"
echo "       ssh root@<host> 'journalctl -u strapi -f'"
echo ""
echo "    4. Set SEED_ON_BOOT=true, restart once to seed, set back to false"
echo ""
echo "    5. Add GitHub secrets: DEPLOY_HOST, DEPLOY_USER, DEPLOY_SSH_KEY"
echo "============================================================"
