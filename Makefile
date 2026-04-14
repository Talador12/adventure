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

# Version from package.json
VERSION := $(shell node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")

################################################################################
#                                 Functions                                    #
################################################################################

# Gate macro: aborts if PRODUCTION_RELEASE is not true
define require_production_release
	@if [ "$(PRODUCTION_RELEASE)" != "true" ]; then \
		echo ""; \
		echo "  PRODUCTION_RELEASE is false. Set to true in Makefile"; \
		echo "  to enable production deployments."; \
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
#                             Play Commands                                    #
################################################################################

play: makeinfo install dev ## [Play] Install deps + start the VTT. Go roll dice.

quickstart: makeinfo ## [Play] First-time walkthrough (who are you?)
	@echo ""
	@echo "  Welcome to Adventure VTT"
	@echo ""
	@echo "  Step 1: make play         starts the app"
	@echo "  Step 2: open localhost:5173 in your browser"
	@echo "  Step 3: click 'Play as Guest' or sign in"
	@echo "  Step 4: create a campaign and invite your party"
	@echo ""
	@echo "  Player     make play (you're done)"
	@echo "  DM         make play, then make dm-guide"
	@echo "  Developer  make dev, then make test"
	@echo "  Designer   make dev, edit src/styles.css"
	@echo "  Modder     make dev, see src/data/ for game data"
	@echo ""
	@echo "  Press ? in-game for keyboard shortcuts."
	@echo "  Press Ctrl+Shift+P for the performance dashboard."
	@echo ""

dm-guide: makeinfo ## [Play] DM quick reference (tools, AI setup, shortcuts)
	@echo ""
	@echo "  Dungeon Master's Toolkit"
	@echo ""
	@echo "  In-game tools (left sidebar):"
	@echo "    AI Encounter Gen    auto-balanced enemy groups"
	@echo "    Ambient Mixer       layer tavern + forest + combat"
	@echo "    Quick NPC Gen       random name, race, personality"
	@echo "    Battle Map          BSP dungeons, 6 presets, fog"
	@echo "    Loot Split          auto-divide gold among party"
	@echo "    Mass HP Tool        damage/heal multiple units"
	@echo "    Session Scheduler   plan next game night"
	@echo "    Campaign Recap      AI summarizes past sessions"
	@echo ""
	@echo "  AI setup (optional):"
	@echo "    Cloud    works out of the box (Workers AI)"
	@echo "    Local    make dev-local-ai (Ollama, LM Studio, etc)"
	@echo "    Offline  graceful fallback, everything still works"
	@echo ""

################################################################################
#                             Test Commands                                    #
################################################################################

test: makeinfo ## [Test] Run all tests (player + worker)
	@$(MAKE) test-player
	@$(MAKE) test-worker

test-player: makeinfo ## [Test] Player mode tests (game logic, no network)
	npx vitest run --config vitest.config.ts

test-worker: makeinfo ## [Test] Worker tests (multiplayer + AI via Miniflare)
	npx vitest run --config vitest.workers.config.ts

test-multiplayer: makeinfo ## [Test] Multiplayer tests only
	npx vitest run --config vitest.workers.config.ts tests/multiplayer/

test-ai: makeinfo ## [Test] AI tests only (fallback + error)
	npx vitest run --config vitest.workers.config.ts tests/ai/

test-ai-live: makeinfo ## [Test] AI tests with live Workers AI (costs money)
	AI_TESTS=live npx vitest run --config vitest.workers.config.ts tests/ai/

test-e2e: makeinfo ## [Test] Playwright E2E browser tests
	npx playwright test

test-all: makeinfo ## [Test] ALL tests (unit + worker + e2e)
	@$(MAKE) test
	@$(MAKE) test-e2e

test-watch: makeinfo ## [Test] All tests in watch mode
	npx vitest --config vitest.config.ts & npx vitest --config vitest.workers.config.ts

################################################################################
#                           Development Commands                               #
################################################################################

dev: makeinfo kill ## [Dev] Start frontend + worker dev servers (foreground)
	@echo "Starting dev servers..."
	@$(VITE) --port $(PORT_FRONTEND) & \
	$(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local & \
	sleep 3 && \
	echo "" && \
	echo "  Frontend: http://localhost:$(PORT_FRONTEND)" && \
	echo "  Backend:  http://localhost:$(PORT_BACKEND)" && \
	echo "  Debugger: http://localhost:$(PORT_INSPECTOR)" && \
	echo "" && \
	wait

dev-bg: makeinfo kill ## [Dev] Start frontend + worker dev servers (background)
	@echo "Starting dev servers in background..."
	@nohup $(VITE) --port $(PORT_FRONTEND) > /tmp/adventure-frontend.log 2>&1 &
	@nohup $(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local > /tmp/adventure-worker.log 2>&1 &
	@sleep 3
	@echo ""
	@echo "  Frontend: http://localhost:$(PORT_FRONTEND)"
	@echo "  Backend:  http://localhost:$(PORT_BACKEND)"
	@echo "  Logs:     tail -f /tmp/adventure-frontend.log /tmp/adventure-worker.log"
	@echo "  Stop:     make kill"
	@echo ""

dev-frontend: makeinfo kill-frontend ## [Dev] Start frontend only (foreground)
	$(VITE) --port $(PORT_FRONTEND)

dev-frontend-bg: makeinfo kill-frontend ## [Dev] Start frontend only (background)
	@nohup $(VITE) --port $(PORT_FRONTEND) > /tmp/adventure-frontend.log 2>&1 &
	@sleep 2
	@echo "Frontend running at http://localhost:$(PORT_FRONTEND) (log: /tmp/adventure-frontend.log)"

dev-worker: makeinfo ## [Dev] Start worker only (foreground)
	$(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local

dev-worker-bg: makeinfo ## [Dev] Start worker only (background)
	@nohup $(WRANGLER) dev --env development --port=$(PORT_BACKEND) --inspector-port=$(PORT_INSPECTOR) --local > /tmp/adventure-worker.log 2>&1 &
	@sleep 3
	@echo "Worker running at http://localhost:$(PORT_BACKEND) (log: /tmp/adventure-worker.log)"

dev-logs: ## [Dev] Tail background server logs
	@tail -f /tmp/adventure-frontend.log /tmp/adventure-worker.log 2>/dev/null || echo "No background logs found. Run 'make dev-bg' first."

dev-status: ## [Dev] Check which dev servers are running
	@echo "Port $(PORT_FRONTEND) (frontend): $$(lsof -ti :$(PORT_FRONTEND) 2>/dev/null | head -1 || echo 'not running')"
	@echo "Port $(PORT_BACKEND) (backend):  $$(lsof -ti :$(PORT_BACKEND) 2>/dev/null | head -1 || echo 'not running')"
	@echo "Port $(PORT_INSPECTOR) (debug):    $$(lsof -ti :$(PORT_INSPECTOR) 2>/dev/null | head -1 || echo 'not running')"

dev-local-ai: makeinfo ## [Dev] Start with local AI (Ollama, LM Studio, etc)
	@echo "  Local AI Mode"
	@echo "  Ensure your AI server is running. Examples:"
	@echo "    Ollama:    ollama serve  (then: ollama pull llama3.1)"
	@echo "    LM Studio: start server on port 1234"
	@echo "    vLLM:      python -m vllm.entrypoints.openai.api_server"
	@echo ""
	@echo "  Add to .dev.vars:"
	@echo "    LOCAL_AI_URL=http://localhost:11434/v1"
	@echo "    LOCAL_AI_MODEL=llama3.1"
	@echo ""
	@$(MAKE) dev

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
#                           Deploy Commands                                    #
################################################################################

deploy: makeinfo ## [Deploy] Deploy worker + pages to staging
	$(MAKE) deploy-worker-staging
	$(WRANGLER) pages deploy public --project-name=adventure --branch=staging

deploy-worker-staging: makeinfo # Deploy Worker to staging
	$(WRANGLER) deploy --env staging

deploy-prod: makeinfo ## [Deploy] Deploy worker + pages to production (gated)
	$(require_production_release)
	$(MAKE) deploy-worker-prod
	$(WRANGLER) pages deploy public --project-name=adventure --branch=main

deploy-worker-prod: makeinfo # Deploy Worker to production (gated)
	$(require_production_release)
	$(WRANGLER) deploy

################################################################################
#                           Release Commands                                   #
################################################################################

release: makeinfo ## [Release] Tag, push, and create GitHub release
	@echo "  Releasing v$(VERSION)"
	@if git tag -l "v$(VERSION)" | grep -q "v$(VERSION)"; then \
		echo "ERROR: Tag v$(VERSION) already exists."; \
		echo "Bump version in package.json first."; \
		exit 1; \
	fi
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "ERROR: Working tree is dirty. Commit or stash first."; \
		exit 1; \
	fi
	git tag -a "v$(VERSION)" -m "Release v$(VERSION)"
	git push origin "v$(VERSION)"
	gh release create "v$(VERSION)" \
		--title "v$(VERSION)" \
		--notes-file - <<< "$$(git log $$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline --no-decorate)" \
		--target staging
	@echo "  Released v$(VERSION)"

release-patch: makeinfo ## [Release] Bump patch (0.1.0 -> 0.1.1), commit, release
	@$(MAKE) _bump-version BUMP=patch
	@$(MAKE) release

release-minor: makeinfo ## [Release] Bump minor (0.1.0 -> 0.2.0), commit, release
	@$(MAKE) _bump-version BUMP=minor
	@$(MAKE) release

_bump-version: makeinfo
	@old_version=$(VERSION); \
	IFS='.' read -r major minor patch <<< "$$old_version"; \
	if [ "$(BUMP)" = "patch" ]; then patch=$$((patch + 1)); \
	elif [ "$(BUMP)" = "minor" ]; then minor=$$((minor + 1)); patch=0; \
	elif [ "$(BUMP)" = "major" ]; then major=$$((major + 1)); minor=0; patch=0; \
	fi; \
	new_version="$$major.$$minor.$$patch"; \
	node -e "const p=require('./package.json');p.version='$$new_version';require('fs').writeFileSync('package.json',JSON.stringify(p,null,2)+'\n')"; \
	git add package.json; \
	git commit -m "chore: bump version to v$$new_version"; \
	echo "Bumped $$old_version -> $$new_version"

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

secrets-google: makeinfo ## [Auth] Set Google OAuth secrets for dev
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

################################################################################
#                             Storage Commands                                 #
################################################################################

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

d1-migrate-dev: makeinfo ## [Storage] Run D1 migrations (local)
	$(WRANGLER) d1 migrations apply adventure-db-dev --local

d1-migrate-staging: makeinfo ## [Storage] Run D1 migrations (staging, remote)
	$(WRANGLER) d1 migrations apply adventure-db-staging --remote

d1-migrate-prod: makeinfo ## [Storage] Run D1 migrations (production, gated)
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
	@for port in $(PORT_FRONTEND) $(PORT_BACKEND) $(PORT_INSPECTOR); do \
		pid=$$(lsof -ti :$$port 2>/dev/null); \
		if [ -n "$$pid" ]; then \
			echo "  :$$port  active (PID $$pid)"; \
		else \
			echo "  :$$port  free"; \
		fi; \
	done
	@echo ""
	@echo "  Branch: $$(git branch --show-current)"
	@echo "  Last commit: $$(git log -1 --oneline)"
	@echo "  PRODUCTION_RELEASE = $(PRODUCTION_RELEASE)"
	@echo ""

################################################################################
#                            Cleanup Commands                                  #
################################################################################

clean: makeinfo kill ## [Cleanup] Kill servers + remove all generated files and dependencies
	rm -rf node_modules package-lock.json .wrangler dist/ .tree-output.txt public .vite

kill: makeinfo ## [Cleanup] Kill all dev server ports (foreground + background)
	@pids_5173=$$(lsof -ti :$(PORT_FRONTEND) 2>/dev/null); if [ -n "$$pids_5173" ]; then echo "Killing port $(PORT_FRONTEND) (pids: $$pids_5173)"; echo $$pids_5173 | xargs kill -9 2>/dev/null; fi
	@pids_8787=$$(lsof -ti :$(PORT_BACKEND) 2>/dev/null); if [ -n "$$pids_8787" ]; then echo "Killing port $(PORT_BACKEND) (pids: $$pids_8787)"; echo $$pids_8787 | xargs kill -9 2>/dev/null; fi
	@pids_9229=$$(lsof -ti :$(PORT_INSPECTOR) 2>/dev/null); if [ -n "$$pids_9229" ]; then echo "Killing port $(PORT_INSPECTOR) (pids: $$pids_9229)"; echo $$pids_9229 | xargs kill -9 2>/dev/null; fi
	@rm -f /tmp/adventure-dev.log /tmp/adventure-frontend.log /tmp/adventure-worker.log
	@echo "All dev servers stopped."

tpk: kill ## [Cleanup] Total Party Kill - alias for 'make kill'

kill-frontend: makeinfo ## [Cleanup] Kill frontend port only
	@pid=$$(lsof -ti :$(PORT_FRONTEND) 2>/dev/null); if [ -n "$$pid" ]; then echo "Killing port $(PORT_FRONTEND)"; echo $$pid | xargs kill -9 2>/dev/null; fi

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

typecheck: makeinfo ## [Utility] TypeScript type checking (no emit)
	npx tsc --noEmit

ci: makeinfo ## [Utility] Full CI: typecheck, lint, build, test
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

MAKECMDGOALS ?=

makeinfo: # Shows the current make command running
	@goal="$(MAKECMDGOALS)"; \
	if [ "$$goal" = "" ] || [ "$$goal" = "makeinfo" ] || [ "$$goal" = "help" ]; then exit 0; fi; \
	echo "" 1>&2; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" 1>&2; \
	echo "  Running: $$goal" 1>&2; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" 1>&2; \
	echo "" 1>&2
