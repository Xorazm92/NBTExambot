.PHONY: install test dev start build run clean docker-build docker-push deploy help

# Variables
DOCKER_IMAGE = ${DOCKER_HUB_USERNAME}/ngkbot
NODE_ENV ?= development

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make test      - Run tests"
	@echo "  make dev       - Run in development mode"
	@echo "  make start     - Run in production mode"
	@echo "  make build     - Build the application"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-push  - Push Docker image to registry"
	@echo "  make deploy    - Deploy using docker-compose"
	@echo "  make clean     - Clean up node_modules and build artifacts"

install:
	npm install

test:
	npm test

dev:
	NODE_ENV=development npm run dev

start:
	NODE_ENV=production npm start

build:
	npm run build

docker-build:
	docker build -t $(DOCKER_IMAGE):latest .

docker-push:
	docker push $(DOCKER_IMAGE):latest

deploy:
	docker-compose pull
	docker-compose up -d

clean:
	rm -rf node_modules
	rm -rf build
	docker-compose down
	docker system prune -f
