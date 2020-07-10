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
var async = require("async");
var opcua = require("node-opcua");


var DAISYOPCClientManager = require('./OPCUAClient/DAISYOPCClientManager');

var OPCUAClientInterface = function() {};
OPCUAClientInterface.prototype.init = function(_app, sio, _settings) {
    var self = this;
    this.app = _app;
    self.settings = _settings;
    self.settings.name = self.settings.name || "OPC UA Client Manager";
    self.settings.id = self.settings.id || this.app.util.generateId();
    self.settings.level = self.settings.level || "info";
    self.settings.modulesetting = self.settings.modulesetting || {
        interval: 10,
        ip: "localhost",
        port: 4840,
        defaultObjectModel: { CURRENT_STATES: [], STATES: [], KPI: [], ACTIONS: [] }
    };
    self.settings.defaultObjectModel = self.settings.defaultObjectModel || {};
    self.settings.skillsModel = self.settings.skillsModel || {};

    self.started = false;
    self.manager = new DAISYOPCClientManager(sio);
    self.app.log.info("MICROSERVICE[" + self.settings.name + "] initialized successfully!");
    self.current_state_objects = [];
    self.current_state_object_types = {};
};
OPCUAClientInterface.prototype.start = function() {
    var self = this;
    if (self.started) {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] already started !");
        return when.resolve();
    } else {
        self.started = true;
        self.app.log.info("MICROSERVICE[" + self.settings.name + "] started successfully!");
    }
    return when.resolve();
};

OPCUAClientInterface.prototype.stop = function() {
    var self = this;
    self.started = false;
    self.manager.close(function() {
        self.app.log.info("MICROSERVICE[" + self.settings.name + "] stopped successfully!");
    });
    return when.resolve();
};


// ---------------------------------------------------------------------------------------------------
// -------------  Secondary functions 
// ---------------------------------------------------------------------------------------------------
OPCUAClientInterface.prototype.ConnectPLC = function(arg, sio, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName) {
        async.waterfall([
            function(callback) { // Get the client
                var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
                if (client) {
                    self.app.log.warn("MICROSERVICE[" + self.settings.name + "] client already exist.");
                } else {
                    client = self.manager.addNewOPCClient(arg.ip, arg.port, arg.serverName, arg.socketID);
                    self.app.log.info("MICROSERVICE[" + self.settings.name + "] new client initialized.");
                }
                if (client) {
                    callback(null, client);
                } else {
                    callback({ text: "Client not found!" }, null);
                }
            },
            function(client, callback) { // Connect the client to the server
                if (client.connected === false) {
                    client.connect(arg.ip, arg.port, arg.serverName, arg.socketID, function(err) {
                        if (err) {
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] new client could connect to server: " + client.url);
                            callback(err, null);
                        } else {
                            self.app.log.info("MICROSERVICE[" + self.settings.name + "] new client connected to server: " + client.url);
                            callback(null, client);
                        }
                    });
                } else {
                    self.app.log.info("MICROSERVICE[" + self.settings.name + "] client is already connected to " + client.url);
                    callback(null, client);
                }
            },
            function(client, callback) { // Check the server information model
                if (client.information_model_checked  === false) {
                    // Check Server Model
                    checkServerModel(self, client, sio, function(err, skillArray) {
                        if (err) {
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] PLC Server is not compatible to the Skill model.");
                            callback(err, client, []);
                        } else {
                            self.app.log.info("MICROSERVICE[" + self.settings.name + "] PLC Server implements compatible Automation Skill. Client will start monitoring.");
                            client.skill_array = skillArray;
                            client.information_model_checked = true;
                            callback(null, client, skillArray);
                        }
                    });
                }else{
                    self.app.log.info("MICROSERVICE[" + self.settings.name + "] client information model is already checked." );
                    callback(null, client, client.skill_array);
                }
                
            },
            function(client, skillArray, callback) { // Monitor the PLC assuming that it is compatible to our model
                if (client.monitored  === false) {
                    monitorServerInformationModel(self, client, sio, skillArray, function(err) {
                        if (err) {
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] PLC Server Information model could not be monitored.");
                            callback(err, client, []);
                        } else {
                            self.app.log.info("MICROSERVICE[" + self.settings.name + "] PLC Server Information model is being monitored.");
                            client.monitored = true;
                            callback(null, client, skillArray);
                        }
                    });
                }else{
                    self.app.log.info("MICROSERVICE[" + self.settings.name + "] client information model is already monitored." );
                    callback(null, client, client.skill_array);
                }                
            }
        ], function(err, client, results) {
            fCallBack(err, client, results);
        });
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] invalid Argument for method ConnectPLC.");
        fCallBack({ text: "Invalid Arguments" }, null, []);
    }
};

OPCUAClientInterface.prototype.DisconnectPLC = function(arg, fCallBack) {
    var self = this;
    var client = null;
    //Initialize a new client
    if (arg.ip && arg.socketID && arg.port && arg.serverName) {
        client = manager.getClient(manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client) {
            if (client.connected === true) {
                client.disconnect(function(err) {
                    if (err) {
                        self.app.log.info("MICROSERVICE[" + self.settings.name + "] client could disconnect from server.");
                        fCallBack(null, false);
                    } else {
                        self.app.log.info("MICROSERVICE[" + self.settings.name + "] client disconnected from server.");
                        fCallBack(null, true);
                    }
                });
            }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not disconnect client.");
            fCallBack({ text: "Invalid Arguments" }, false);
        }
    } else {
        fCallBack({ text: "Invalid Arguments" }, false);
    }
};

OPCUAClientInterface.prototype.ExecuteMethod = function(arg, fCallBack) {
    var self = this;
    //Initialize a new client
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.actionName) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client) {
            if (client.connected === true && client.information_model_checked === true) {
                // Search for the action parameters
                var action = null;
                for (let _s = 0; _s < client.skill_array.length; _s++) {
                    const _skill = client.skill_array[_s];
                    if(_skill.skill.name === arg.skillName){
                        for (var i = 0; i < _skill.objectMonitor.ACTIONS.length; i++) {
                            if (_skill.objectMonitor.ACTIONS[i].name === arg.actionName) {
                                action = _skill.objectMonitor.ACTIONS[i];
                                break;
                            }
                        }
                        break;
                    }                    
                }
                
                if (action) {
                    if (action.objectId && action.methodId && client) {
                        // Initialize the parameters
                        var inputArguments = [];
                        if (action.parameters) {
                            if (action.parameters.inputArguments && action.parameters.inputArguments.length > 0) {
                                var k = 0;
                                action.parameters.inputArguments.forEach(function(el, index) {
                                    // Filter Datatype
                                    // TODO: Only basic datatypes are supported
                                    //const keys = Object.keys(opcua.DataType).filter(k => opcua.DataType[k] === el.dataType.value);
                                    /*
                                    *     nodeId = opcua.coerceNodeId("ns=2;s=Scalar_Static_ImagePNG");
                                    *     session.getBuildInDataType(nodeId,function(err,dataType) {
                                    *        assert(dataType === opcua.DataType.ByteString);
                                    *     });
                                    * */

                                    inputArguments.push({
                                        dataType: el.dataType.value, // only basic datatypes are supported
                                        arrayType: el.valueRank !== -1 ? opcua.VariantArrayType.Array : opcua.VariantArrayType.Scalar,
                                        value: el.valueRank !== -1 ? [0] : arg.parameters[index]?arg.parameters[index].value:0
                                    });
                                    k++;
                                });
                            }                            
                        }

                        client.callMethod(action.objectId.ns, action.objectId.nid, action.methodId.ns, action.methodId.nid, inputArguments, function(err, response) {
                            if (err) {
                                self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not execute action [" + arg.actionName + "] : " + err);
                                fCallBack({ text: "Could not execute action.", err: err }, null);
                            } else {
                                if (response[0].statusCode == 0) {
                                    self.app.log.info("MICROSERVICE[" + self.settings.name + "] executed action [" + arg.actionName + "] successfully with errorCode: " + response[0].statusCode);
                                    fCallBack(null, response[0]);
                                } else {
                                    self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not execute action [" + arg.actionName + "] with errorCode: " + response[0].statusCode);
                                    fCallBack({ text: "Could not execute action [" + arg.actionName + "] with errorCode: " + response[0].statusCode }, response[0]);
                                }
                            }
                        });
                    } else {
                        fCallBack({ text: "Could not execute action. Parameters not provided." }, null);
                        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Parameters not provided.");
                    }
                } else {
                    fCallBack({ text: "Could not execute action. Action was not found on OPC UA Server." }, null);
                    self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Action was not found on OPC UA Server.");
                }
            }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Invalid Arguments.");
        fCallBack({ text: "Invalid Arguments" }, null);
    }
};

OPCUAClientInterface.prototype.ExecuteMethodNode = function(arg, fCallBack) {
    var self = this;
    //Initialize a new client
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.actionNode) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client) {
            if (client.connected === true && client.information_model_checked === true) {
                // Search for the action parameters
                var action = arg.actionNode;

                if (action.objectId && action.methodId && client) {
                    // Initialize the parameters
                    var inputArguments = [];
                    if (action.parameters) {
                        if (action.parameters.inputArguments && action.parameters.inputArguments.length > 0) {
                            var k = 0;
                            action.parameters.inputArguments.forEach(function(el, index) {
                                // Filter Datatype
                                // TODO: Only basic datatypes are supported
                               
                                var _val = (el.valueRank !== -1) && (el.valueRank !== "-1") ? [0] : arg.parameters[index]?arg.parameters[index].value:0;
                                var _dtype = opcua.coerceNodeId(el.dataType).value;
                                inputArguments.push({
                                    dataType: _dtype, // only basic datatypes are supported
                                    arrayType: (el.valueRank !== -1) && (el.valueRank !== "-1") ? opcua.VariantArrayType.Array : opcua.VariantArrayType.Scalar,
                                    value: JSON.parse(_val) 
                                });
                                k++;
                            });
                        }                            
                    }

                    client.callMethod(action.objectId.ns, action.objectId.nid, action.methodId.ns, action.methodId.nid, inputArguments, function(err, response) {
                        if (err) {
                            self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not execute action [" + arg.actionName + "] : " + err);
                            fCallBack({ text: "Could not execute action.", err: err }, null);
                        } else {
                            if (response[0].statusCode == 0) {
                                self.app.log.info("MICROSERVICE[" + self.settings.name + "] executed action [" + arg.actionName + "] successfully with errorCode: " + response[0].statusCode);
                                fCallBack(null, response[0]);
                            } else {
                                self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not execute action [" + arg.actionName + "] with errorCode: " + response[0].statusCode);
                                fCallBack({ text: "Could not execute action [" + arg.actionName + "] with errorCode: " + response[0].statusCode }, response[0]);
                            }
                        }
                    });
                } else {
                    fCallBack({ text: "Could not execute action. Parameters not provided." }, null);
                    self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Parameters not provided.");
                }
                
            }else {
                self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Client is disconnected.");
                fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
            }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not execute action. Invalid Arguments.");
        fCallBack({ text: "Invalid Arguments" }, null);
    }
};

OPCUAClientInterface.prototype.WriteVariable = function(arg, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.variableName) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
                // Search for the action parameters
                var _variable = null;
                for (let _s = 0; _s < client.skill_array.length; _s++) {
                    const _skill = array[_s];
                    if(_skill.skill.name === arg.skillName){
                        for (var i = 0; i < _skill.objectMonitor.KPI.length; i++) {
                            if (_skill.objectMonitor.KPI[i].name === arg.variableName) {
                                _variable = _skill.objectMonitor.KPI[i];
                                break;
                            }
                        }
                        break;
                    }                    
                }
                if (_variable) {
                    // Initialize the parameters
                    let _value = {
                        value: { /* Variant */
                            dataType: opcua.DataType.Float,
                            value: arg.value
                        }
                    };
                    client.write(_variable.nodeId.ns, _variable.nodeId.nid, _value, function(err, statusCode) {
                        if (err) {
                            self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not write variable [" + arg.name + "] : " + err);
                            fCallBack({ text: "Could not write variable [" + arg.name + "] : ", err: err }, null);
                        } else {
                            self.app.log.log("MICROSERVICE[" + self.settings.name + "] write variable [" + arg.name + "] : executed with : " + statusCode);
                            fCallBack(null, statusCode);
                        }
                    });
                }else {
                    self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Variable not found.");
                    fCallBack({ text: "Could not write variable. Variable not found" }, null);
                }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};


OPCUAClientInterface.prototype.WriteVariableNode = function(arg, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.node) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
                // Search for the action parameters
                var _variable = arg.node;
                
                if (_variable) {
                    // get Variable Datatype
                    let nodeId = _variable.nodeId;
                    try {
                        client.getDataType(nodeId.ns, nodeId.nid, function(datatype_err, _dataType) {
                            if(datatype_err){
                                fCallBack({ text: "Could not write variable [" + arg.name + "] : ", err: datatype_err }, null);
                            }else{
                                // Initialize the parameters
                                let _value = {
                                    value: { /* Variant */
                                        dataType: _dataType,
                                        value: JSON.parse(arg.value)
                                    }
                                };
                                client.write(_variable.nodeId.ns, _variable.nodeId.nid, _value, function(err, statusCode) {
                                    var _statuscode = statusCode[0];
                                    if (err) {
                                        self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not write variable [" + arg.name + "] : " + err);
                                        fCallBack({ text: "Could not write variable [" + arg.name + "] : ", err: err }, null);
                                    } else {
                                        self.app.log.log("MICROSERVICE[" + self.settings.name + "] write variable [" + arg.name + "] : executed with : " + _statuscode);
                                        fCallBack(null, _statuscode);
                                    }
                                });
                            }
                        });
                    }catch(ex_err) {
                        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Unkown exception.");
                        fCallBack({ text: "Could not write variable. Unkown exception." }, null);
                    }                    
                    
                }else {
                    self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Variable not found.");
                    fCallBack({ text: "Could not write variable. Variable not found" }, null);
                }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};

OPCUAClientInterface.prototype.WriteVariableNodes = function(arg, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.nodes && arg.values) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
                // Search for the action parameters
                var _variables = arg.nodes;
                var _values = arg.values;
                var _resultstatuses = new Array(_values.length);                
                    // get the variable datatype in parallel
                    async.forEachOf(_variables, function (_obj, _index, _callback) {
                        // Get the datatype
                        if (_obj) {
                            // get Variable Datatype                        
                            client.getDataType(_obj.ns, _obj.nid, function(datatype_err, _dataType) {
                                if(datatype_err){
                                    _callback({ text: "Could not read datatype of variable [" + _obj.name + "] : ", err: datatype_err });
                                }else{
                                    // Initialize the parameters
                                    try {
                                        var _value = {
                                            value: { /* Variant */
                                                dataType: _dataType,
                                                value: JSON.parse(_values[_index])
                                            }
                                        };
                                        client.write(_obj.ns, _obj.nid, _value, function(err__, _statusCode) {
                                            _resultstatuses[_index] = _statusCode[0];                                    
                                            if (err__) {
                                                _callback(err__);
                                            }else{
                                                _callback(null);
                                            } 
                                        }); 
                                    } catch (ex_err) {
                                        _callback(ex_err);
                                    }                                                                  
                                }
                            });
                        }
                    }, function (err) {
                        if (err){
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variables. Please check the input values.");
                            fCallBack({ text: "Could not write variables. Please check the input values. : ", err: err }, null);
                        }else{
                            fCallBack(null, _resultstatuses);
                        }
                    });
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not write variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};

OPCUAClientInterface.prototype.monitorNode = function(arg, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.node) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
            if (arg.ResultTriggerNodeID) {
                client.monitorNode(arg.node.nodeId.ns, arg.node.nodeId.nid, arg.name, self.settings.modulesetting.interval, function(err) {
                    if (err) {
                        self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + arg.node.name + "] - [" + arg.node.nodeId.ns + ":" + arg.node.nodeId.nid + "]: " + err);
                        fCallBack({ text: "Could not monitor variable.", err: err }, null);
                    }
                }, function(dataValue) {
                    var el = {};
                    if (dataValue.value) {                        
                        el['value'] = dataValue.value.value;
                    } else {
                        el["value"] = 0;
                    }

                    el["ID"] = "ns=" + arg.node.nodeId.ns + ";i=" + arg.node.nodeId.nid;
                    var _rslt = {
                        ip: "" + client.ip,
                        port: "" + client.port,
                        skill: arg.skillName,
                        node: arg.node,
                        value: el
                    };

                    fCallBack(null, _rslt);
                    sio.emit("MonitoringNodeChanged",_rslt);
                });
            }else {
                self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Variable not found.");
                fCallBack({ text: "Could not monitor variable. Variable not found" }, null);
            }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};

OPCUAClientInterface.prototype.readVariableNodes = function(arg, fCallBack) {
    var self = this;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.nodes) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
            // Prepare the nodes to read
            client.readNodesDataByNodeIds(arg.nodes, function(err, dataValues) {
                if (err) {
                    self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not read the nodes data variables: " + err);
                    fCallBack({ text: "Could not read the value of the variables.", err: err }, null);
                }else{
                    fCallBack(null, dataValues);
                }
            });
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};

OPCUAClientInterface.prototype.monitorResultTrigger = function(arg, sio, fCallBack) {
    var self = this;
    var called = false;
    if (arg.ip && arg.socketID && arg.port && arg.serverName && arg.skillName && arg.node) {
        var client = self.manager.getClient(self.manager.getClientID(arg.ip, arg.port, arg.serverName, arg.socketID));
        if (client && client.connected === true && client.information_model_checked === true) {
            if (arg.node) {
                client.monitorNode(arg.node.nodeId.ns, arg.node.nodeId.nid, arg.name, self.settings.modulesetting.interval, function(err) {
                    if (err) {
                        self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + arg.node.name + "] - [" + arg.node.nodeId.ns + ":" + arg.node.nodeId.nid + "]: " + err);
                        fCallBack({ text: "Could not monitor variable.", err: err }, null);
                    }
                }, function(dataValue) {
                    var el = {};
                    if (dataValue.value) {                        
                        el['value'] = dataValue.value.value;
                    } else {
                        el["value"] = 0;
                    }

                    el["ID"] = "ns=" + arg.node.nodeId.ns + ";i=" + arg.node.nodeId.nid;
                    var _rslt = {
                        ip: "" + client.ip,
                        port: "" + client.port,
                        skill: arg.skillName,
                        node: arg.node,
                        value: el
                    };
                    if(called){
                        sio.emit("ResultTriggerChanged",_rslt);
                    }else{
                        fCallBack(null, _rslt);
                        called = true;
                    }
                });
            }else {
                self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Variable not found.");
                fCallBack({ text: "Could not monitor variable. Variable not found" }, null);
            }
        } else {
            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client is disconnected.");
            fCallBack({ text: "Could not execute action. Client is disconnected." }, null);
        }
    } else {
        self.app.log.warn("MICROSERVICE[" + self.settings.name + "] could not monitor variable. Client and skills are not defined.");
        fCallBack({ text: "Could not execute action. Client and skill are not defined." }, null);
    }    
};

// ---------------------------------------------------------------------------------------------------

function monitorServerInformationModel(self, client, sio, skillArray, fCallBack) {
    async.series([
        function(callback) { // Monitor the current state Machines
            self.app.log.info("MICROSERVICE[" + self.settings.name + "] started monitoring CURRENT STATES.");
            // For each skill collect the states
            skillArray.forEach(_skill => {
                var _current_states = _skill.objectMonitor.CURRENT_STATES || [];
                if (_current_states.length > 0) {
                    var ii = 0;
                    _current_states.forEach(function(el) {
                        if (el.nodeId && client) {
                            client.monitorNode(el.nodeId.ns, el.nodeId.nid, el.name, el.interval, function(err) {
                                if (err) {
                                    self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + el.name + "] - [" + el.nodeId.ns + ":" + el.nodeId.nid + "]: " + err);
                                }
                            }, function(dataValue) {
                                if (self.started) {
                                    if (dataValue.value) {
                                        el["value"] = dataValue.value.value;
                                        el["ID"] = "ns=" + el.nodeId.ns + ";i=" + el.nodeId.nid;
                                        _skill.objectMonitor['CURRENT_STATE_VALUE'] = dataValue.value.value;
                                    } else {
                                        el["value"] = 1;
                                        _skill.objectMonitor['CURRENT_STATE_VALUE'] = 1;
                                    }
    
                                    // Collect all transitions that are enabled
                                    let transitions = [];
                                    let transitionsObj = _skill.TRANSITIONS;
                                    for (const key in transitionsObj) {
                                        if (transitionsObj.hasOwnProperty(key)) {
                                            const trans = transitionsObj[key];
                                            if (trans.EnableFlag) {
                                                //if (trans.EnableFlag.value) {
                                                transitions.push(trans);
                                                //}
                                            }
                                        }
                                    }
    
                                    // TODO: Change to make an extra browse of the type Node
                                    sio.emit("StatesChanged", {
                                        ip: "" + client.ip,
                                        port: "" + client.port,
                                        skill: _skill.skill.name,
                                        state: el,
                                        transitions: transitions
                                    });
                                    /*
                                    // Get the state name from the object type
                                    var state_object_from_type = self.current_state_object_types["ns=" + el.nodeId.ns + ";i=" + el.nodeId.nid];
                                    if(state_object_from_type){
                                        sio.emit("StatesChanged", {
                                            ip: "" + client.ip,
                                            port: "" + client.port,
                                            state_object_from_type: state_object_from_type,
                                            state: el,
                                            transitions: transitions
                                        });
                                    }else{
                                        // browse the object type and read the state name
                                        var node_to_read = el["value"];
                                        client.readAllAttributes(node_to_read, function(err, nodesToRead, dataValues, diagnostics) {
                                            self.current_state_object_types["ns=" + el.nodeId.ns + ";i=" + el.nodeId.nid] = nodesToRead;
                                            state_object_from_type = nodesToRead;
                                            sio.emit("StatesChanged", {
                                                ip: "" + client.ip,
                                                port: "" + client.port,
                                                state_object_from_type: state_object_from_type,
                                                state: el,
                                                transitions: transitions
                                            });
                                        });
                                    }
                                    */
                                }
                            });
                        }
                        ii++;
                    });
                }
            });
            callback();
        },
        function(callback) { // Monitor KPI
            self.app.log.info("MICROSERVICE[" + self.settings.name + "] started monitoring KPIS.");
            // For each skills monitor the KPIs
            skillArray.forEach(_skill => {
                var _kpis = _skill.objectMonitor.KPI;
                if (_kpis) {
                    _kpis.forEach(function(el) {
                        if (el.nodeId && client) {
                            client.monitorNode(el.nodeId.ns, el.nodeId.nid, el.name, 20, function(err) { //el.interval
                                if (err) {
                                    self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + el.name + "] - [" + el.nodeId.ns + ":" + el.nodeId.nid + "]: " + err);
                                }
                            }, function(dataValue) {
                                if (dataValue.value) {
                                    el["value"] = dataValue.value.value;
                                }
    
                                if (self.started)
                                    sio("KPIChanged", {
                                        ip: "" + client.ip,
                                        port: "" + client.port,
                                        skill: _skill.name,
                                        item: el
                                    });
                            });
                        }
                        iii++;
                    });
                }
    
            });
            callback();
        },
        function(callback) { // Monitor all STATES DESCRIPTIONS
            self.app.log.info("MICROSERVICE[" + self.settings.name + "] started monitoring possibles STATES.");
            // For each skill monitor the skill descriptions
            skillArray.forEach(_skill => {
                var statesObj = _skill.objectMonitor.STATES;
                if (statesObj) {
                    for (const key in statesObj) {
                        if (statesObj.hasOwnProperty(key)) {
                            const eState = statesObj[key];
                            //Monitors Properties and Variable of this state
                            for (const key_ in eState) {
                                if (eState.hasOwnProperty(key_) && key_ != "name" && key_ !== "nodeId" && key_ !== "type" && key_ !== "parent" && key_ !== "interval" && key_ !== "hasCause") {
                                    const eStateProp = eState[key_];
                                    if (eStateProp.type === "Variable") {
                                        client.monitorNode(eStateProp.nodeId.ns, eStateProp.nodeId.nid, eStateProp.name, eStateProp.interval, function(err) {
                                            if (err) {
                                                self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + eStateProp.name + "] - [" + eStateProp.nodeId.ns + ":" + eStateProp.nodeId.nid + "]: " + err);
                                            }
                                        }, function(dataValue) {
                                            if (dataValue.value) {
                                                eStateProp["value"] = dataValue.value.value;
                                            }
                                            if (self.started && _skill.objectMonitor.CURRENT_STATE_VALUE) { // === eState.StateNumber.value) {
                                                sio("STATESDescriptionChanged", {
                                                    ip: "" + client.ip,
                                                    port: "" + client.port,
                                                    skill: _skill.name,
                                                    item: eState
                                                });
                                            }
                                        });
                                    }
    
                                }
                            }    
                        }
                    }
                }
            });

            callback();
        },
        function(callback) { // Monitor all TRANSITION DESCRIPTIONS
            self.app.log.info("MICROSERVICE[" + self.settings.name + "] started monitoring possibles TRANSITIONS.");
            // For Each Skill monitor the skill transitions
            skillArray.forEach(_skill => {
                let transitionObj = _skill.objectMonitor.TRANSITIONS;
                if (transitionObj) {
                    for (const key in transitionObj) {
                        if (transitionObj.hasOwnProperty(key)) {
                            const eTransition = transitionObj[key];
                            //Monitors Properties and Variable of this state
                            for (const key_ in eTransition) {
                                if (eTransition.hasOwnProperty(key_) && key_ != "name" && key_ !== "nodeId" && key_ !== "type" && key_ !== "parent" && key_ !== "interval" && key_ !== "hasCause") {
                                    const eTransitionProp = eTransition[key_];
                                    if (eTransitionProp.type === "Variable") {
                                        client.monitorNode(eTransitionProp.nodeId.ns, eTransitionProp.nodeId.nid, eTransitionProp.name, eTransitionProp.interval, function(err) {
                                            if (err) {
                                                self.app.log.error("MICROSERVICE[" + self.settings.name + "] could not monitor item [" + eTransitionProp.name + "] - [" + eTransitionProp.nodeId.ns + ":" + eTransitionProp.nodeId.nid + "]: " + err);
                                            }
                                        }, function(dataValue) {
                                            if (dataValue.value) {
                                                eTransitionProp["value"] = dataValue.value.value;
                                            }
                                            if (eTransition.EnableFlag) {
                                                if (self.started) {
                                                    sio.emit("TRANSITIONDescriptionChanged", {
                                                        ip: "" + client.ip,
                                                        port: "" + client.port,
                                                        skill: _skill.name,
                                                        item: eTransition
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            });

            callback();
        }
    ], function(err) {
        fCallBack(err);
    });
}

function checkServerModel(self, client, sio, fCallBack) {
    async.waterfall([
            function(callback) { // Check if a SkillMLObject exist
                self.app.log.warn("MICROSERVICE[" + self.settings.name + "] Client starts parsing PLC information model....");
                getSkillObject(client, { ns: 0, nid: 85 }, []).then(
                    function(foundedObjects) {
                        if (foundedObjects.length > 0) {
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] Client found at least one skill object with the nodeId: " + JSON.stringify(foundedObjects[0]));
                            callback(null, foundedObjects);
                        } else {
                            self.app.log.warn("MICROSERVICE[" + self.settings.name + "] No SkillObject exists in the PLC information model.");
                            callback({ text: "No Skill Object founded." }, []);
                        }
                    });
            },
            function(foundedObjects, callback) {
                if (foundedObjects.length > 0) {
                    var FindTasks = [];
                    foundedObjects.forEach(el => {
                        FindTasks.push(
                            new Promise((resolve, reject) => {
                                var _globalObjectResult = {};
                                parseSkillObject(client, {
                                        ns: el.nodeId.namespace,
                                        nid: el.nodeId.value
                                    }, {}, self.settings.modulesetting.defaultObjectModel,_globalObjectResult)
                                    .then(
                                        function(parsedModel) {
                                            // propagate the model to the clients
                                            sio.emit("skillModelFounded", {
                                                ip: "" + client.ip,
                                                port: "" + client.port,
                                                skill: el,
                                                skillModel: parsedModel
                                            });
                                            resolve({
                                                ip: "" + client.ip,
                                                port: "" + client.port,
                                                skill: el,
                                                skillModel: parsedModel,
                                                objectMonitor: _globalObjectResult
                                            });
                                        }
                                    );
                            })
                        );
                    });

                    Promise.all(FindTasks)
                        .then(values => {
                            // console.log(JSON.stringify(values, 4));
                            self.app.log.info("MICROSERVICE[" + self.settings.name + "] Client validated the Skill Object and extracted STATES, KPI and METHODS successfully.");
                            callback(null, values);
                        });
                }
            }
        ],
        function(err, _results) {
            fCallBack(err, _results);
        });
}

async function getSkillObject(client, nodeId, rslts) {
    return await new Promise((resolve, reject) => {
        client.browseNode(nodeId.ns, nodeId.nid, function(err, browse_results) {
            if (err) {
                reject(err);
            } else {
                if (browse_results[0].statusCode.value !== 0) {
                    reject({ msg: "Bad status code", statusCode: browse_results[0].statusCode });
                } else {
                    resolve(browse_results[0].references);
                }
            }
        });
    }).then(async function(references) {
        let _rslts = rslts || [];
        for (let i = 0; i < references.length; i++) {
            var desc = references[i];
            try {
                let founded = await isSkillObjectType(client, { ns: desc.nodeId.namespace, nid: desc.nodeId.value });
                if (founded) {
                    _rslts.push({ name: desc.browseName.name, nodeId: desc.nodeId });
                } else {
                    await getSkillObject(client, { ns: desc.nodeId.namespace, nid: desc.nodeId.value }, _rslts);
                }
            } catch (err) {
                return _rslts;
            }
        }
        return _rslts;
    });
}

function isSkillObjectType(client, nodeId) {
    return new Promise((resolve, reject) => {
        let founded = false;
        client.browseNodeByReferenceType(nodeId.ns, nodeId.nid, "HasTypeDefinition", async function(type_err, type_browse_results) {
            if (type_err) {
                reject(type_err);
            } else {
                if (type_browse_results[0].statusCode.value !== 0) {
                    reject(type_err);
                } else {
                    for (let k = 0; k < type_browse_results[0].references.length; k++) {
                        const element = type_browse_results[0].references[k];

                        // Check if type is SkillObjectType
                        if (element.nodeId.namespace === client.getNamespaceIndexOfURI("http://www.siemens.com/AutomationSkills") && element.nodeId.value === 1032) {
                            founded = true;
                            break;
                        }
                    }
                    resolve(founded);
                }
            }
        });
    });
}

function getOpcUAType(client, nodeId) {
    return new Promise((resolve, reject) => {
        client.browseNodeByReferenceType(nodeId.ns, nodeId.nid, "HasTypeDefinition", async function(type_err, type_browse_results) {
            if (type_err) {
                reject(type_err);
            } else {
                if (type_browse_results[0].statusCode.value !== 0) {
                    reject(type_err);
                } else {
                    resolve(type_browse_results[0].references[0]);
                }
            }
        });
    });
}

async function getGetAllSuperTypes(client, nodeId, rslts) {
    let _rslts = rslts || [];
    return await client.browseNodeByReferenceTypAndDirection(nodeId.ns, nodeId.nid, 1, "HasSubtype")
        .then(async function(references) {
            let containsBaseObjectType = false;
            for (let i = 0; i < references[0].references.length; i++) {
                let ref = references[0].references[i];
                _rslts.push(ref);
                containsBaseObjectType = (ref.browseName.name === "BaseObjectType");
            }
            if (containsBaseObjectType) {
                return _rslts;
            } else {
                for (let i = 0; i < references[0].references.length; i++) {
                    let ref = references[0].references[i];
                    let rslts_list = await getGetAllSuperTypes(client, {
                        ns: ref.nodeId.namespace,
                        nid: ref.nodeId.value
                    }, _rslts);
                    _rslts.concat(rslts_list);
                }
                return _rslts;
            }
        }, function() {
            return _rslts;
        });
}

async function superTypeContainsStateMachineType(types) {
    for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if (element.browseName.name === "StateMachineType") {
            return true;
        }
    }
    return false;
}

async function superTypeContainsStateType(types) {
    for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if (element.browseName.name === "StateType") {
            return true;
        }
    }
    return false;
}

async function superTypeTransitionType(types) {
    for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if (element.browseName.name === "TransitionType") {
            return true;
        }
    }
    return false;
}

async function superTypeStateChangePropertiesType(types) {
    for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if (element.browseName.name === "StateChangeProperties") {
            return true;
        }
    }
    return false;
}

async function parseSkillObject(client, BaseObjectNodeId, ObjectResult, RootObject, globalObjectResult) {
    var ObjectResult = ObjectResult || {};
    var globalObjectResult = globalObjectResult || {};
    // Prepare the Object
    return await new Promise((resolve, reject) => {
        client.browseNode(BaseObjectNodeId.ns, BaseObjectNodeId.nid, async function(err, browse_results) {
            if (err) {
                reject(err);
            } else {
                if (browse_results[0].statusCode.value !== 0) {
                    reject({ msg: "Bad status code", statusCode: browse_results[0].statusCode });
                } else {
                    for (let i = 0; i < browse_results[0].references.length; i++) {
                        const element = browse_results[0].references[i];
                        const NodeClass = element.nodeClass;
                        var item = {};
                        let type = "Object";
                        let types = [];
                        if (NodeClass === opcua.NodeClass.Object) {
                            // Get all superTypes
                            let opcuaType = await getOpcUAType(client, {
                                ns: element.nodeId.namespace,
                                nid: element.nodeId.value
                            });
                            types = await getGetAllSuperTypes(client, {
                                ns: opcuaType.nodeId.namespace,
                                nid: opcuaType.nodeId.value
                            }, [opcuaType]);

                            // Check if it has a supertype StateMachineType
                            if (await superTypeContainsStateMachineType(types)) {
                                type = "StateMachineType";
                            } else if (await superTypeContainsStateType(types)) {
                                type = "StateType";
                            } else if (await superTypeTransitionType(types)) {
                                type = "TransitionType";
                            } else if (await superTypeStateChangePropertiesType(types)) {
                                type = "StateChangeProperties";
                            } else {
                                type = "Object";
                            }

                            item = {
                                name: element.browseName.name,
                                nodeId: {
                                    ns: element.nodeId.namespace,
                                    nid: element.nodeId.value
                                },
                                type: type
                            };
                            await parseSkillObject(client, {
                                ns: element.nodeId.namespace,
                                nid: element.nodeId.value
                            }, item, RootObject, globalObjectResult);

                            if (item.type === "StateType") {
                                // Check if state is subState of a state
                                var pState = await getStateParent(client, item);
                                if (pState) {
                                    item.parent = {
                                        name: pState.browseName.name,
                                        nodeId: {
                                            ns: pState.nodeId.namespace,
                                            nid: pState.nodeId.value
                                        }
                                    };
                                } else {
                                    item.parent = null;
                                }
                                item.interval = 100;

                                RootObject.STATES = RootObject.STATES || {};
                                globalObjectResult['STATES'] = globalObjectResult.STATES || {};
                                Object.defineProperty(RootObject.STATES, "" + element.browseName.name, {
                                    value: item,
                                    writable: true,
                                    enumerable: true,
                                    configurable: true
                                });
                                Object.defineProperty(globalObjectResult.STATES, "" + element.browseName.name, {
                                    value: item,
                                    writable: true,
                                    enumerable: true,
                                    configurable: true
                                });

                            }
                            if (item.type === "TransitionType") {
                                var hasCause = await getTransitionCause(client, item);
                                if (hasCause) {
                                    item.hasCause = {
                                        name: hasCause.browseName.name,
                                        nodeId: {
                                            ns: hasCause.nodeId.namespace,
                                            nid: hasCause.nodeId.value
                                        }
                                    };
                                } else {
                                    item.hasCause = null;
                                }
                                item.interval = 100;

                                RootObject.TRANSITIONS = RootObject.TRANSITIONS || {};
                                globalObjectResult['TRANSITIONS'] = globalObjectResult.TRANSITIONS || {};
                                Object.defineProperty(RootObject.TRANSITIONS, "" + element.browseName.name, {
                                    value: item,
                                    writable: true,
                                    enumerable: true,
                                    configurable: true
                                });
                                Object.defineProperty(globalObjectResult.TRANSITIONS, "" + element.browseName.name, {
                                    value: item,
                                    writable: true,
                                    enumerable: true,
                                    configurable: true
                                });
                            }

                        } else if (NodeClass ===opcua.NodeClass.Variable ) {
                            type = "Variable";
                            item = {
                                name: element.browseName.name,
                                nodeId: {
                                    ns: element.nodeId.namespace,
                                    nid: element.nodeId.value
                                },
                                type: type
                            };
                            await parseSkillObject(client, {
                                ns: element.nodeId.namespace,
                                nid: element.nodeId.value
                            }, item, RootObject, globalObjectResult);

                            RootObject.CURRENT_STATES = RootObject.CURRENT_STATES || [];
                            globalObjectResult['CURRENT_STATES'] = globalObjectResult.CURRENT_STATES || [];
                            if (RootObject._states.includes(element.browseName.name)) {
                                item.interval = 50;
                                RootObject.CURRENT_STATES.push(item);
                                globalObjectResult.CURRENT_STATES.push(item);
                            }
                            RootObject.KPI = RootObject.KPI || [];
                            globalObjectResult['KPI'] = globalObjectResult.KPI || [];
                            if (RootObject._kpi.includes(element.browseName.name)) {
                                item.interval = 50;
                                RootObject.KPI.push(item);
                                globalObjectResult.KPI.push(item);
                            }
                        } else if (NodeClass === opcua.NodeClass.Method) {
                            type = "Method";
                            item = {
                                name: element.browseName.name,
                                objectId: {
                                    ns: BaseObjectNodeId.ns,
                                    nid: BaseObjectNodeId.nid
                                },
                                methodId: {
                                    ns: element.nodeId.namespace,
                                    nid: element.nodeId.value
                                },
                                type: type
                            };
                            await new Promise((resolve) => {

                                client.getOptionalArgumentDefinition(element.nodeId.namespace, element.nodeId.value, async function(err, inputArguments, outputArguments) {
                                    item.parameters = inputArguments || [];
                                    //item.out_parameters = outputArguments || [];
                                    resolve(item);
                                });
                            });
                            await parseSkillObject(client, {
                                ns: element.nodeId.namespace,
                                nid: element.nodeId.value
                            }, item, RootObject, globalObjectResult);

                            RootObject.ACTIONS = RootObject.ACTIONS || [];
                            globalObjectResult['ACTIONS'] = globalObjectResult.ACTIONS || [];
                            if (RootObject._actions.includes(element.browseName.name)) {
                                RootObject.ACTIONS.push(item);
                                globalObjectResult.ACTIONS.push(item);
                            }
                        }

                        Object.defineProperty(ObjectResult, "" + element.browseName.name, {
                            ip: client.ip,
                            port:client.port,
                            value: item,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                    }
                    resolve(ObjectResult);
                }
            }
        });
    });
}

async function getStateParent(client, item) {
    // get the machine state of the state client
    let pStateMachine = await client.browseNodeByReferenceTypAndDirection(item.nodeId.ns, item.nodeId.nid, 1, "HasComponent")
        .then(async function(references) {
            if (references[0].references.length !== 1) {
                return null;
            } else {
                return references[0].references[0];
            }
        }, function() {
            return null;
        });
    if (pStateMachine) {
        let pState = await client.browseNodeByReferenceTypAndDirection(pStateMachine.nodeId.namespace, pStateMachine.nodeId.value, 1, "HasSubStateMachine")
            .then(async function(references) {
                if (references[0].references.length !== 1) {
                    return null;
                } else {
                    return references[0].references[0];
                }
            }, function() {
                return null;
            });
        return pState;
    } else {
        return null;
    }
}

async function getTransitionCause(client, item) {
    // get the machine state of the state client
    return await client.browseNodeByReferenceTypAndDirection(item.nodeId.ns, item.nodeId.nid, 0, "HasCause") // HasCause
        .then(async function(references) {
            if (references[0].references.length < 1) {
                return null;
            } else {
                return references[0].references[0];
            }
        }, function() {
            return null;
        });
}

module.exports = OPCUAClientInterface;