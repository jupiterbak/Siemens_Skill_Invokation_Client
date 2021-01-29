
process.env.NODE_ENV = 'SIC TEST';

const { assert } = require("chai");
var chai = require("chai");
var expect  = chai.expect;
var should = chai.should();
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
const puppeteer = require('puppeteer');

var request = require('request');
const { fail } = require("yargs");
var server = require("../app/backend/index.js");


describe ("Connections 2", function(){
    this.timeout(500000);
    describe ("TEST Swagger API", function() {
        
        it("Settings", done=>{
            request("http://localhost:7400/api/v1/skills" , function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Variables2", done=>{
            request("http://localhost:7400/api/v1/skills" , function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Variables3", done=>{
            request("http://localhost:7400/api/v1/skills" , function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Variables4", done=>{
            request("http://localhost:7400/api/v1/skills" , function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});

