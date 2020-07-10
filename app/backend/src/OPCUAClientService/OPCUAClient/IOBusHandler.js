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

var IOBusHandler = function(bus) {
    this.sockets = {};
    this.bus = bus;
    this.init();
};

IOBusHandler.prototype.init = function() {
    var self = this;
    // this.io.on('connection', function(socket) {
    //     console.log("Socket IO Connection ".blue + socket.id);

    //     self.sockets[socket.id.replace("/#", "")] = socket;

    //     socket.on('disconnect', function() {
    //         console.log("Socket IO Disconnection ".blue + socket.id);
    //         //delete self.sockets[socket.id.replace("/#","")];
    //         //delete self.sockets[this.id.replace("/#","")];
    //     });
    // });
};


IOBusHandler.prototype.generateData = function(eventID, socketID) {
    this.bus.emit(eventID, { x: Date.now(), y: Math.floor((Math.random() * 100) + 1) });
};

IOBusHandler.prototype.emitAll = function(socketID, eventID, data) {
    var _data = data || {};

    _data.socketID = socketID;
    this.bus.emit(eventID, _data);
};

module.exports = IOBusHandler;