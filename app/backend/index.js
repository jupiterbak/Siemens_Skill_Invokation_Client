#!/usr/bin/env node
 // Load the http module to create an http server.
const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const childProcess = require('child_process');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const glob = require("glob");
const template7 = require('template7');
const cliTruncate = require('cli-truncate');
const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize({ all: true }),
        winston.format.printf((log) => {
            return `${log.timestamp} - [${log.level}] | [${log.service}] : ${log.message}`;
        })
    ),
    defaultMeta: { service: 'Backend' },
});


template7.registerHelper('add', function(arg_1, arg_2, options) {
    return eval(arg_1 + " + " + arg_2);
});
template7.registerHelper('newUUID', function(arg_1, arg_2, options) {
    const uuid = require('uuid/v4');
    return uuid();
});
template7.registerHelper('BoxHeight', function(inputs, outputs, options) {
    var length = 120;
    if (Array.isArray(inputs) && Array.isArray(outputs)) {
        return 120 + (Math.max(inputs.length, outputs.length) * 13);
    } else {
        return 120;
    }
});
template7.registerHelper('getLocalizedTextNodeID', function(nodeIdTxt) {
    return cliTruncate((""+ nodeIdTxt).replace(new RegExp('"', 'g'),""), 10);
});

// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// application specific configuration settings
//
const defaultSettings = require("./settings/default_settings");
const storage = require("./src/storage.js");
const skillParser = require("./src/skill_parser.js");
const shapeDirApp = path.normalize(__dirname + '/../shapes/');
const shape2CodeDir = path.normalize(__dirname + '/../shape2code/');
const skillTemplateDir = path.normalize(__dirname + '/../skilltemplate/');

// Application specific services
const kg_enpoints = require("./src/sparql_endpoint");
var KGEnpoints = {};
const OPCUAClientService = require("./src/OPCUAClientService");

// Determine the IP:PORT to use for the http server
//
const address = require("./src/network");
const port = defaultSettings.uiPort || 7400;

// =======================================================================
// Socket IO Adapter to intercept all notifications to the client
// NOTE: Jupiter --> This implementation should be optimized. 
// At this point we just want to make it work.
// =======================================================================
// Initialize SocketIO
const io = require('./src/comm/websocket').connect(http, { path: '/socket.io' }, logger, KGEnpoints);

// =======================================================================
//
// The main HTTP Server and socket.io run loop. Serves the HTML files
// and the socket.io access point to change/read the GPIO pins if the server
// is running on an Raspberry Pi
//
// =======================================================================
function runServer() {
    // Instantiate and start the OPC UA Backend service
    let opcua_settings = defaultSettings.service.opcuaclient || {};
    let opcuaclientservice = new OPCUAClientService();
    opcuaclientservice.init(io, opcua_settings, logger);
    opcuaclientservice.start();

    // provide the  WebApp with this very simple
    // HTTP server. Good enough for an private raspi access
    //
    app.use('/circuit/shapes', express.static(shapeDirApp));
    app.use(express.static(__dirname + '/../frontend'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => res.redirect('/circuit'));

    // =================================================================
    // Handle brain files
    //
    // =================================================================
    app.get('/backend/brain/list', (req, res) => storage.listFiles(storage.brainDirUserHOME, req.query.path, res));
    app.get('/backend/brain/get', (req, res) => storage.getJSONFile(storage.brainDirUserHOME, req.query.filePath, res));
    app.get('/backend/brain/image', (req, res) => storage.getBase64Image(storage.brainDirUserHOME, req.query.filePath, res));
    app.post('/backend/brain/delete', (req, res) => storage.deleteFile(storage.brainDirUserHOME, req.body.filePath, res));
    app.post('/backend/brain/rename', (req, res) => storage.renameFile(storage.brainDirUserHOME, req.body.from, req.body.to, res));
    app.post('/backend/brain/save', (req, res) => {
        fs.writeFile(storage.brainDirUserHOME + req.body.filePath, req.body.content, (err) => {
            res.send('true');
            io.emit("brain:generated", {
                filePath: req.body.filePath
            });
        });
    });


    // =================================================================
    // Handle shape files
    //
    // =================================================================
    app.get('/backend/shape/list', (req, res) => storage.listFiles(shapeDirApp, req.query.path, res));
    app.get('/backend/shape/get', (req, res) => storage.getJSONFile(shapeDirApp, req.query.filePath, res));
    app.get('/backend/shape/image', (req, res) => storage.getBase64Image(shapeDirApp, req.query.filePath, res));
    app.post('/backend/shape/delete', (req, res) => storage.deleteFile(shapeDirApp, req.body.filePath, res));
    app.post('/backend/shape/rename', (req, res) => storage.renameFile(shapeDirApp, req.body.from, req.body.to, res));
    app.post('/backend/shape/save', (req, res) => {
        fs.writeFile(shapeDirApp + req.body.filePath, req.body.content, (err) => {
            if (err) throw err

            // file is saved...fine
            //
            res.send('true');

            // create the js/png/md async to avoid a blocked UI
            //
            let binPath = 'node';
            let childArgs = [
                path.normalize(__dirname + '/../shape2code/converter.js'),
                path.normalize(shapeDirApp + req.body.filePath),
                shape2CodeDir,
                shapeDirApp
            ];

            // inform the browser that the processing of the
            // code generation is ongoing
            //
            io.emit("shape:generating", {
                filePath: req.body.filePath
            });

            console.log(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
            childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
                if (err) {
                    console.error(`stderr: ${stderr}`);
                    throw err;
                }                
                
                console.log(`stdout: ${stdout}`);

                let pattern = (shapeDirApp + req.body.filePath).replace(".shape", ".*");
                glob(pattern, {}, function(er, files) {
                    files.forEach(file => {
                        fs.copyFile(file, file.replace(shapeDirApp, storage.shapeDirUserHOME), (err) => {
                            if (err) throw err;
                        });
                    });
                });

                io.emit("shape:generated", {
                    filePath: req.body.filePath,
                    imagePath: req.body.filePath.replace(".shape", ".png"),
                    jsPath: req.body.filePath.replace(".shape", ".js")
                });
            });
        });
    });

    // =================================================================
    // Handle skill browse
    //
    // =================================================================
    app.post('/backend/skill/save', (req, res) => {
        fs.readFile(path.normalize(skillTemplateDir + '/skill_template.shape'), "utf8", (err, data) => {
            if (err) throw err;            
            let _skill = req.body.skill;

            // Parse the skill object to determine the version and the parameters
            let _skill_parser = new skillParser(_skill, logger);
            let _parsed_skill = _skill_parser.getParsedObject();
            
            // Comile the template object
            let compiledTemplate = template7.compile(data);
            let _content = compiledTemplate(_parsed_skill);
            // console.log(_content);
            // Add Custom Code depending on the version of the skill
            let _content_json = JSON.parse(_content);           
            _content_json.draw2d[0].userData.code = "" + fs.readFileSync(path.normalize(skillTemplateDir + '/skill_custom_code_' +  _parsed_skill.version +'.txt'), "utf8");         

            // Generate the JSON file path, which describe the skill (OPC UA)
            let skillDesriptionFile = path.normalize(shapeDirApp + req.body.filePath);
            skillDesriptionFile = skillDesriptionFile.replace(".shape", ".json");
            let skillDesriptionFileContent = JSON.stringify(_parsed_skill,null, 4);
            
            fs.writeFile(shapeDirApp + req.body.filePath, JSON.stringify(_content_json, null, 4), (err) => {
                if (err){                    
                    // file could not be saved.
                    //
                    res.send(JSON.stringify({err:"Skill couldn't be saved."}));
                    throw err;
                }

                // create the js/png/md async to avoid a blocked UI
                //
                let binPath = "node";
                let childArgs = [
                    path.normalize(__dirname + '/../shape2code/converter.js'),
                    path.normalize(shapeDirApp + req.body.filePath),
                    shape2CodeDir,
                    shapeDirApp
                ];

                // inform the browser that the processing of the
                // code generation is ongoing
                //
                io.emit("shape:generating", {
                    filePath: req.body.filePath
                });
                
                // console.log("Generating skill images...");
                console.log(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
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
                    console.log(`stdout: ${stdout}`);
                    
                    if (err){
                        console.error(`stderr: ${stderr}`);
                        // file could be saved but the index were not properly generated.
                        //
                        res.send(JSON.stringify({err:"Skill could be saved but the index were not properly generated."}));
                        throw err;
                    }else{
                        // Write the skill description as JSON
                        fs.writeFileSync(skillDesriptionFile, skillDesriptionFileContent);
                        
                        // Copy the generated files to the user directory
                        let pattern = (shapeDirApp + req.body.filePath).replace(".shape", ".*");
                        glob(pattern, {}, function(er, files) {
                            files.forEach(file => {
                                fs.copyFile(file, file.replace(shapeDirApp, storage.shapeDirUserHOME), (err) => {
                                    if (err) throw err;
                                });
                            });
                        });

                        // file is saved...fine
                        //
                        res.send(JSON.stringify({err:null}));

                        // SocketIO
                        io.emit("shape:generated", {
                            filePath: req.body.filePath,
                            imagePath: req.body.filePath.replace(".shape", ".png"),
                            jsPath: req.body.filePath.replace(".shape", ".js")
                        });
                        console.log(`stdout: ${stdout}`);
                    }
                });
            });
        });
    });


    // =================================================================
    // Handle OPC UA Interfaces
    //
    // =================================================================
    // Browse the OPC UA Server
    app.get('/backend/skill/browse', (req, res) => {
        logger.debug("Browse called.", { service: 'Backend'});
        var params = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT"
        };
        opcuaclientservice.ConnectPLC(params, io, function(err, client, results) {
            // SockeiIO feedback
            //io.emit("serverstatus", connectionMsg);
            // io.emit("skillModels", gFoundedSkills);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // Get a skill description
    app.get('/backend/skill/getDescription', (req, res) => {
        logger.debug("getDescription called.", { service: 'Backend'});
        var _skill_desc = req.query.skill_name;
        if(_skill_desc){
            try {
                _json_resp = fs.readFileSync(path.normalize(shapeDirApp + _skill_desc + ".json"), "utf8");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({err:null, skill_descp: _json_resp}));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({err:"Cannot read the requested skill description."}));
              }
            
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({err:"Please summit the name of the skill to read."}));
        }
    });

    // Connect to a skill during the execution of a sequence
    app.get('/backend/skill/connect', (req, res) => {
        logger.debug("Skill connect called.", { service: 'Backend'});
        var params = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT"
        };
        opcuaclientservice.ConnectPLC(params, io, function(err, client, results) {
            // SockeiIO feedback
            //io.emit("serverstatus", connectionMsg);
            // io.emit("skillModels", gFoundedSkills);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    app.get('/backend/skill/call', (req, res) => {
        logger.info("Skill call started execution.", { service: 'Backend'});
        let action = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            actionName: req.query.method,
            parameters: req.query.parameters
        }
        opcuaclientservice.ExecuteMethod(action, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    app.get('/backend/skill/callNode', (req, res) => {
        logger.info("Skill call(Node) started execution.", { service: 'Backend'});
        let action = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            actionNode: req.query.actionNode,
            parameters: req.query.parameters
        }
        opcuaclientservice.ExecuteMethodNode(action, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });
    
    // Monitor an OPC UA Node
    app.get('/backend/skill/monitorNode', (req, res) => {
        logger.debug("monitorNode called.", { service: 'Backend'});
        var param = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            node: req.query.node
        };

        opcuaclientservice.monitorNode(param, io, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });     

    // Monitor a skill result trigger node
    app.get('/backend/skill/monitorResultTrigger', (req, res) => {
        logger.debug("monitorResultTrigger called.", { service: 'Backend'});
        var param = { 
                socketID: "INVOCATION_CLIENT", 
                ip: req.query.ip, 
                port: req.query.port, 
                serverName: "INVOCATION_CLIENT",
                skillName: req.query.skillName,
                node: req.query.node
            };

        opcuaclientservice.monitorResultTrigger(param, io, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // Write a skill triggervariable
    app.get('/backend/skill/writeRequestTrigger', (req, res) => {
        logger.debug("writeRequestTrigger called.", { service: 'Backend'});
        let variable = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            node: req.query.node,
            value: req.query.value
        }

        opcuaclientservice.WriteVariableNode(variable, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // Write skills parameters
    app.get('/backend/skill/writeRequestParameters', (req, res) => {
        logger.debug("writeRequestParameters called.", { service: 'Backend'});
        let variable = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            nodes: req.query.nodes,
            values: req.query.values
        };

        opcuaclientservice.WriteVariableNodes(variable, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    app.get('/backend/skill/readResultVariables', (req, res) => {
        logger.debug("readResultVariables called.", { service: 'Backend'});
        let variables = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.query.skillName,
            nodes: req.query.nodes
        };

        opcuaclientservice.readVariableNodes(variables, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    app.get('/backend/skill/checkBackendSkill', (req, res) => {
        logger.debug("checkBackendSkill ....", { service: 'Backend'});
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ err: null, results: 'OK' }));
    });

    // =================================================================
    // SPARQL ENDPOINT
    //
    // =================================================================
    
    // Conect to knowlege graph
    app.get('/backend/graph/connectKG', (req, res) => {
        let kg_ip = req.query.ip;
        let kg_port = req.query.port;
        var _endpoint = new kg_enpoints(kg_ip, kg_port);
        KGEnpoints["" + _endpoint.ID] = _endpoint;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ err: null, ID: "" + _endpoint.ID }));
    });

    // get all Processes from the knowledge graph
    app.get('/backend/graph/getAllProcess', function(req, res) {
        var ID = req.query.ID;
        var parentID = req.query.parent.id;
        var _endpoint = KGEnpoints[ID];
        if (_endpoint) {
            if (parentID && parentID === "#") {
                _endpoint.getAllProcess(res);
            } else {
                _endpoint.getChildBySubType(res, parentID);
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });

    // get all product from the knowledge graph
    app.get('/backend/graph/getAllProduct', function(req, res) {
        var ID = req.query.ID;
        var parentID = req.query.parent.id;
        var _endpoint = KGEnpoints[ID];
        if (_endpoint) {
            if (parentID && parentID === "#") {
                _endpoint.getAllProduct(res);
            } else {
                _endpoint.getChildBySubType(res, parentID);
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });

    // get all ressources from the knowledge graph
    app.get('/backend/graph/getAllResource', function(req, res) {
        var ID = req.query.ID;
        var _endpoint = KGEnpoints[ID];
        var parentID = req.query.parent.id;
        if (_endpoint) {
            if (parentID && parentID === "#") {
                _endpoint.getAllResource(res);
            } else {
                _endpoint.getChildBySubType(res, parentID);
            }

        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });

    // Browse child
    app.get('/backend/graph/getChildBySubType', function(req, res) {
        var ID = req.query.ID;
        var parentID = req.query.parentID;

        var _endpoint = KGEnpoints[ID];
        if (_endpoint) {
            _endpoint.getChildBySubType(res, parentID);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });

    // Get all Skill instances
    app.get('/backend/graph/getAllSkillKGInstances', function(req, res) {
        var ID = req.query.ID;
        var _endpoint = KGEnpoints[ID];
        var parentID = req.query.parent.id;
        if (_endpoint) {
            if (parentID && parentID === "#") {
                _endpoint.getAllSkillInstances(res);
            } else {
                _endpoint.getChildBySubType(res, parentID);
            }            
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });

    //  Start the web server
    http.listen(port, function() {
        console.log('using Puppeteer for server side rendering of shape previews:', puppeteer.path)
        console.log('+------------------------------------------------------------+');
        console.log('| Welcome to the SP347 Skill Invokation Client               |');
        console.log('|------------------------------------------------------------|');
        console.log('| System is up and running. Copy the URL below and open this |');
        console.log('| in your browser: http://' + address + ':' + port + '/                 |');
        console.log('|                  http://localhost:' + port + '/                    |');
        console.log('+------------------------------------------------------------+');
    });
}

runServer();