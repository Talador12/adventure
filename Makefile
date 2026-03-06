MAKEFLAGS += --no-print-directory --warn-undefined-variables --output-sync=target

################################################################################
#                                 Variables                                    #
################################################################################

SHELL := /bin/bash
WRANGLER = npx wrangler
VITE = npx vite

################################################################################
#                                 Functions                                    #
################################################################################

################################################################################
#                                 Commands                                     #
################################################################################

.DEFAULT_GOAL := help
.PHONY: help list-targets makeinfo

# Prevent Make from trying to remake Makefile via pattern rule
Makefile: makeinfo ;

################################################################################
#                             Build Commands                                   #
################################################################################

build: makeinfo ## [Build] Build frontend and worker
	make build-worker
	make build-frontend

build-frontend: makeinfo # Build frontend with Vite
	$(VITE) build

build-worker: makeinfo # Build Cloudflare Worker
	$(WRANGLER) build

################################################################################
#                           Development Commands                               #
################################################################################

dev: makeinfo ## [Dev] Start frontend + worker dev servers
	@echo "Starting dev servers..."
	npx vite --port 5173 & \
	$(WRANGLER) dev --env development --port=8787 --inspector-port=9229 & \
	sleep 3 && \
	echo "" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo "  Frontend: http://localhost:5173" && \
	echo "  Backend:  http://localhost:8787" && \
	echo "  Debugger: http://localhost:9229" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo ""

dev-worker: makeinfo # Start Cloudflare Worker only
	$(WRANGLER) dev --env development --port=8787 --inspector-port=9229

fresh: makeinfo ## [Dev] Full reset: upgrade, install, format, build, dev
	make kill
	make upgrade
	make install
	make format
	make build
	make dev

start: makeinfo ## [Dev] Quick start: kill, build, dev
	make kill
	make build
	make dev

################################################################################
#                           Deployment Commands                                #
################################################################################

deploy-prod: makeinfo ## [Deploy] Deploy worker + pages to production
	make deploy-worker-prod
	$(WRANGLER) pages deploy public --project-name=adventure --branch=main

deploy-staging: makeinfo ## [Deploy] Deploy worker + pages to staging
	make deploy-worker-staging
	$(WRANGLER) pages deploy public --project-name=adventure --branch=staging

deploy-worker-prod: makeinfo # Deploy Worker to production
	$(WRANGLER) deploy

deploy-worker-staging: makeinfo # Deploy Worker to staging
	$(WRANGLER) deploy --env staging

################################################################################
#                            Secrets Commands                                  #
################################################################################

secrets-development: makeinfo ## [Secrets] Set Discord secrets for dev environment
	@read -p "Enter DISCORD_CLIENT_ID: " client_id; \
	read -p "Enter DISCORD_CLIENT_SECRET: " client_secret; \
	echo "Setting secrets..."; \
	echo "$$client_id" | $(WRANGLER) secret put DISCORD_CLIENT_ID --env development; \
	echo "$$client_secret" | $(WRANGLER) secret put DISCORD_CLIENT_SECRET --env development; \
	echo "Creating .dev.vars file..."; \
	echo "DISCORD_CLIENT_ID=$$client_id" > .dev.vars; \
	echo "DISCORD_CLIENT_SECRET=$$client_secret" >> .dev.vars; \
	echo "Secrets set."

secrets-staging: makeinfo ## [Secrets] Promote secrets to staging
	$(WRANGLER) secret put DISCORD_CLIENT_ID --env staging
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET --env staging

secrets-prod: makeinfo ## [Secrets] Promote secrets to production
	$(WRANGLER) secret put DISCORD_CLIENT_ID
	$(WRANGLER) secret put DISCORD_CLIENT_SECRET

################################################################################
#                            Cleanup Commands                                  #
################################################################################

clean: makeinfo ## [Cleanup] Remove all generated files and dependencies
	rm -rf node_modules package-lock.json .wrangler dist/ .tree-output.txt public .vite

kill: makeinfo ## [Cleanup] Kill all dev server ports
	@pids_5173=$$(lsof -ti :5173); if [ -n "$$pids_5173" ]; then echo "Killing port 5173"; kill -9 $$pids_5173; fi
	@pids_8787=$$(lsof -ti :8787); if [ -n "$$pids_8787" ]; then echo "Killing port 8787"; kill -9 $$pids_8787; fi
	@pids_9229=$$(lsof -ti :9229); if [ -n "$$pids_9229" ]; then echo "Killing port 9229"; kill -9 $$pids_9229; fi

################################################################################
#                            Utility Commands                                  #
################################################################################

amend: makeinfo # Amend last commit with same message
	@msg="$$(git log -1 --pretty=%B)"; \
	echo "Amending last commit: $$msg"; \
	git reset --soft HEAD~1 && \
	make commit M="$$msg"

commit: makeinfo ## [Git] Format, build, commit: make commit M='message'
	@( \
		msg="$(M)"; \
		if [ -z "$$msg" ]; then \
			echo "Usage: make commit M='your message'"; \
			exit 1; \
		fi; \
		make kill; \
		make format; \
		make build; \
		git add .; \
		git commit -m "$$msg"; \
		git push --force \
	)

format: makeinfo ## [Utility] Format code with Prettier
	npx prettier --write .

install: makeinfo ## [Utility] Install dependencies
	NPM_CONFIG_LOGLEVEL=error npm install --save-exact

lint: makeinfo ## [Utility] Check formatting with Prettier
	npx prettier --check .

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
