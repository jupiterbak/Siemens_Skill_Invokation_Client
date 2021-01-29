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
var when = require('when');
var opcua = require("node-opcua");
var async = require("async");
var md5 = require('md5');

const infinite_connectivity_strategy = {
    maxRetry: 10000000,
    initialDelay: 2000,
    maxDelay: 50000,
    randomisationFactor: 0
};

const OPCUAClientBase = require("node-opcua-client").OPCUAClientBase;
const SecurityPolicy = require("node-opcua-secure-channel").SecurityPolicy;
const MessageSecurityMode = require("node-opcua-service-secure-channel").MessageSecurityMode;

function securityPolicyLevel(securityPolicy) {
    switch (securityPolicy) {
        case SecurityPolicy.None.value:
            return 0;
        case SecurityPolicy.Basic128.value:
            return 0;
        case SecurityPolicy.Basic128Rsa15.value:
            return 0;
        case SecurityPolicy.Basic192.value:
            return 1;
        case SecurityPolicy.Basic192Rsa15.value:
            return 2;
        case SecurityPolicy.Basic256.value:
            return 3;
        case SecurityPolicy.Basic256Rsa15.value:
            return 3;
        case SecurityPolicy.Basic256Sha256.value:
            return 3;
        default:
            return 0;
    }
}

function sortEndpointBySecurityLevel(endpoints) {
 
    endpoints.sort((a, b) => {
        if (a.securityMode.value === b.securityMode.value) {
            if (a.securityPolicyUri === b.securityPolicyUri) {
                return a.securityLevel < b.securityLevel;
            } else {
                return securityPolicyLevel(a.securityPolicyUri) < securityPolicyLevel(b.securityPolicyUri);
            }
        } else {
            return a.securityMode.value < b.securityMode.value;
        }
    });
    return endpoints;
}

function findSecureEndpoint(endpoints) {
 
    // we only care about binary tcp transport endpoint
    endpoints = endpoints.filter(function (e) {
        return e.transportProfileUri === "http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary";
    });
 
    let endpoint = endpoints.filter(function (e) {
        return e.securityMode === MessageSecurityMode.SignAndEncrypt;
    });
 
    if (endpoint.length === 0) {
        endpoint = endpoints.filter(function (e) {
            return e.securityMode === MessageSecurityMode.Sign;
        });
    }
    if (endpoint.length === 0) {
        endpoint = endpoints.filter(function (e) {
            return e.securityMode === MessageSecurityMode.None;
        });
    }
    endpoint = sortEndpointBySecurityLevel(endpoint);
    return endpoint[0];
}

const defaultRegistrationServerTimeout = 8 * 60 * 1000; // 8 minutes

var DiscoveryServerClient = function() {
    this._registration_client = null;
    this.selectedEndpoint = null;
    this._server_endpoints = null;
    this.started = false;
    this.known_server_endpoints = [];
    this.crawler = null;
};

DiscoveryServerClient.prototype.findServersOnNetwork = function(callback) {
    var self = this;
    if(self._registration_client && self._registration_client.is){
        self._registration_client.findServersOnNetwork(self.settings.discoveryServerEndpointUrl, function (err,  serversOnNetworks) {
            if (!err) {
                if(serversOnNetworks){
                    self.known_server_endpoints = serversOnNetworks;
                    serversOnNetworks.forEach(function(current) {
                        self.logger.info("MICROSERVICE[" + self.settings.name + "] founded this servers: " + current.discoveryUrl);
                    });
                }
            } else {
                self.logger.warn("MICROSERVICE[" + self.settings.name + "] cannot find servers on network.");
            }
            callback(err, serversOnNetworks);
        });
    }
};

DiscoveryServerClient.prototype.init = function(sio, _settings, _logger) {
    var self = this;
    this.logger = _logger;
    self.settings = _settings;
    self.settings.name = self.settings.name || "Discovery Server Client";
    self.settings.discoveryServerEndpointUrl = self.settings.discoveryServerEndpointUrl || "opc.tcp://127.0.0.1:4840/UADiscovery";
    self.settings.defaultRegistrationServerTimeout = self.settings.defaultRegistrationServerTimeout || defaultRegistrationServerTimeout;

    // Retry Strategy must be set
    var options = {
        applicationName: "SIC Discovery server client",
        endpoint_must_exist: false,
        keepSessionAlive: true,
        requestedSessionTimeout: 60000,
        connectionStrategy: infinite_connectivity_strategy,
    };

    let client = opcua.OPCUAClient.create(options); 
    self._registration_client = client;
    self.logger.info("MICROSERVICE[" + self.settings.name + "] initialized successfully!");
};

DiscoveryServerClient.prototype.start = function() {
    var self = this;
    if (self.started) {
        self.logger.warn("MICROSERVICE[" + self.settings.name + "] already started !");
        return when.resolve();
    } else {     

        async.series([
    
            function do_initial_connection_with_discovery_server(callback) {
                self._registration_client.connect(self.settings.discoveryServerEndpointUrl, function(err){
                    if (err) {
                        self.logger.warn("RegisterServerManager#_establish_initial_connection : initial connection to discovery server has failed");
                    //xx debugLog(err);
                    }
                    return callback(err);
                });
            }, 
            function getEndpoints_on_discovery_server(callback) {
                self._registration_client.getEndpoints(function (err, endpoints) {
                    if (!err) {
                        const endpoint = findSecureEndpoint(endpoints);
                        if (endpoint.serverCertificate) {
                            self.selectedEndpoint = endpoint;
                            
                        } else {
                            self.selectedEndpoint = null;
                        }
                    } else {
                        self.logger.warn("RegisterServerManager#_establish_initial_connection : getEndpointsRequest has failed");
                    }
                    callback(err);
                });
            },
            function wait_a_little_bit(callback) {
                setTimeout(callback, 100);
            },
            function save_endpoints(callback) {
                self._server_endpoints = self._registration_client._server_endpoints;
                callback(null);
            },
            function findServer_on_discovery_server(callback) {
                self.crawler = setInterval(() => {
                    self._registration_client.findServersOnNetwork(self.settings.discoveryServerEndpointUrl, function (err,  serversOnNetworks) {
                        if (!err) {
                            if(serversOnNetworks){
                                // Check for new servers
                                var new_servers = [];
                                serversOnNetworks.forEach(function(current) {
                                    var _founded = false;
                                    for (var index = 0; index < self.known_server_endpoints.length; index++) {
                                        if(self.known_server_endpoints[index].discoveryUrl === current.discoveryUrl){
                                            _founded = true;
                                            break;
                                        }                                        
                                    }
                                    if (_founded === false){
                                        new_servers.push(current);
                                    }
                                });

                                // Check for removed servers
                                var removed_servers = [];
                                self.known_server_endpoints.forEach(function(current) {
                                    var _founded = false;
                                    for (var index = 0; index < serversOnNetworks.length; index++) {
                                        if(serversOnNetworks[index].discoveryUrl === current.discoveryUrl){
                                            _founded = true;
                                            break;
                                        }                                        
                                    }
                                    if (_founded === false){
                                        removed_servers.push(current);
                                    }
                                });
                                
                                self.known_server_endpoints = serversOnNetworks;

                                // print out new servers
                                new_servers.forEach(function(current) {                                    
                                    self.logger.info("MICROSERVICE[" + self.settings.name + "] founded this servers: " + current.discoveryUrl);
                                });

                                // print out server removed
                                removed_servers.forEach(function(current) {                                    
                                    self.logger.info("MICROSERVICE[" + self.settings.name + "] server: " + current.discoveryUrl + " has been removed.");
                                });
                            }
                        } else {
                            self.logger.warn("MICROSERVICE[" + self.settings.name + "] cannot find servers on network.");
                        }
                        if (callback === null){
                            callback(err);
                        }                        
                    });
                }, 30000);
            },
            // function closing_discovery_server_connection(callback) {
            //     self._registration_client.disconnect(function(err) {
            //         self._registration_client = null;
            //         callback(err);
            //     });
            // },
        ], function (err) {
            if(err){
                if(self.crawler){
                    clearInterval(self.crawler);
                }                
                if (self._registration_client) {
                    self._registration_client.disconnect(function(err) {
                        self._registration_client = null;
                        self.logger.warn("MICROSERVICE[" + self.settings.name + "] Starting has been canceled");
                    });
                }else {
                    self.logger.warn("MICROSERVICE[" + self.settings.name + "] Starting has been canceled");
                }
                self._registration_client = null;
            }else{
                self.started = true; 
            }
        });
        self.logger.info("MICROSERVICE[" + self.settings.name + "] started successfully!");
    }
    return when.resolve();
};

DiscoveryServerClient.prototype.stop = function() {
    var self = this;
    if(self.crawler){
        clearInterval(self.crawler);
    } 
    if (self._registration_client) {
        self._registration_client.disconnect(function(err) {
            self._registration_client = null;
            self.logger.warn("MICROSERVICE[" + self.settings.name + "] registration client has been canceled");
        });
    }else {
        self.logger.warn("MICROSERVICE[" + self.settings.name + "] registration client has been canceled");
    }
    self._registration_client = null;   
    self.started = false;
    self.logger.info("MICROSERVICE[" + self.settings.name + "] has been stopped.");
    return when.resolve();
};

module.exports = DiscoveryServerClient;

