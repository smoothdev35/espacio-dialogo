# deploy/Makefile — Deploy automation for Espacio Diálogo Strapi backend
#
# Usage:
#   make setup        — first-time: copy files to droplet, run bootstrap
#   make deploy       — pull latest, install, build, restart
#   make logs         — tail Strapi logs
#   make status       — check service health
#   make rollback     — revert to previous deploy
#   make backup       — snapshot uploads + db

HOST ?= root@api.espaciodialogo.com
APP_DIR ?= /opt/strapi
SSH ?= ssh -o StrictHostKeyChecking=accept-new

.PHONY: setup deploy logs status rollback backup

setup:
	@echo "==> Copying deploy files to droplet (root home)"
	scp deploy/* $(HOST):~/
	@echo "==> Running bootstrap (first-time only)"
	$(SSH) $(HOST) 'bash /root/bootstrap.sh'
	@echo "==> Copy .env manually:  scp .env $(HOST):$(APP_DIR)/.env"

deploy:
	@echo "==> Pulling latest code"
	$(SSH) $(HOST) 'cd $(APP_DIR) && git pull origin main'
	@echo "==> Installing dependencies"
	$(SSH) $(HOST) 'cd $(APP_DIR) && pnpm install --prod'
	@echo "==> Building admin panel"
	$(SSH) $(HOST) 'cd $(APP_DIR) && pnpm run build'
	@echo "==> Restarting Strapi"
	$(SSH) $(HOST) 'systemctl daemon-reload && systemctl restart strapi'
	@echo "==> Healthcheck"
	sleep 5
	curl -sSfI https://$(subst root@,,$(HOST))/admin 2>/dev/null && echo "OK" || echo "WARN: healthcheck failed"

logs:
	$(SSH) $(HOST) 'journalctl -u strapi -f'

status:
	$(SSH) $(HOST) 'systemctl status strapi --no-pager'

# Emergency escape hatch — resets VPS to old commit.
# For CD workflow, prefer: git revert <sha> on repo → Actions deploys automatically.
rollback:
	$(SSH) $(HOST) 'cd $(APP_DIR) && git log --oneline -5'
	@read -p "Enter commit SHA to revert to: " sha; \
	$(SSH) $(HOST) 'cd $(APP_DIR) && git reset --hard $$sha && pnpm install --prod && pnpm run build && systemctl restart strapi'

backup:
	@echo "==> Dumping database"
	$(SSH) $(HOST) 'sudo -u postgres pg_dump strapi > /tmp/strapi-$$(date +%F).sql'
	@echo "==> Archiving uploads with db dump"
	$(SSH) $(HOST) 'tar czf /tmp/strapi-backup-$$(date +%F).tgz -C $(APP_DIR) public/uploads /tmp/strapi-$$(date +%F).sql && rm /tmp/strapi-$$(date +%F).sql'
	@echo "==> Downloading backup"
	scp $(HOST):/tmp/strapi-backup-*.tgz ./backups/
	$(SSH) $(HOST) 'rm /tmp/strapi-backup-*.tgz'
	@echo "Done: backups/"
