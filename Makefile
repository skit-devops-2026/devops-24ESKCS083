.PHONY: install test build run docker-build docker-up

install:
	cd Frontend && npm install

test:
	cd Frontend && npm run lint
	cd Frontend && npm test

build:
	cd Frontend && npm run build

run:
	cd Frontend && npm run dev

# Needed from M4 onwards
docker-build:
	docker build -t craftcv-frontend:local .

docker-up:
	docker compose up --build
