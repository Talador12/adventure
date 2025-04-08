################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help
.DEFAULT_GOAL := help

################################################################################
#                                  Commands                                    #
################################################################################

build: ## Build the frontend and workers
	npm run build && wrangler build

deploy: ## Deploy to Cloudflare Pages and Workers
	npm run deploy && wrangler publish

dev: ## Run dev servers for frontend and workers in parallel (VSCode/WSL/macOS friendly)
	@echo "🚀 Starting frontend and workers dev servers..."
	npm --prefix workers run dev & \
	npm --prefix frontend run dev

lint: ## Lint the code
	npm run lint

format: ## Format code using Prettier
	cd frontend && npm prettier --write .
	cd workers && npm prettier --write .

test: ## Run unit tests
	npm run test

tree: ## Show project directory tree (excluding node_modules, .git, dist)
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 3 > .tree-output.txt

################################################################################
#                            Functions and Helpers                             #
################################################################################

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
