MAKEFLAGS += --no-print-directory --warn-undefined-variables --output-sync=target

################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help makeinfo all
.DEFAULT_GOAL := help
WRANGLER = npx wrangler@latest

################################################################################
#                                  Commands                                    #
################################################################################

all: makeinfo ## clean, upgrade, install, format, build, dev server deployed locally
	make clean
	make upgrade
	make install
	make format
	make build
	make kill
	make dev

amend: makeinfo ## Reset last commit and recommit current files using the same message
	@msg="$$(git log -1 --pretty=%B)"; \
	echo "⚠️  Amending last commit: $$msg"; \
	git reset --soft HEAD~1 && \
	make commit M="$$msg"

build-pages: makeinfo ## Validate that public/ folder is ready for Pages deploy
	@test -f public/index.html || (echo "❌ index.html missing in public/"; exit 1)
	@test -f public/_worker.js || (echo "❌ _worker.js missing in public/"; exit 1)
	@echo "✅ Pages public/ folder looks good."

build: makeinfo ## Build frontend and worker
	npm run build-frontend
	npx wrangler build

build-frontend:
	vite build

clean: makeinfo ## Remove node_modules, lockfiles, dist, wrangler tmp, ports
	rm -rf node_modules package-lock.json .wrangler dist/ .tree-output.txt public .vite

commit: makeinfo ## Install, format, build, and commit with a message: make commit M='your message'
	@msg="$(M)"; \
	if [ -z "$$msg" ]; then \
		echo "❌ Please provide a commit message using: make commit M='your message'"; \
		exit 1; \
	fi && \
	make kill && \
	make install && \
	make format && \
	make build && \
	git add . && \
	git commit -m "$$msg" && \
	git push --force

deploy-prod: makeinfo ## Deploy to Cloudflare Pages (production)
	$(WRANGLER) pages deploy public --project-name=adventure --branch=main

deploy-staging: makeinfo ## Deploy to Cloudflare Pages (staging branch)
	$(WRANGLER) pages deploy public --project-name=adventure --branch=staging

dev: makeinfo ## Run full local dev server with frontend and backend
	@echo "⚡ Starting backend+frontend servers..."
	npx vite --port 5173 & \
	npx wrangler dev --port=8787 --inspector-port=9229 & \
	sleep 3 && \
	echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" && \
	echo "🌐 Frontend: http://localhost:5173" && \
	echo "🔧 Backend: http://localhost:8787" && \
	echo "🔍 Debugger: http://localhost:9229" && \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"

format: makeinfo ## Format code using Prettier
	npx prettier --write .

install: makeinfo ## Install all dependencies from root only
	NPM_CONFIG_LOGLEVEL=error npm install --save-exact

lint: makeinfo ## Check formatting with Prettier
	npx prettier --check .

kill: makeinfo ## Kill all local ports used by frontend/backend
	@echo "💀 Killing local deployments..."
	@pids_5173=$$(lsof -ti :5173); if [ -n "$$pids_5173" ]; then echo "Killing port 5173: $$pids_5173"; kill -9 $$pids_5173; fi
	@pids_8787=$$(lsof -ti :8787); if [ -n "$$pids_8787" ]; then echo "Killing port 8787: $$pids_8787"; kill -9 $$pids_8787; fi
	@pids_9229=$$(lsof -ti :9229); if [ -n "$$pids_9229" ]; then echo "Killing port 9229: $$pids_9229"; kill -9 $$pids_9229; fi

start: makeinfo ## Quick start assuming dependencies are already installed
	make kill
	make build
	make dev

tree: makeinfo ## Output directory tree, excluding common clutter
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

################################################################################
#                            Functions and Helpers                             #
################################################################################

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
