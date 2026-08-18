# deploy/Makefile — Deploy automation for Espacio Dialogo Strapi backend
#
# Usage:
#   make setup        — first-time: copy files to droplet, run bootstrap (root)
#   make deploy       — pull latest, install, build, restart (strapi + sudo)
#   make logs         — tail Strapi logs (root)
#   make status       — check service health (strapi)
#   make rollback     — revert to previous deploy (strapi + sudo)
#   make backup       — snapshot uploads + db (root)

DOMAIN ?= api.espaciodialogo.com
REPO_DIR ?= /opt/strapi
APP_DIR ?= $(REPO_DIR)/backend
ROOT_KEY ?= ~/.ssh/edd_ssh
CD_KEY ?= ~/.ssh/edd_cd

ROOT_SSH ?= ssh -o StrictHostKeyChecking=accept-new -i $(ROOT_KEY) root@$(DOMAIN)
SSH ?= ssh -o StrictHostKeyChecking=accept-new -i $(CD_KEY) strapi@$(DOMAIN)

.PHONY: setup deploy logs status rollback backup

setup:
	@echo "==> Copying deploy files to droplet (root home)"
	scp -i $(ROOT_KEY) deploy/* root@$(DOMAIN):~/
	@echo "==> Running bootstrap (first-time only)"
	$(ROOT_SSH) 'DOMAIN=$(DOMAIN) bash /root/bootstrap.sh'
	@echo "==> Copy .env manually:  scp -i $(ROOT_KEY) ../.env root@$(DOMAIN):$(APP_DIR)/.env"

deploy:
	@echo "==> Pulling latest code"
	$(SSH) 'cd $(REPO_DIR) && git pull origin main'
	@echo "==> Installing dependencies"
	$(SSH) 'cd $(APP_DIR) && export COREPACK_DEFAULT_TO_LATEST=0 && (command -v corepack >/dev/null 2>&1 && corepack pnpm install || pnpm install)'
	@echo "==> Building admin panel"
	$(SSH) 'cd $(APP_DIR) && NODE_OPTIONS=--max-old-space-size=2048 pnpm run build'
	@echo "==> Updating systemd service"
	$(SSH) 'sudo cp $(REPO_DIR)/backend/deploy/strapi.service /etc/systemd/system/strapi.service && sudo systemctl daemon-reload'
	@echo "==> Restarting Strapi"
	$(SSH) 'sudo systemctl restart strapi'
	@echo "==> Healthcheck"
	sleep 5
	curl -sSfI https://$(DOMAIN)/admin 2>/dev/null && echo "OK" || echo "WARN: healthcheck failed"

logs:
	$(ROOT_SSH) 'journalctl -u strapi -f'

status:
	$(SSH) 'systemctl status strapi --no-pager'

rollback:
	$(SSH) 'cd $(REPO_DIR) && git log --oneline -5'
	@read -p "Enter commit SHA to revert to: " sha; \
	$(SSH) 'cd $(REPO_DIR) && git reset --hard $$sha && cd $(APP_DIR) && export COREPACK_DEFAULT_TO_LATEST=0 && (command -v corepack >/dev/null 2>&1 && corepack pnpm install || pnpm install) && NODE_OPTIONS=--max-old-space-size=2048 pnpm run build && sudo systemctl restart strapi'

backup:
	@echo "==> Dumping database"
	$(ROOT_SSH) 'sudo -u postgres pg_dump strapi > /tmp/strapi-$$(date +%F).sql'
	@echo "==> Archiving uploads with db dump"
	$(ROOT_SSH) 'tar czf /tmp/strapi-backup-$$(date +%F).tgz -C $(APP_DIR) public/uploads /tmp/strapi-$$(date +%F).sql && rm /tmp/strapi-$$(date +%F).sql'
	@echo "==> Downloading backup"
	scp -i $(ROOT_KEY) root@$(DOMAIN):/tmp/strapi-backup-*.tgz ./backups/
	$(ROOT_SSH) 'rm /tmp/strapi-backup-*.tgz'
	@echo "Done: backups/"
