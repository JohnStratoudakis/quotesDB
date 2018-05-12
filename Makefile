
APP_NAME=quotesDB
REPO_NAME=stratoudakis/apps

help:
	@echo
	@echo "Quotes Database"
	@echo
	@echo "Build Docker container"

build:
	@echo "Building Docker Container"
	sudo docker build -t ${REPO_NAME}:${APP_NAME} .

push:
	@echo "Pushing Docker Container to Remote Registry"
	sudo docker push ${REPO_NAME}:${APP_NAME}

run:
	sudo docker run -d -p 0.0.0.0:6379:6379 ${REPO_NAME}:${APP_NAME}

stop:
	sudo docker ps | grep ${APP_NAME} | awk '{print $$1}' | sudo xargs -I{} docker stop {}

test:
	cd app; yarn test
