# Strapi — Espacio Diálogo
# Copy to .env and fill in real values:
#   cp .env.tpl .env && chmod 600 .env && nano .env

HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Secrets (generate with: openssl rand -base64 32)
APP_KEYS=CHANGEME_APP_KEYS_COMMA_SEPARATED
ADMIN_JWT_SECRET=CHANGEME_ADMIN_JWT_SECRET
API_TOKEN_SALT=CHANGEME_API_TOKEN_SALT
TRANSFER_TOKEN_SALT=CHANGEME_TRANSFER_TOKEN_SALT
JWT_SECRET=CHANGEME_JWT_SECRET

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=CHANGEME_DB_PASSWORD

# Media — local for now (backup /opt/strapi/public/uploads/)
PUBLIC_STRAPI_URL=https://api.espaciodialogo.com

# Seed (one-time, disable after bootstrap)
SEED_ON_BOOT=false
