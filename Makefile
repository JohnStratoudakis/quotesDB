
APP_NAME=quotesdb
REPO_NAME=johnstratoudakis

build:
	@echo "Building Docker Container"
	sudo docker build -t ${REPO_NAME}:${APP_NAME} .

run:
	docker run --rm -d --label ${APP_NAME} -p 0.0.0.0:3000:3000 ${REPO_NAME}:${APP_NAME}

stop:
	docker stop $$(docker ps -q -a --filter label=${APP_NAME})

test:
	yarn test
