/**
 * Copyright 2018 Siemens AG.
 * 
 * File: LEMS.js
 * Project: SP 164
 * Author:
 *  - Jupiter Bakakeu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * --------------------------------------------------------------------
 * ###################### Changes #####################################
 * -- 10.02.2018
 *      Initial implementation
 * --------------------------------------------------------------------
 **/
"use strict";

/*#####################################################################################*/
/* SOCKET IO HANDLER
 /*#####################################################################################*/
var io = require('socket.io');
var DAISYOPCClient = require("./DAISYOPCClient");
"use strict";
var md5 = require('md5');
var IOBusHandler = require('./IOBusHandler');


/*#####################################################################################*/
/* OPC CLIENT MANAGER
 /*#####################################################################################*/

var DAISYOPCClientManager = function(bus) {
    this.clientList = [];
    this.siohandler = new IOBusHandler(bus);
};

DAISYOPCClientManager.prototype.getClientID = function(ip, port, serverName, socketID) {
    var clientId = md5(socketID + "_" + ip + "_" + port + "_" + serverName);
    return clientId;
};

DAISYOPCClientManager.prototype.getClientList = function() {
    return this.clientList;
};

DAISYOPCClientManager.prototype.setClientList = function(list) {
    this.clientList = [];
    for (var i = 0; i < list.length; i++) {
        var ns = list[i];
        this.clientList.push(ns);
    }
};

DAISYOPCClientManager.prototype.addOPCClient = function(key, client) {
    if (key && client) this.clientList[key] = client;
};

DAISYOPCClientManager.prototype.getClient = function(key) {
    return this.clientList[key];
};

DAISYOPCClientManager.prototype.addNewOPCClient = function(ip, port, serverName, socketID) {
    this.addOPCClient(this.getClientID(ip, port, serverName, socketID), new DAISYOPCClient(ip, port, serverName, socketID, this.siohandler));
    return this.getClient(this.getClientID(ip, port, serverName, socketID));
};

DAISYOPCClientManager.prototype.removeOPCClient = function(ip, port, serverName, socketID) {
    delete this.clientList[this.getClientID(ip, port, serverName, socketID)];
};

DAISYOPCClientManager.prototype.close = function(callback) {
    for (var prop in this.clientList) {
        if( this.clientList.hasOwnProperty( prop ) ) {
            this.clientList[prop].close(function(err) {
            });
        }
    }
    callback(null);
};

module.exports = DAISYOPCClientManager;