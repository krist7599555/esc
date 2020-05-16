all: install build start

install:
	yarn --cwd emberjs install
	yarn --cwd nestjs  install

build:
	yarn --cwd emberjs build
	yarn --cwd nestjs  build

deploy:
	pm2 deploy ecosystem.config.js production

start:
	pm2 startOrRestart ecosystem.config.js --env production

stop:
	pm2 stop ecosystem.config.js

clear:
	pm2 delete ecosystem.config.js