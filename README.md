# ADC METADATA TOOL

## Overview
This project is to setup simple web application to provide the user to access information about
the formula, including the contact point if they feel like the data is incorrect or missing, then they will be able to make
a contact directly and hopefully reduce the time to resolve the problem and reduce workload that will come to 3rd Level Support.


## Development

### Prerequitsists
+ nodejs
+ npm
+ bower
+ MongoDB (server)

### Production setup
#### Prerequitsists
+ Mostly support Windows/Mac/Linux, but we highly recommended Linux or Mac
+ Docker (www.docker.com)

#### Instructions
* Build image `docker build -t adcweb:latest https://github.com/simon-fish/adc-meta.git`
* Create container for database `docker run --name db -d mongo`
* Create container for webapp `docker run -p 3000:3000 -itd --link db:mongo --name web adcweb`
* Above command can be executed in any path
* Because this is a production, we don't need to download any source code to machine. We can just build image from github repository
#### Service management
* Stop services `docker stop web && docker stop db`
* Start services `docker start db && docker start web`
* Restart service `docker restart db && docker restart web`

### Development environment setup
* Checkout source code from repository
* Run command `npm install` (Ensure that you are in the same directory as `package.json`)
...This command will automaticall download required node libraries to `node_modules/` folder
* Go to `./web/` directory and run command `bower install` to download all required web components
...for front-end. NOTE: we are using Polymer web component to create UI and make ajax call to REST API
* DB configuration, go to file `./api/config/config.json`, edit `connection_str` to your MongoDB server.
* Node Server configuration, go to file `./api/config/config.json` edit `server` item to provide the service to
...desired port number

### Run server
* Execute command `node server.js`
* REST API documentation: `http://host:port/documentation`, where host and port are configurable
* Front-end UI: `http://host:port/webapp/index.html`, where host and port are configurable


## Migration and Production

We are planing to run this on Docker to keep it simple to migrate to any environment.
