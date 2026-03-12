MAKEFLAGS += --no-print-directory --warn-undefined-variables --output-sync=target

################################################################################
#                                 Variables                                    #
################################################################################

SHELL := /bin/bash
WRANGLER = npx wrangler
VITE = npx vite

# Flip to true when ready to deploy production. Guards all prod targets.
PRODUCTION_RELEASE := false

# Ports
PORT_FRONTEND := 5173
PORT_BACKEND := 8787
PORT_INSPECTOR := 9229

################################################################################
#                                 Functions                                    #
################################################################################

# Gate macro: aborts if PRODUCTION_RELEASE is not true
define require_production_release
	@if [ "$(PRODUCTION_RELEASE)" != "true" ]; then \
		echo ""; \
		echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
		echo "  PRODUCTION_RELEASE is false. Set to true in Makefile"; \
		echo "  to enable production deployments."; \
		echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
		echo ""; \
		exit 1; \
	fi
endef

################################################################################
#                                 Commands                                     #
################################################################################

.DEFAULT_GOAL := help
.PHONY: help list-targets makeinfo

# Prevent Make from trying to remake Makefile via pattern rule
Makefile: makeinfo ;

################################################################################
#                             Test Commands                                     #
################################################################################

test: makeinfo ## [Test] Run all tests (player + worker)
	@$(MAKE) test-player
	@$(MAKE) test-worker

test-player: makeinfo ## [Test] Run player mode tests (pure game logic, no network)
	npx vitest run --config vitest.config.ts

test-worker: makeinfo ## [Test] Run worker tests (multiplayer + AI via Miniflare)
	npx vitest run --config vitest.workers.config.ts

test-multiplayer: makeinfo ## [Test] Run multiplayer tests only
	npx vitest run --config vitest.workers.config.ts tests/multiplayer/

test-ai: makeinfo ## [Test] Run AI tests only (fallback + error)
	npx vitest run --config vitest.workers.config.ts tests/ai/

test-ai-live: makeinfo ## [Test] Run AI tests with live Workers AI (costs money)
	AI_TESTS=live npx vitest run --config vitest.workers.config.ts tests/ai/

test-watch: makeinfo ## [Test] Run all tests in watch mode
	npx vitest --config vitest.config.ts & npx vitest --config vitest.workers.config.ts

################################################################################
#                           Development Commands                               #
################################################################################

dev: makeinfo kill ## [Dev] Start frontend + worker dev servers
	@echo "Starting dev servers..."
	@$(VITE) --port $(PORT_FRONTEND) & \
	$(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local & \
	sleep 3 && \
	echo "" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo "  Frontend: http://localhost:$(PORT_FRONTEND)" && \
	echo "  Backend:  http://localhost:$(PORT_BACKEND)" && \
	echo "  Debugger: http://localhost:$(PORT_INSPECTOR)" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo ""

dev-frontend: makeinfo kill-frontend ## [Dev] Start frontend only (no worker)
	$(VITE) --port $(PORT_FRONTEND)

dev-worker: makeinfo ## [Dev] Start worker only (no frontend)
	$(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local

start: makeinfo ## [Dev] Quick start: kill, build, dev
	$(MAKE) kill
	$(MAKE) build
	$(MAKE) dev

fresh: makeinfo ## [Dev] Full reset: clean, install, format, build, dev
	$(MAKE) kill
	$(MAKE) clean
	$(MAKE) install
	$(MAKE) format
	$(MAKE) build
	$(MAKE) dev

open: makeinfo ## [Dev] Open frontend in browser
	@open http://localhost:$(PORT_FRONTEND)

################################################################################
#                             Build Commands                                   #
################################################################################

build: makeinfo ## [Build] Build frontend and worker
	$(MAKE) build-frontend
	$(MAKE) build-worker

build-frontend: makeinfo # Build frontend with Vite
	$(VITE) build

build-worker: makeinfo # Build Cloudflare Worker
	$(WRANGLER) build

################################################################################
#                         Staging Deploy Commands                              #
################################################################################

deploy: makeinfo ## [Deploy] Deploy worker + pages to staging (default)
	$(MAKE) deploy-worker-staging
	$(WRANGLER) pages deploy public --project-name=adventure --branch=staging

deploy-worker-staging: makeinfo # Deploy Worker to staging
	$(WRANGLER) deploy --env staging

################################################################################
#                        Production Deploy Commands                            #
################################################################################

release: makeinfo ## [Deploy] Deploy worker + pages to production (gated)
	$(require_production_release)
	$(MAKE) deploy-worker-prod
	$(WRANGLER) pages deploy public --project-name=adventure --branch=main

deploy-worker-prod: makeinfo # Deploy Worker to production (gated)
	$(require_production_release)
	$(WRANGLER) deploy

################################################################################
#                            Auth & Secrets                                    #
################################################################################

login: makeinfo ## [Auth] Authenticate with Cloudflare (wrangler login)
	$(WRANGLER) login

whoami: makeinfo ## [Auth] Show current Cloudflare auth status
	$(WRANGLER) whoami

secrets-development: makeinfo ## [Auth] Set Discord secrets for dev environment
	@read -p "Enter DISCORD_CLIENT_ID: " client_id; \
	read -p "Enter DISCORD_CLIENT_SECRET: " client_secret; \
	echo "Setting secrets..."; \
	echo "$$client_id" | $(WRANGLER) secret put DISCORD_CLIENT_ID --env development; \
	echo "$$client_secret" | $(WRANGLER) secret put DISCORD_CLIENT_SECRET --env development; \
	echo "Creating .dev.vars file..."; \
	echo "DISCORD_CLIENT_ID=$$client_id" > .dev.vars; \
	echo "DISCORD_CLIENT_SECRET=$$client_secret" >> .dev.vars; \
	echo "Secrets set."

secrets-staging: makeinfo ## [Auth] Promote secrets to staging
	$(WRANGLER) secret put DISCORD_CLIENT_ID --env staging
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET --env staging

secrets-google: makeinfo ## [Auth] Set Google OAuth secrets for dev environment
	@read -p "Enter GOOGLE_CLIENT_ID: " client_id; \
	read -p "Enter GOOGLE_CLIENT_SECRET: " client_secret; \
	echo "Setting Google secrets..."; \
	echo "$$client_id" | $(WRANGLER) secret put GOOGLE_CLIENT_ID --env development; \
	echo "$$client_secret" | $(WRANGLER) secret put GOOGLE_CLIENT_SECRET --env development; \
	echo "GOOGLE_CLIENT_ID=$$client_id" >> .dev.vars; \
	echo "GOOGLE_CLIENT_SECRET=$$client_secret" >> .dev.vars; \
	echo "Google secrets set."

secrets-prod: makeinfo ## [Auth] Promote secrets to production (gated)
	$(require_production_release)
	$(WRANGLER) secret put DISCORD_CLIENT_ID
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET

r2-dev: makeinfo ## [Storage] Create R2 bucket for development
	$(WRANGLER) r2 bucket create adventure-maps-dev

r2-staging: makeinfo ## [Storage] Create R2 bucket for staging
	$(WRANGLER) r2 bucket create adventure-maps-staging

r2-prod: makeinfo ## [Storage] Create R2 bucket for production (gated)
	$(require_production_release)
	$(WRANGLER) r2 bucket create adventure-maps-prod

d1-dev: makeinfo ## [Storage] Create D1 database for development
	$(WRANGLER) d1 create adventure-db-dev

d1-staging: makeinfo ## [Storage] Create D1 database for staging
	$(WRANGLER) d1 create adventure-db-staging

d1-prod: makeinfo ## [Storage] Create D1 database for production (gated)
	$(require_production_release)
	$(WRANGLER) d1 create adventure-db-prod

d1-migrate-dev: makeinfo ## [Storage] Run D1 migrations for development (local)
	$(WRANGLER) d1 migrations apply adventure-db-dev --local

d1-migrate-staging: makeinfo ## [Storage] Run D1 migrations for staging (remote)
	$(WRANGLER) d1 migrations apply adventure-db-staging --remote

d1-migrate-prod: makeinfo ## [Storage] Run D1 migrations for production (gated, remote)
	$(require_production_release)
	$(WRANGLER) d1 migrations apply adventure-db-prod --remote

################################################################################
#                          Monitoring Commands                                 #
################################################################################

logs: makeinfo ## [Monitor] Tail worker logs from staging
	$(WRANGLER) tail --env staging

logs-prod: makeinfo ## [Monitor] Tail worker logs from production (gated)
	$(require_production_release)
	$(WRANGLER) tail

status: makeinfo ## [Monitor] Show deploy status and port usage
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  Port Status"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@for port in $(PORT_FRONTEND) $(PORT_BACKEND) $(PORT_INSPECTOR); do \
		pid=$$(lsof -ti :$$port 2>/dev/null); \
		if [ -n "$$pid" ]; then \
			echo "  :$$port — active (PID $$pid)"; \
		else \
			echo "  :$$port — free"; \
		fi; \
	done
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  Git"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  Branch: $$(git branch --show-current)"
	@echo "  Last commit: $$(git log -1 --oneline)"
	@echo ""
	@echo "  PRODUCTION_RELEASE = $(PRODUCTION_RELEASE)"
	@echo ""

################################################################################
#                            Cleanup Commands                                  #
################################################################################

clean: makeinfo ## [Cleanup] Remove all generated files and dependencies
	rm -rf node_modules package-lock.json .wrangler dist/ .tree-output.txt public .vite

kill: makeinfo ## [Cleanup] Kill all dev server ports
	@pids_5173=$$(lsof -ti :$(PORT_FRONTEND)); if [ -n "$$pids_5173" ]; then echo "Killing port $(PORT_FRONTEND)"; kill -9 $$pids_5173; fi
	@pids_8787=$$(lsof -ti :$(PORT_BACKEND)); if [ -n "$$pids_8787" ]; then echo "Killing port $(PORT_BACKEND)"; kill -9 $$pids_8787; fi
	@pids_9229=$$(lsof -ti :$(PORT_INSPECTOR)); if [ -n "$$pids_9229" ]; then echo "Killing port $(PORT_INSPECTOR)"; kill -9 $$pids_9229; fi

kill-frontend: makeinfo # Kill frontend port only
	@pid=$$(lsof -ti :$(PORT_FRONTEND)); if [ -n "$$pid" ]; then echo "Killing port $(PORT_FRONTEND)"; kill -9 $$pid; fi

################################################################################
#                            Utility Commands                                  #
################################################################################

commit: makeinfo ## [Git] Format, build, commit: make commit M='message'
	@( \
		msg="$(M)"; \
		if [ -z "$$msg" ]; then \
			echo "Usage: make commit M='your message'"; \
			exit 1; \
		fi; \
		$(MAKE) kill; \
		$(MAKE) format; \
		$(MAKE) build; \
		git add .; \
		git commit -m "$$msg"; \
		git push \
	)

format: makeinfo ## [Utility] Format code with Prettier
	npx prettier --write .

install: makeinfo ## [Utility] Install dependencies
	NPM_CONFIG_LOGLEVEL=error npm install --save-exact

lint: makeinfo ## [Utility] Check formatting with Prettier
	npx prettier --check .

typecheck: makeinfo ## [Utility] Run TypeScript type checking (no emit)
	npx tsc --noEmit

ci: makeinfo ## [Utility] Run full CI pipeline: typecheck, lint, build, test
	@echo "Running CI pipeline..."
	$(MAKE) typecheck
	$(MAKE) lint
	$(MAKE) build
	$(MAKE) test

tree: makeinfo ## [Utility] Print directory tree
	tree -I 'node_modules|.git|dist|.next|.turbo|public' -L 6

upgrade: makeinfo ## [Utility] Upgrade Node (from .nvmrc) and all dependencies
	@echo "Reading Node version from .nvmrc..."
	@export NODE_VERSION=$$(cat .nvmrc); \
	bash -c '\
		export NVM_DIR="$$HOME/.nvm"; \
		[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
		nvm install $$NODE_VERSION --reinstall-packages-from=current && \
		nvm alias default $$NODE_VERSION && \
		nvm use $$NODE_VERSION'
	npm install -g npm-check-updates
	ncu -u

################################################################################
#                             Help & Info                                      #
################################################################################

help: # Help command
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "} {printf "%s %03d:## %s\n", $$1, length($$1), $$2}' | sort -k1,1 -k2,2n | awk -F':## ' '{split($$1, parts, " "); printf "\033[36m%-30s\033[0m %s\n", parts[1], $$2}'

list-targets: ## [Utility] List all available targets
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$$@$$'

makeinfo: # Shows the current make command running
	@echoerr() { echo "$$@" 1>&2; }; \
	goal="$(MAKECMDGOALS)"; \
	if [ "$$goal" = "" ] || [ "$$goal" = "makeinfo" ]; then goal="help"; fi; \
	echoerr ""; \
	echoerr "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echoerr "🛠  Running: $$goal"; \
	echoerr "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echoerr ""
