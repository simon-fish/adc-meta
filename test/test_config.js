/**
 * File: test.js
 * Description: Unit test
 * Author: Prawit Chaivong
 */


var expect = require('chai').expect;
var conf = require('../config').config;

describe("Configuration", function(){
    describe("Node Server", function(){
        var server = conf.server;
        it("Return correct server ip configuration", function(){
            var host = conf.server.host;
            expect(host).to.equal("0.0.0.0");
        });

        it("Return correct server port configuration", function(){
            var port = conf.server.port;
            expect(port).to.equal(3000);
        });
    });

    describe("Database", function(){
        var db = conf.db;
        it("Generate correct connection string", function(){
            var conn = db.connection_str;
            expect(conn).to.equal("mongodb://localhost/adc-meta");
        });
    });   
});