################################################################################
#                                  Variables                                   #
################################################################################

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

build: ## Build both frontend and backend
	npm run build && wrangler build

clean: ## Remove dist folders and all node_modules/lockfiles
	rm -rf node_modules package-lock.json $(DIST_DIR)
	cd frontend && rm -rf node_modules package-lock.json
	cd workers && rm -rf node_modules package-lock.json

commit: ## Format, test stub, and commit with a message: make commit M='your message'
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

deploy: ## Deploy to Cloudflare Pages and Workers
	npm run deploy && wrangler publish

dev: ## Start dev servers for frontend and workers (parallel)
	@echo "🚀 Starting frontend and workers dev servers..."
	npm --prefix workers run dev & \
	npm --prefix frontend run dev

install: ## Install all dependencies in root, frontend, and workers
	npm install
	cd frontend && npm install
	cd workers && npm install

lint: ## Lint code using ESLint
	npm run lint

format: ## Format code using Prettier
	cd frontend && npx prettier --write .
	cd workers && npx prettier --write .

test: ## Run unit tests
	npm run test

tree: ## Output directory tree, excluding common clutter
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 3 > .tree-output.txt

serve: ## Serve built static frontend (for local testing)
	$(BROWSER_SYNC) --server $(DIST_DIR) --files "$(DIST_DIR)/**/*"

watch: ## Watch for file changes and rebuild CSS/TS
	$(SASS) --watch $(CSS_DIR):$(DIST_DIR)/css &
	$(TSC) --watch &
	$(BROWSER_SYNC) --server $(DIST_DIR) --files "$(DIST_DIR)/**/*"

################################################################################
#                            Functions and Helpers                             #
################################################################################

help: ## Show available make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
