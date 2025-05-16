################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help makeinfo all
.DEFAULT_GOAL := help
WRANGLER = ./node_modules/.bin/wrangler

################################################################################
#                                  Commands                                    #
################################################################################

all: makeinfo ## clean, upgrade, install, format, build, dev server deployed locally
	make clean && \
	make upgrade && \
	make install && \
	make format && \
	make build && \
	make dev

amend: makeinfo ## Reset last commit and recommit current files using the same message
	@msg="$$(git log -1 --pretty=%B)"; \
	echo "⚠️  Amending last commit: $$msg"; \
	git reset --soft HEAD~1 && \
	make commit M="$$msg"

build-pages: makeinfo ## Validate that public/ folder is ready for Pages deploy
	@test -f frontend/public/index.html || (echo "❌ index.html missing in frontend/public"; exit 1)
	@test -f frontend/public/_worker.js || (echo "❌ _worker.js missing in frontend/public"; exit 1)
	@echo "✅ Pages public/ folder looks good."

build: makeinfo ## Validate frontend + build backend Worker (wrangler 4.x)
	make build-pages
	rm -rf .wrangler && $(WRANGLER) build

clean: makeinfo ## Remove dist folders and all node_modules/lockfiles
	@lsof -ti :8787 | xargs kill -9 > /dev/null 2>&1 || true
	@lsof -ti :9229 | xargs kill -9 > /dev/null 2>&1 || true
	rm -rf node_modules package-lock.json .wrangler dist/ || true
	rm -rf .tree-output.txt || true

commit: makeinfo ## Install, format, build, and commit with a message: make commit M='your message'
	@msg="$(M)"; \
	if [ -z "$$msg" ]; then \
		echo "❌ Please provide a commit message using: make commit M='your message'"; \
		exit 1; \
	fi && \
	make install && \
	make format && \
	make build && \
	git add . && \
	git commit -m "$$msg" && \
	git push --force

deploy-prod: makeinfo ## Deploy to Cloudflare Pages (production)
	$(WRANGLER) pages deploy frontend/public --project-name=adventure --branch=main

deploy-staging: makeinfo ## Deploy to Cloudflare Pages (staging branch)
	$(WRANGLER) pages deploy frontend/public --project-name=adventure --branch=staging

dev: makeinfo ## Run both frontend (Pages) and backend (Workers)
	@echo "💀 Killing debugger port 9229 (if needed)..."
	@lsof -ti :9229 | xargs kill -9 > /dev/null 2>&1 || true
	@echo "⚡ Starting backend on http://localhost:8787 (default debugger port 9229)..."
	$(WRANGLER) dev --port=8787 & \
	sleep 2 && \
	echo "⚡ Starting frontend on http://localhost:8788 (inspector on 9333)..." && \
	$(WRANGLER) pages dev frontend/public --inspector-port=9333 --port=8788

format: makeinfo ## Format code using Prettier
	npx prettier --write .

install: makeinfo ## Install all dependencies from root only
	NPM_CONFIG_LOGLEVEL=error npm install --save-exact

lint: makeinfo ## Check formatting with Prettier
	npx prettier --write .

tree: makeinfo ## Output directory tree, excluding common clutter
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 6 > .tree-output.txt
	code -r .tree-output.txt

upgrade: ## Upgrade Node (from .nvmrc), npm, and all dependencies
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

makeinfo: # Show the current Makefile command
	@goal="$(MAKECMDGOALS)"; \
	if [ "$$goal" = "" ] || [ "$$goal" = "makeinfo" ]; then \
		goal="help"; \
	fi; \
	echo ""; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo "🛠  Running: \033[35m$$goal\033[0m"; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo ""
