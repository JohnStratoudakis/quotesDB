
# How to delete all docker images from Powershell
# docker images -qa | foreach {docker rmi $_}

APP_NAME=quotesdb
REPO_NAME=johnstratoudakis
IDS=$(shell docker ps --filter 'label=quotes_db' -q)

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
	docker run --name quotes_db --rm --label quotes_db -p 27017:27017 -d mongo

# On Windows, shell
stop_db:
	@echo Stopping Database backend
	@docker stop ${IDS}
	@rem # On Linux/OSX, bash or nothing 
	@rem #docker stop $(shell docker ps --filter "label=quotes_db" -q)

build:
	@echo "Building Docker Container"
	@rem sudo docker build -t ${REPO_NAME}:${APP_NAME} .
	docker build -t ${REPO_NAME}/${APP_NAME}:win -f Dockerfile.win .

run:
	docker run --rm --label ${APP_NAME} -p 3000:3000 ${REPO_NAME}/${APP_NAME}:win

run_it:
	@rem jdocker run --rm -d --label ${APP_NAME} -p 0.0.0.0:3000:3000 ${REPO_NAME}/${APP_NAME}:win
	docker run --rm -it --label ${APP_NAME} -p 3000:3000 ${REPO_NAME}/${APP_NAME}:win cmd.exe

stop:
	docker stop $$(docker ps -q -a --filter label=${APP_NAME})

test:
	yarn test

load_db:
	echo "Loading Database"
