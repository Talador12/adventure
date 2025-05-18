MAKEFLAGS += --no-print-directory --warn-undefined-variables --output-sync=target

################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help makeinfo all
.DEFAULT_GOAL := help
WRANGLER = npx wrangler@latest
VITE = npx vite@latest

################################################################################
#                            Build Commands                                    #
################################################################################

build-assets: makeinfo # Copy all static assets needed for build
	cp -r assets/* public/

build-frontend: makeinfo # Build frontend assets
	$(VITE) build

build-worker: makeinfo # Build Cloudflare Worker
	$(WRANGLER) build

build: makeinfo ## Build both frontend and worker
	make build-worker
	make build-frontend
	make build-assets

################################################################################
#                            Cleanup Commands                                  #
################################################################################

kill: makeinfo # Kill all local ports used by frontend/backend
	@echo "💀 Killing local deployments..."
	@pids_5173=$$(lsof -ti :5173); if [ -n "$$pids_5173" ]; then echo "Killing port 5173: $$pids_5173"; kill -9 $$pids_5173; fi
	@pids_8787=$$(lsof -ti :8787); if [ -n "$$pids_8787" ]; then echo "Killing port 8787: $$pids_8787"; kill -9 $$pids_8787; fi
	@pids_9229=$$(lsof -ti :9229); if [ -n "$$pids_9229" ]; then echo "Killing port 9229: $$pids_9229"; kill -9 $$pids_9229; fi

clean: makeinfo # Remove all generated files and dependencies
	rm -rf node_modules package-lock.json .wrangler dist/ .tree-output.txt public .vite

################################################################################
#                            Deployment Commands                               #
################################################################################

deploy-prod: makeinfo ## Deploy to production (Worker and Pages)
	make deploy-worker-prod
	$(WRANGLER) pages deploy public --project-name=adventure --branch=main

deploy-staging: makeinfo ## Deploy to staging (Worker and Pages)
	make deploy-worker-staging
	$(WRANGLER) pages deploy public --project-name=adventure --branch=staging

deploy-worker-prod: makeinfo # Deploy Worker to production
	$(WRANGLER) deploy

deploy-worker-staging: makeinfo # Deploy Worker to staging
	$(WRANGLER) deploy --env staging

################################################################################
#                            Development Commands                              #
################################################################################

fresh: makeinfo ## Fresh start: install, build, and start local development servers
	make kill
	make upgrade
	make install
	make format
	make build
	make dev

start: makeinfo ## Quick start assuming dependencies are already installed
	make kill
	make build
	make dev

dev-worker: makeinfo # Start Cloudflare Worker in development mode
	@echo "🔑 Checking for DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET secrets..."
	@if [ -z "$$($(WRANGLER) secret list | grep DISCORD_CLIENT_ID)" ] || [ -z "$$($(WRANGLER) secret list | grep DISCORD_CLIENT_SECRET)" ]; then \
		echo "❌ DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET is missing. Please run 'make secrets-development' first."; \
		exit 1; \
	fi
	$(WRANGLER) dev --env development --port=8787 --inspector-port=9229

dev: makeinfo # Start both frontend and backend development servers
	@echo "⚡ Starting backend+frontend servers..."
	npx vite --port 5173 & \
	$(WRANGLER) dev --env development --port=8787 --inspector-port=9229 & \
	sleep 3 && \
	echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo "🌐 Frontend: http://localhost:5173" && \
	echo "🔧 Backend: http://localhost:8787" && \
	echo "🔍 Debugger: http://localhost:9229" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"

################################################################################
#                            Utility Commands                                  #
################################################################################

format: makeinfo ## Format code using Prettier
	npx prettier --write .

amend: makeinfo # Reset last commit and recommit current files using the same message
	@msg="$$(git log -1 --pretty=%B)"; \
	echo "⚠️  Amending last commit: $$msg"; \
	git reset --soft HEAD~1 && \
	make commit M="$$msg"

commit: makeinfo ## Install, format, build, and commit with a message: make commit M='your message'
	@( \
		msg="$(M)"; \
		if [ -z "$$msg" ]; then \
			echo "❌ Please provide a commit message using: make commit M='your message'"; \
			exit 1; \
		fi; \
		grep '^DISCORD_CLIENT_ID' wrangler.toml > .wrangler.secrets.bak; \
		grep '^DISCORD_CLIENT_SECRET' wrangler.toml >> .wrangler.secrets.bak; \
		sed -i.bak -E 's/(DISCORD_CLIENT_ID\s*=\\s*\").*(\")/\\1dev-123\\2/g; s/(DISCORD_CLIENT_SECRET\\s*=\\s*\").*(\")/\\1dev-abc\\2/g' wrangler.toml; \
		make kill; \
		make install; \
		make format; \
		make build; \
		git add .; \
		git commit -m "$$msg"; \
		git push --force; \
		if [ -f .wrangler.secrets.bak ]; then \
			sed -i -E "/DISCORD_CLIENT_ID\\s*=\\s*\\\"/c\\$$(grep '^DISCORD_CLIENT_ID' .wrangler.secrets.bak)" wrangler.toml; \
			sed -i -E "/DISCORD_CLIENT_SECRET\\s*=\\s*\\\"/c\\$$(grep '^DISCORD_CLIENT_SECRET' .wrangler.secrets.bak)" wrangler.toml; \
			rm -f .wrangler.secrets.bak; \
		fi; \
		rm -f wrangler.toml.bak \
	)

install: makeinfo ## Install all dependencies from root only
	NPM_CONFIG_LOGLEVEL=error npm install --save-exact

lint: makeinfo # Check formatting with Prettier
	npx prettier --check .

################################################################################
#                            Secrets Commands                                  #
################################################################################

secrets-staging: makeinfo # Promote Discord secrets from development to staging
	@echo "Promoting DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET from development to staging..."
	$(WRANGLER) secret put DISCORD_CLIENT_ID --env staging
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET --env staging

secrets-development: makeinfo # Set Discord secrets for development environment
	@echo "🔑 Setting Discord secrets for development environment..."
	@read -p "Enter DISCORD_CLIENT_ID: " client_id; \
	read -p "Enter DISCORD_CLIENT_SECRET: " client_secret; \
	echo "Setting secrets..."; \
	echo "$$client_id" | $(WRANGLER) secret put DISCORD_CLIENT_ID --env development; \
	echo "$$client_secret" | $(WRANGLER) secret put DISCORD_CLIENT_SECRET --env development; \
	echo "Creating .dev.vars file..."; \
	echo "DISCORD_CLIENT_ID=$$client_id" > .dev.vars; \
	echo "DISCORD_CLIENT_SECRET=$$client_secret" >> .dev.vars; \
	echo "✅ Secrets set successfully!"

secrets-prod: makeinfo # Promote Discord secrets from staging to production
	@echo "Promoting DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET from staging to prod..."
	$(WRANGLER) secret put DISCORD_CLIENT_ID
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET

################################################################################
#                            Utility Commands                                  #
################################################################################

tree: makeinfo # Output directory tree, excluding common clutter
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 6 > .tree-output.txt
	code -r .tree-output.txt

upgrade: makeinfo ## Upgrade Node (from .nvmrc), npm, and all dependencies
	@echo "📦 Reading Node version from .nvmrc..."
	@export NODE_VERSION=$$(cat .nvmrc); \
	bash -c '\
		export NVM_DIR="$$HOME/.nvm"; \
		[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
		echo "⬇️  Installing Node $$NODE_VERSION..."; \
		nvm install $$NODE_VERSION --reinstall-packages-from=current && \
		nvm alias default $$NODE_VERSION && \
		nvm use $$NODE_VERSION && \
		echo "🔧 Using Node: $$(node -v)"; \
		echo "🔧 Using npm: $$(npm -v)"'
	npm install -g npm-check-updates
	ncu -u

help: makeinfo # Show available make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

makeinfo: # Shows the current make command running
	@goal="$(MAKECMDGOALS)"; \
	if [ "$$goal" = "" ] || [ "$$goal" = "makeinfo" ]; then goal="help"; fi; \
	echo ""; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo "🛠  Running: \033[35m$$goal\033[0m"; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo ""
