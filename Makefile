################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help
.DEFAULT_GOAL := help

# Directories
SRC_DIR = src
DIST_DIR = dist
CSS_DIR = $(SRC_DIR)/css
JS_DIR = $(SRC_DIR)/js
TS_DIR = $(SRC_DIR)/ts
ASSETS_DIR = $(SRC_DIR)/assets

# Tools
TSC = npx tsc
SASS = npx sass
BROWSER_SYNC = npx browser-sync start

################################################################################
#                                  Commands                                    #
################################################################################

build: makeinfo ## Build both frontend and backend
	npm run build && wrangler build

clean: makeinfo ## Remove dist folders and all node_modules/lockfiles
	rm -rf node_modules package-lock.json $(DIST_DIR) || true
	cd frontend && rm -rf node_modules package-lock.json || true
	cd workers && rm -rf node_modules package-lock.json || true
	rm -rf .tree-output.txt || true

commit: makeinfo ## Format, test stub, and commit with a message: make commit M='your message'
	@msg="$(M)"; \
	if [ -z "$$msg" ]; then \
		echo "❌ Please provide a commit message using: make commit M='your message'"; \
		exit 1; \
	fi && \
	make format && \
	echo "🧪 Running tests (stub)..." && \
	echo "✅ No tests implemented yet" && \
	git add . && \
	git commit -m "$$msg" && \
	git push

deploy: makeinfo ## Deploy to Cloudflare Pages and Workers
	npm run deploy && wrangler publish

dev: makeinfo ## Start dev servers for frontend and workers (parallel)
	@echo "🚀 Starting frontend and workers dev servers..."
	npm --prefix workers run dev & \
	npm --prefix frontend run dev

format: makeinfo ## Format code using Prettier
	cd frontend && npx prettier --write .
	cd workers && npx prettier --write .

install: makeinfo ## Install all dependencies in root, frontend, and workers
	npm install
	cd frontend && npm install
	cd workers && npm install

lint: makeinfo ## Lint code using ESLint
	npm run lint

serve: makeinfo ## Serve built static frontend (for local testing)
	$(BROWSER_SYNC) --server $(DIST_DIR) --files "$(DIST_DIR)/**/*"

test: makeinfo ## Run unit tests
	npm run test

tree: makeinfo ## Output directory tree, excluding common clutter
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 3 > .tree-output.txt

watch: makeinfo ## Watch for file changes and rebuild CSS/TS
	$(SASS) --watch $(CSS_DIR):$(DIST_DIR)/css &
	$(TSC) --watch &
	$(BROWSER_SYNC) --server $(DIST_DIR) --files "$(DIST_DIR)/**/*"

################################################################################
#                            Functions and Helpers                             #
################################################################################

help: makeinfo ## Show available make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

makeinfo: ## Show the current Makefile command
	@goal="$(MAKECMDGOALS)"; \
	if [ "$$goal" = "" ] || [ "$$goal" = "makeinfo" ]; then \
		goal="help"; \
	fi; \
	echo ""; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo "🛠  Running: \033[35m$$goal\033[0m"; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo ""
