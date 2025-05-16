################################################################################
#                                  Variables                                   #
################################################################################

.PHONY: help makeinfo
.DEFAULT_GOAL := help

################################################################################
#                                  Commands                                    #
################################################################################

amend: ## Reset last commit and recommit current files using the same message
	@msg="$$(git log -1 --pretty=%B)"; \
	echo "⚠️  Amending last commit: $$msg"; \
	git reset --soft HEAD~1 && \
	make commit M="$$msg"

build: makeinfo ## Validate that public/ is ready for Pages deploy
	@test -f frontend/public/index.html || (echo "❌ index.html missing in public/"; exit 1)
	@test -f frontend/public/_worker.js || (echo "❌ _worker.js missing in public/"; exit 1)
	@echo "✅ Pages build folder validated."

clean: makeinfo ## Remove dist folders and all node_modules/lockfiles
	rm -rf node_modules package-lock.json || true
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
	git push --force

deploy-staging: makeinfo ## Deploy to Cloudflare Pages (staging branch)
	cd frontend && npx wrangler pages deploy public --project-name=adventure --branch=staging

deploy-prod: makeinfo ## Deploy to Cloudflare Pages (production)
	cd frontend && npx wrangler pages deploy public --project-name=adventure --branch=main

dev: makeinfo ## Run both frontend (Pages) and backend (Workers)
	@echo "💀 Killing debugger port 9229 (if needed)..."
	@lsof -ti :9229 | xargs kill -9 > /dev/null 2>&1 || true
	@echo "⚡ Starting backend on http://localhost:8787 (default debugger port 9229)..."
	cd workers && npx wrangler dev --port=8787 & \
	sleep 2 && \
	echo "⚡ Starting frontend on http://localhost:8788 (inspector on 9333)..." && \
	cd frontend && npx wrangler pages dev public --inspector-port=9333 --port=8788

format: makeinfo ## Format code using Prettier
	cd frontend && npx prettier --write .
	cd workers && npx prettier --write .

install: makeinfo ## Install all dependencies in root, frontend, and workers
	npm install
	cd frontend && npm install
	cd workers && npm install

lint: makeinfo ## Lint code using ESLint
	npm run lint

test: makeinfo ## Run unit tests
	npm run test

tree: makeinfo ## Output directory tree, excluding common clutter
	tree -I 'node_modules|.git|dist|.next|.turbo' -L 3 > .tree-output.txt

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
