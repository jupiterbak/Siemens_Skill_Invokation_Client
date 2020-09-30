'use strict';


module.exports = {

  /**
   * Deregister a module
   * 
   *
   * body Module Pet object that needs to be added to the store
   * no response value expected for this operation
   **/
  deleteModule = function(body, res) {
    return new Promise(function(resolve, reject) {
      
      resolve();
    });
  }
};



/**
 * Finds all the skills implemented by a specific module.
 * 
 *
 * body Module Module Description to deregister.
 * returns List
 **/
exports.findSkillsByIP = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
}, {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all saved skill definitions
 * 
 *
 * returns List
 **/
exports.listSkills = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
}, {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register a new module
 * 
 *
 * body Module Module name and OPC UA Server description that needs to be browsed.
 * returns List
 **/
exports.registerModule = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
}, {
  "port" : 4840,
  "ip" : "192.168.0.1",
  "name" : "InsertSkill",
  "module_name" : "AssemblyModule 1",
  "nodeId" : "ns=4;i=7001",
  "version" : "V1"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

