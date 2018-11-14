
# How to delete all docker images from Powershell
# docker images -qa | foreach {docker rmi $_}

APP_NAME=quotesdb
REPO_NAME=johnstratoudakis
IDS=$(shell docker ps --filter 'label=quotes_db' -q)

ifeq ($(OS),Windows_NT)
    ARCH=win
else
	UNAME_S := $(shell uname -s)
	UNAME_M := $(shell uname -m)
    ifeq ($(UNAME_S),Linux)
		ifeq ($(UNAME_M),armv7l)
			ARCH=rpi
		else
			ARCH=linux
		endif
    endif
    ifeq ($(UNAME_S),Darwin)
    	ARCH=osx
    endif
endif

.PHONY: test

echo_arch:
	@echo Kernel = ${UNAME_S}
	@echo Machine = ${UNAME_M}
	@echo Arch = ${ARCH}

start_db_win:
	@echo start_db_win

start_db_linux:
	@echo start_db_linux

start_db_osx:
	@echo start_db_osx
	docker run --name quotes_db --rm --label quotes_db -p 27017:27017 -d mongo

start_db: start_db_${ARCH}
	@echo Starting Database backend

stop_db_win:
	docker stop $(shell docker ps --filter "label=quotes_db" -q)
	rem @docker stop ${IDS}

stop_db_linux:

start_db_rpi:
	@echo Starting Database backend
	@echo ARCH=${ARCH}
	docker run --name quotes_db --rm --label quotes_db -p 27017:27017 -d nonoroazoro/rpi-mongo 

stop_db_osx:
	@docker stop ${IDS}

# On Rpi, shell
stop_db_rpi:
	@echo Stopping Database backend
	docker stop $(shell docker ps --filter "label=quotes_db" -q)

build_rpi:
	@echo "Building Docker Container"
	sudo docker build -t ${REPO_NAME}/${APP_NAME}:rpi .

stop_db: stop_db_${ARCH}
	@echo Stopping Database backend

build_win:
	@#docker build -t ${REPO_NAME}/${APP_NAME}:win -f Dockerfile.win .

build_linux:
	sudo docker build -t ${REPO_NAME}/${APP_NAME}:linux .

build_osx:
	docker build -t ${REPO_NAME}/${APP_NAME}:osx .

build: build_${ARCH}
	@echo "Building Docker Container"

push_win:
	docker push ${REPO_NAME}/${APP_NAME}:win

push_linux:
	docker push ${REPO_NAME}/${APP_NAME}:linux

push_osx:
	docker push ${REPO_NAME}/${APP_NAME}:osx

push: push_${ARCH}
	@echo "Pushing Docker Image"

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
