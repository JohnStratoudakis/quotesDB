
APP_NAME=quotesdb
REPO_NAME=johnstratoudakis

ifeq ($(OS),Windows_NT)
    #Windows stuff
    ARCH=Win
else
    #Linux stuff
    ARCH=Linux
endif

.PHONY: test

start_db:
	@echo Starting Database backend
	@echo ARCH=${ARCH}
	docker run --name quotes_db --rm --label quotes_db -p 6379:6379 -d redis

stop_db:
	@echo Stopping Database backend
	@# On Windows, shell
	docker stop $(shell docker ps --filter "label=quotes_db" -q)
	@# On Linux/OSX, bash or nothing 
	#docker stop $(shell docker ps --filter "label=quotes_db" -q)

build:
	@echo "Building Docker Container"
	sudo docker build -t ${REPO_NAME}:${APP_NAME} .

run:
	docker run --rm -d --label ${APP_NAME} -p 0.0.0.0:3000:3000 ${REPO_NAME}:${APP_NAME}

stop:
	docker stop $$(docker ps -q -a --filter label=${APP_NAME})

test:
	yarn test

load_db:
	echo "Loading Database"
