lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	cd frontend
	npm run dev

build:
	rm -rf frontend/dist
	npm run build