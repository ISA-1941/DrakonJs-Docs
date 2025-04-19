# Path to the Antora playbook
PLAYBOOK=antora-playbook.yml

# Directory where the generated site will be stored
OUTPUT_DIR=./docs

# Target: clean previous build
clean:
	@echo "🧹 Cleaning previous build in $(OUTPUT_DIR)..."
	rm -rf $(OUTPUT_DIR)

# Target: build the site using Antora
build:
	@echo "📘 Building the Antora site..."
	antora $(PLAYBOOK)

# Target: auto-commit with a standard message
commit-auto:
	@echo "📝 Committing with default message..."
	git add .
	git commit -m "📚 Automatic documentation update"
	git push

# Target: commit with a custom message (user input)
commit:
	@read -p "📝 Enter commit message: " msg; \
	git add .; \
	git commit -m "$$msg"; \
	git push

# Target: full process (clean + build + commit with message)
publish: clean build commit
	@echo "🚀 Publishing completed successfully!"

# Optional: full process with automatic commit
publish-auto: clean build commit-auto
	@echo "🚀 Automatic publishing completed!"
