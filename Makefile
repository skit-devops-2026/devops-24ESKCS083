.PHONY: install test build run docker-build docker-up

install:
	cd Frontend && npm install

test:
	cd Frontend && npm run lint

build:
	cd Frontend && npm run build

run:
	cd Frontend && npm run dev

# Needed from M4 onwards
docker-build:
	@echo "TODO: docker build for frontend and backend" && exit 1

docker-up:
	docker compose up --build