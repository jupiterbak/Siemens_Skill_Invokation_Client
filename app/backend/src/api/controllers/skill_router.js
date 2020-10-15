'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports = {
  deleteModule : function deleteModule (req, res, next) {
    var moduleName = req.swagger.params['moduleName'].value;
    Default.deleteModule(moduleName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },
  getSkillsByModule : function getSkillsByModule (req, res, next) {
    var moduleName = req.swagger.params['moduleName'].value;
    Default.getSkillsByModule(moduleName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },
  listSkills : function listSkills (req, res, next) {
    Default.listSkills()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },
  registerModule : function registerModule (req, res, next) {
    var module = req.swagger.params['module'].value;
    Default.registerModule(module)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },
  updateModule : function updateModule (req, res, next) {
    var module = req.swagger.params['module'].value;
    Default.updateModule(module)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};