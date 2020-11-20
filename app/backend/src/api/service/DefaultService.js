'use strict';

const fs = require('fs');
const glob = require("glob");
const path = require('path');
const childProcess = require('child_process');
const async = require('async');

const shapeDirHOME = "./app/";
const shapeDirUserHOME = path.resolve(path.join(shapeDirHOME,"shapes/"));
const skillTemplateDir = path.normalize('./app/skilltemplate/');
const shapeDirApp = path.normalize('./app/shapes/');
const shape2CodeDir = path.normalize('./app/shape2code/');

/**
* Get all saved skill definitions
* 
 *
* returns List
**/
exports.listSkills = function() {
  return new Promise(function(resolve, reject) {
    // read all document in shape dirs
    glob(shapeDirUserHOME + "/*.json", {}, function(er, files) {
      var examples = files.map(function(f) {
        var _object = JSON.parse(fs.readFileSync(f));
        if((!_object.ip) || (!_object.port) || (!_object.skill)){
          return null;
        }else{
          return {
            "port": _object.port,
            "ip" : _object.ip,
            "name" : _object.skill.name,
            "module_name" : path.basename(f,'.json'),
            "nodeId" : _object.skill.nodeId,
            "version" : _object.version,
            "parameters": _object.parameters
          };
        }
      }).filter(function(_o){
        return _o !== null;
      });
      resolve(examples);
    });
  });  
};

/**
* Get all the skills belonging to a module.
* 
 *
* moduleName String The name of module to search for.
* returns List
**/
exports.getSkillsByModule = function(moduleName) {
  // Prepare the request
  var machineName = ("" + moduleName).replace(/\s/g, "");
  return new Promise(function(resolve, reject) {
    // read all document in shape dirs
    glob(shapeDirUserHOME + "/" + machineName +"*.json", {}, function(er, files) {
      var examples = files.map(function(f) {
        var _object = JSON.parse(fs.readFileSync(f));
        if((!_object.ip) || (!_object.port) || (!_object.skill)){
          return null;
        }else{
          return {
            "port": _object.port,
            "ip" : _object.ip,
            "name" : _object.skill.name,
            "module_name" : path.basename(f,'.json'),
            "nodeId" : _object.skill.nodeId,
            "version" : _object.version,
            "parameters": _object.parameters
          };
        }
      }).filter(function(_o){
        return _o !== null;
      });
      resolve(examples);
    });
  }); 
};



function concatFiles(dirname) {
  var indexFile = dirname + "index.js";
  var jsonFile = dirname + "index.json";
  var content = "";
  var list = [];
  try { fs.unlinkSync(indexFile); } catch (exc) {}
  try { fs.unlinkSync(jsonFile); } catch (exc) {}

  var filenames = fs.readdirSync(dirname);
  filenames.forEach(function(filename) {
      if (/\.(js)$/.test(filename)) {
          var name = filename.replace(".js", "");
          var tags = name.split("_");
          list.push({
              name: name,
              tags: tags,
              filePath: name + ".shape"
          });
          content += (fs.readFileSync(dirname + filename, 'utf-8') + "\n\n\n");
      }
  });
  fs.writeFileSync(jsonFile, JSON.stringify(list, undefined, 2));
  fs.writeFileSync(indexFile, content);
}
/**
* Delete a skill from the repository
* 
 *
* moduleName String The name of the module to remove
* no response value expected for this operation
**/
exports.deleteModule = function(moduleName) {
  var rslt = [];
  if((Object.keys(global.MAIN_APP.io.io.clients().connected)).length === 0){
  
    // Prepare the request
    var machineName = ("" + moduleName).replace(/\s/g, "");
    return new Promise(function(resolve, reject) {
    // read all document in shape dirs
      glob(shapeDirUserHOME + "/" + machineName +"_*.*", {}, function(er, files) {
    
        files.forEach(function (f) {        
          try {
            fs.unlinkSync(f);
            rslt.push(
              {
                err:null
              }
            );
          } catch (e) {
            rslt.push(
                {
                  err:JSON.stringify(e)
                }
            );
          }
        });
        concatFiles(shapeDirUserHOME+ "/");    
        resolve(rslt);
      });
    }); 
  }
  else{
    return new Promise(function(resolve, reject) {
      rslt.push(
        {
          err:"Delete not permitted. A client is connected to the server."
        }
      );
      resolve(rslt);
    });
  }
  
};


function generate_skill(skill_to_generate, filePath, _callback, _fcallback){
  fs.readFile(path.normalize(skillTemplateDir + '/skill_template.shape'), "utf8", (err, data) => {
    if (err){      
      _fcallback(err);
      throw err;
    }             
    var _skill = skill_to_generate;

    // Parse the skill object to determine the version and the parameters
    var _skill_parser = new MAIN_APP.skillParser(_skill, MAIN_APP.logger);
    var _parsed_skill = _skill_parser.getParsedObject();
    
    // Comile the template object
    var compiledTemplate = MAIN_APP.template7.compile(data);
    var _content = compiledTemplate(_parsed_skill);
    // console.log(_content);
    // Add Custom Code depending on the version of the skill
    var _content_json = JSON.parse(_content);           
    _content_json.draw2d[0].userData.code = "" + fs.readFileSync(path.normalize(skillTemplateDir + '/skill_custom_code_' +  _parsed_skill.version +'.txt'), "utf8");         

    // Generate the JSON file path, which describe the skill (OPC UA)
    var skillDesriptionFile = path.normalize(shapeDirApp + filePath);
    skillDesriptionFile = skillDesriptionFile.replace(".shape", ".json");
    var skillDesriptionFileContent = JSON.stringify(_parsed_skill,null, 4);
    
    fs.writeFile(shapeDirApp + filePath, JSON.stringify(_content_json, null, 4), (err) => {
        if (err){                    
          _fcallback(err);
          throw err;
        }

        // create the js/png/md async to avoid a blocked UI
        //
        var binPath = "node";
        var childArgs = [
            path.normalize(shape2CodeDir + 'converter.js'),
            path.normalize(shapeDirApp + filePath),
            shape2CodeDir,
            shapeDirApp
        ];

        // inform the browser that the processing of the
        // code generation is ongoing
        //
        MAIN_APP.io.emit("shape:generating", {
            filePath: filePath
        });
        
        // console.log("Generating skill images...");
        // console.log(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
        // childProcess.on('close', (code) => {
        //     console.log(`child process close all stdio with code ${code}`);
        // });
        
        // childProcess.on('exit', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });

        // childProcess.on('disconnect', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });

        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            //console.log(`stdout: ${stdout}`);
            
            if (err){
                console.error(`stderr: ${stderr}`);
                _fcallback(err);
                // file could be saved but the index were not properly generated.
                //
                throw err;
            }else{
                // Write the skill description as JSON
                fs.writeFileSync(skillDesriptionFile, skillDesriptionFileContent);
                
                // Copy the generated files to the user directory
                var pattern = (shapeDirApp + filePath).replace(".shape", ".*");
                glob(pattern, {}, function(er, files) {
                    files.forEach(file => {
                        fs.copyFile(file, file.replace(shapeDirApp, MAIN_APP.storage.shapeDirUserHOME), (err) => {
                            if (err) throw err;
                        });
                    });
                });

                // file is saved...fine
                //
                _callback({err:null});

                // SocketIO
                MAIN_APP.io.emit("shape:generated", {
                    filePath: filePath,
                    imagePath: filePath.replace(".shape", ".png"),
                    jsPath: filePath.replace(".shape", ".js")
                });
            }
        });
    });
});

}



/**
* Register a new module
* 
 *
* module Module Module object and OPC UA Server description that needs to be browsed.
* returns List
**/
exports.registerModule = function(module) {
  return new Promise(function(resolve, reject) {
    var machineName = ("" + module.name).replace(/\s/g, "");
    var ip_to_name = ("" + module.ip).split(".").join("");
    var params = { 
        socketID: "INVOCATION_CLIENT", 
        ip: module.ip, 
        port: module.port, 
        serverName: "INVOCATION_CLIENT"
    };
    MAIN_APP.opcuaclientservice.ConnectPLC(params, MAIN_APP.io, function(err, client, results) {
      async.eachSeries(results, function(_skill, callback) {
        var filePath = "" + machineName + "_" + ip_to_name + "_" + _skill.port + "_"+ _skill.skill.name + ".shape"
        // Perform operation on skill here.
        //try {
          generate_skill(_skill, filePath, function(rslt){
            callback();
          }, function(err){
            callback("Error while processing skill " + _skill.name);
          });
        //} catch (error) {
        //  callback("Error while processing skill " + _skill.name);
        //}        
      }, function(err) {
        // if any of the processing produced an error, err would equal that error
        if( err ) {
          reject({err:err});
        } else {
          // List all the skills
          glob(shapeDirUserHOME + "/" + machineName +"*.json", {}, function(er, files) {
            if(er) reject({err:er});
            var examples = files.map(function(f) {
              var _object = JSON.parse(fs.readFileSync(f));
              if((!_object.ip) || (!_object.port) || (!_object.skill)){
                return null;
              }else{
                return {
                  "port": _object.port,
                  "ip" : _object.ip,
                  "name" : _object.skill.name,
                  "module_name" : path.basename(f,'.json'),
                  "nodeId" : _object.skill.nodeId,
                  "version" : _object.version,
                  "parameters": _object.parameters
                };
              }
            }).filter(function(_o){
              return _o !== null;
            });
            resolve(examples);
          });
        }
      });
    });
  });
};


/**
* Update the skills of a module
* 
 *
* module Module Module object and OPC UA Server description that needs to be updated.
* returns List
**/
exports.updateModule = function(module) {
  var self = this;
  var rslt = [];
  return new Promise(function(resolve, reject) {
    if((Object.keys(global.MAIN_APP.io.io.clients().connected)).length === 0){
      self.deleteModule(module)
        .then(function (deleteResult) {
          if (deleteResult.err){
            reject(
              {
                err:"Update could not be executed. Existing module could not be deleted."
              }
            );
          }else{
            return self.registerModule(module);
          }
        }).then(function (registered_results) {
          if (registered_results.err){
            reject(
              {
                err:"Update could not be executed. The new module could not be registered."
              }
            );
          }else{
            resolve(registered_results);
          }        
        })
        .catch(function (err_object) {
          reject(err_object);
        });
    }else{
      rslt.push(
        {
          err:"Update Module not permitted. A client is connected to the server."
        }
      );
      resolve(rslt);
    }
  });
}

