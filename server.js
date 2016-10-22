/**
 * File: server.js
 * Description: Node Server
 * Author: Prawit Chaivong
 */

var pkg = require('./package.json');
var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
var Mongoose = require('mongoose');


var routes = require('./api/routes');
var config = require('./api/config').config;
var handlers = require('./api/handlers')



/**
 * Connect to mongoDB
 */
Mongoose.connect(config.DBConfig(), {server: { poolSize: 3}});


/**
 * Create server
 */
var server = new Hapi.Server();

server.connection({
    host: config.ServerConfig().host,
    port: config.ServerConfig().port,
    routes: {cors: config.ServerConfig().cors_enabled}
});

var swaggerOptions = {
    info: {
        'title': 'ADC Metadata API Documentation',
        'version' : pkg.version
    }

};

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    },
], function(err){
    if (err){
        console.log('error', "unexpected error");
        throw err;
    }

    server.start(function(){
        server.route(routes);
        console.log('info', 'Server running at: '+ server.info.uri);
    });

});