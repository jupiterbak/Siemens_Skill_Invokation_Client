#!/usr/bin/env node
 // Load the http module to create an http server.

const express = require('express');
const fs = require('fs');
const app = express();
const app_api = require('connect')();
const http = require('http').Server(app);
const path = require('path');
const childProcess = require('child_process');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const glob = require("glob");
const template7 = require('template7');
const cliTruncate = require('cli-truncate');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var async = require("async");

const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'debug' }),
        //new winston.transports.File({ filename: 'SIC.log', level: 'debug' })
    ],
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

template7.registerHelper('getShortenedSkillName', function(skillName) {
    return cliTruncate((""+ skillName), 10, {position: 'start'});
});

template7.registerHelper('getParameterName', function(paramName) {
    return cliTruncate((""+ paramName), 12, {position: 'start'});
    /*var _tmp = ""+ paramName
    var res = _tmp.split("_");
    return res[res.length -1];*/
});

// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// application specific configuration settings
//
var config_spec = fs.readFileSync(path.join(__dirname,'./settings/config.yml'), 'utf8');
const defaultSettings = jsyaml.safeLoad(config_spec);

const storage = require("./src/storage.js");
const skillParser = require("./src/skill_parser.js");
const MTPParser = require('./src/MTPParser.js');
const shapeDirApp = path.normalize(__dirname + '/../shapes/');
const shape2CodeDir = path.normalize(__dirname + '/../shape2code/');
const skillTemplateDir = path.normalize(__dirname + '/../skilltemplate/');

// Application specific services
const kg_enpoints = require("./src/sparql_endpoint");
var KGEnpoints = {};
const OPCUAClientService = require("./src/OPCUAClientService");
const DiscoveryServerClient = require("./src/DiscoveryServerClient");

// Determine the IP:PORT to use for the http server
//
const address = require("./src/network");
const { UONE } = require('long');
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
// The Swagger API HTTP Server.
//
// =======================================================================
function configureSwaggerAPI(_app, _callBack){

    
    // swaggerRouter configuration
    var options = {
        swaggerUi: path.join(__dirname, 'swagger.json'),
        controllers: path.join(__dirname, './src/api/controllers'),
        useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
    };
    
    // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
    var spec = fs.readFileSync(path.join(__dirname,'./src/api/skillInvocationClientAPI.yaml'), 'utf8');
    var swaggerDoc = jsyaml.safeLoad(spec);
    
    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        

        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        _app.use(middleware.swaggerMetadata());
    
        // Validate Swagger requests
        _app.use(middleware.swaggerValidator());
    
        // Route validated requests to appropriate controller
        _app.use(middleware.swaggerRouter(options));
    
        // Serve the Swagger documents and Swagger UI
        _app.use(middleware.swaggerUi());
        
        _callBack(_app);
    });    
}

// =======================================================================
//
// The main HTTP Server and socket.io run loop. Serves the HTML files
// and the socket.io access point to change/read the GPIO pins if the server
// is running on an Raspberry Pi
//
// =======================================================================
function runServer() {
    // Instantiate and start the OPC UA Backend service
    let opcua_settings = defaultSettings.services.opcuaclient || {};
    let opcuaclientservice = new OPCUAClientService();
    opcuaclientservice.init(io, opcua_settings, logger);
    opcuaclientservice.start();

    // Instantiate and start the OPC UA Discovery service
    if( defaultSettings.services.opcua_dicovery.enabled){   
        let discovery_settings = defaultSettings.services.opcua_dicovery || {};
        let discoveryService = new DiscoveryServerClient();
        discoveryService.init(io, discovery_settings, logger);
        discoveryService.start();    
    }

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
    app.get('/backend/guide/get', (req, res) => storage.getJSONFile(storage.guidesirUserHOME, req.query.filePath, res));
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
    // Handle mtp files
    //
    // =================================================================
    app.get('/backend/mtp/list', (req, res) => storage.listFiles(storage.mtpDirUserHOME, req.query.path, res));
    app.get('/backend/mtp/get', (req, res) => storage.getXMLFile(storage.mtpDirUserHOME, req.query.filePath, res));
    app.post('/backend/mtp/delete', (req, res) => storage.deleteFile(storage.mtpDirUserHOME, req.body.filePath, res));
    app.post('/backend/mtp/rename', (req, res) => storage.renameFile(storage.mtpDirUserHOME, req.body.from, req.body.to, res));
    app.post('/backend/mtp/save', (req, res) => {
        logger.info("New MTP file to save: "+ storage.mtpDirUserHOME + req.body.filePath);
        fs.writeFile(storage.mtpDirUserHOME + req.body.filePath, req.body.content, (err) => {
            if (err) throw err;
            res.send(JSON.stringify({err:null}));

            io.emit("mtp:file:saved", {
                filePath: req.body.filePath
            });
            // File is saved, now parse it
            // Parse the skill object to determine the version and the parameters
            io.emit("mtp:file:parsing", {});
            let _mtp_parser = new MTPParser(req.body.content, logger);

            // Extract and save the views as brain files
            
            let hmi_views = _mtp_parser.getParsedHMIViews();
            io.emit("mtp:saving:views", {
                count: hmi_views.length
            });
            // save it to the brain dir as .brain files
            for (let i = 0; i < hmi_views.length; i++) {
                const view = hmi_views[i];
                var v_path = path.normalize(storage.brainDirUserHOME + req.body.filePath).replace(".aml", "");
                v_path = v_path + "_View_" + i + ".brain"
                // Write the view as brain file
                io.emit("mtp:saving:view", {
                    index: i
                });
                fs.writeFileSync(v_path, JSON.stringify(view,null, 4));
            }
            

            let _parsed_services = _mtp_parser.getParsedservices();            
            
            fs.readFile(path.normalize(skillTemplateDir + '/skill_template.shape'), "utf8", (err, data) => {
                if (err) throw err;
                io.emit("mtp_services_count", {
                    count: _parsed_services.length
                });

                var _service_index = 0;
                async.eachSeries(_parsed_services, function(_parsed_service, callback) {
                    //#############################
                    // Compile the template object
                    let compiledTemplate = template7.compile(data);
                    let _content = compiledTemplate(_parsed_service);
                    // console.log(_content);
                    // Add Custom Code depending on the version of the skill
                    let _content_json = JSON.parse(_content);           
                    _content_json.draw2d[0].userData.code = "" + fs.readFileSync(path.normalize(skillTemplateDir + '/mtp_custom_code_' +  _parsed_service.version +'.txt'), "utf8");         
                    

                    // Generate the JSON file path, which describe the skill (OPC UA)
                    let _serviceDesriptionFile = path.normalize(shapeDirApp + "MTP_"+ (_parsed_service.ip).split(".").join("") + "_" + _parsed_service.port + "_" + _parsed_service.skill.name);
                    _serviceDesriptionFile = _serviceDesriptionFile + ".json";
                    let _serviceDesriptionFileContent = JSON.stringify(_parsed_service,null, 4);

                    // Generate the .shape description file path for the MTP-Service
                    let _shapeDesriptionFile = path.normalize(_serviceDesriptionFile).replace(".json", ".shape");
                    fs.writeFile(_shapeDesriptionFile, JSON.stringify(_content_json, null, 4), (err) => {
                        if (err){                    
                            // file could not be saved.
                            //
                            //res.send(JSON.stringify({err:"MTP-Services couldn't be saved."}));
                            throw err;
                        }

                        // create the js/png/md async to avoid a blocked UI
                        //
                        let binPath = "node";
                        let childArgs = [
                            path.normalize(__dirname + '/../shape2code/converter.js'),
                            path.normalize(_shapeDesriptionFile),
                            shape2CodeDir,
                            shapeDirApp
                        ];

                        // inform the browser that the processing of the
                        // code generation is ongoing
                        //
                        io.emit("shape:generating", {
                            filePath: _shapeDesriptionFile
                        });
                        io.emit("mtp:service:generating", {
                            service: _parsed_service.skill.name,
                            index:_service_index
                        });
                        
                        // console.log("Generating skill images...");
                        //console.log(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
                        //logger.info(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
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
                            //logger.log(`stdout: ${stdout}`);
                            
                            if (err){
                                logger.error(`stderr: ${stderr}`);
                                // file could be saved but the index were not properly generated.
                                //
                                //res.send(JSON.stringify({err:"MTP-Services could be saved but the index were not properly generated."}));
                                callback(err);
                                // throw err;
                            }else{
                                // Write the skill description as JSON
                                fs.writeFileSync(_serviceDesriptionFile, _serviceDesriptionFileContent);
                                
                                // Copy the generated files to the user directory
                                let pattern = (_shapeDesriptionFile).replace(".shape", ".*");
                                glob(pattern, {}, function(er, files) {
                                    files.forEach(file => {
                                        fs.copyFile(file, file.replace(shapeDirApp, storage.shapeDirUserHOME), (err) => {
                                            if (err) throw err;
                                        });
                                    });
                                });
                                
                                // SocketIO
                                io.emit("mtp:service:generated", {
                                    service: _parsed_service.skill.name,
                                    index: _service_index
                                });
                                io.emit("shape:generated", {
                                    filePath: _shapeDesriptionFile
                                });
                                // Do work to process file here
                                _service_index += 1;
                                callback();
                            }
                        });
                    });

                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if( err ) {
                      // One of the iterations produced an error.
                      // All processing will now stop.
                      logger.error('A service failed to process');
                    } else {
                      logger.info('All services have been processed successfully');
                      // file is saved...fine
                        //
                    }
                    //res.send(JSON.stringify({err:err}));
                    io.emit("mtp:services:generated", {
                        filePath: req.body.filePath
                    });
                });                
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

            logger.info("Run Child Process: " + binPath  + " " + childArgs[0] + " " + childArgs[1] + " " + childArgs[2] + " " + childArgs[3]);
            childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
                if (err) {
                    logger.error(`stderr: ${stderr}`);
                    throw err;
                }                
                
                // logger.info(`stdout: ${stdout}`);

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
    // Handle MTP-Services request
    //
    // =================================================================
    // Get a mtp-service description
    app.get('/backend/mtp/getDescription', (req, res) => {
        logger.debug("MTPService getDescription called.", { service: 'Backend'});
        var _mtp_service_desc = req.query.mtp_service_name;
        if(_mtp_service_desc){
            try {
                    _json_resp = JSON.parse(fs.readFileSync(path.normalize(shapeDirApp + _mtp_service_desc + ".json"), "utf8"));
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({err:null, mtp_service_descp: _json_resp}));
                } catch (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({err:"Cannot read the requested mtp-service description."}));
                }
            
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({err:"Please summit the name of the mtp_service to read."}));
        }
    });

    // Connect to a MTP-Service during the execution of a sequence
    app.get('/backend/mtp/connect', (req, res) => {
        logger.debug("MTP-Service connect called.", { service: 'Backend'});
        var params = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT"
        };
        opcuaclientservice.ConnectMTPService(params, io, function(err, client) {
            // SockeiIO feedback
            //io.emit("serverstatus", connectionMsg);
            // io.emit("skillModels", gFoundedSkills);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, connected: client?client.connected:false }));
        });
    });

    app.get('/backend/mtp/disconnect', (req, res) => {
        logger.debug("MTP-Service connect called.", { service: 'Backend'});
        var params = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT"
        };
        opcuaclientservice.DisconnectMTPService(params, function(err, client) {
            // SockeiIO feedback
            //io.emit("serverstatus", connectionMsg);
            // io.emit("skillModels", gFoundedSkills);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, connected: client.connected }));
        });
    });

    // Write MTP-Parameter
    app.get('/backend/mtp/writeRequestParameters', (req, res) => {
        logger.debug("MTP-writeRequestParameters called.", { service: 'Backend'});
        let variable = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.body.ip, 
            port: req.body.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.body.mtpServiceName,
            nodes: req.body.nodes,
            values: req.body.values
        };

        opcuaclientservice.WriteVariableNodesWithNSUrl(variable, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // read MTP-Result Parameter
    app.get('/backend/mtp/readResultParameters', (req, res) => {
        logger.debug("MTP-readResultVariables called.", { service: 'Backend'});
        let variables = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.body.ip, 
            port: req.body.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.body.mtpServiceName,
            nodes: req.body.nodes
        };

        opcuaclientservice.readVariableNodesWithNSUrl(variables, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // Monitor MTP-Service
    app.get('/backend/mtp/monitorService', (req, res) => {
        logger.debug("monitorNode called.", { service: 'Backend'});
        var param = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.body.ip, 
            port: req.body.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.body.mtpServiceName,
            nodes: req.body.nodes
        };

        opcuaclientservice.monitorMTPService(param, io, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
        });
    });

    // Call MTP-Service
    // NOTE: Call is resumed as writting certain values to the OPC UA server on specified tags. 
    // Therefore we assume that the variables and values have already been prepared
    app.get('/backend/mtp/callService', (req, res) => {
        logger.debug("MTP-callService called.", { service: 'Backend'});
        let variable = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.body.ip, 
            port: req.body.port, 
            serverName: "INVOCATION_CLIENT",
            skillName: req.body.mtpServiceName,
            nodes: req.body.nodes,
            values: req.body.values
        };

        opcuaclientservice.WriteVariableNodesWithNSUrl(variable, function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, results: results }));
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
            
            // Compile the template object
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
                // logger.info(binPath, childArgs[0], childArgs[1], childArgs[2], childArgs[3]);
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
                    //logger.log(`stdout: ${stdout}`);
                    
                    if (err){
                        logger.error(`stderr: ${stderr}`);
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

    app.get('/backend/skill/disconnect', (req, res) => {
        logger.debug("Service connect called.", { service: 'Backend'});
        var params = { 
            socketID: "INVOCATION_CLIENT", 
            ip: req.query.ip, 
            port: req.query.port, 
            serverName: "INVOCATION_CLIENT"
        };
        opcuaclientservice.DisconnectPLC(params, function(err, client) {
            // SockeiIO feedback
            //io.emit("serverstatus", connectionMsg);
            // io.emit("skillModels", gFoundedSkills);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ err: err, connected: client.connected }));
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


    // =================================================================
    // Now configure the Swager api and start the server.
    //
    // =================================================================
    //  Start the web server
    configureSwaggerAPI(app_api, function(_app){

        // Bind the swagger API server with the main server
        app.use('/api/', _app);

        // Export the main application before starting the server
        global.MAIN_APP = {
            io:io,
            http:http,
            opcuaclientservice:opcuaclientservice,
            address:address,
            skillParser:skillParser,
            template7:template7,
            port:port,
            storage:storage,
            logger:logger,
            kg_enpoints:kg_enpoints
        };

        // Start listening to the main server on port
        http.listen(port, function() {
            console.log('using Puppeteer for server side rendering of shape previews:', puppeteer._projectRoot)
            console.log('+------------------------------------------------------------+');
            console.log('| Welcome to the SP347 Skill Invokation Client               |');
            console.log('|------------------------------------------------------------|');
            console.log('| System is up and running. Copy the URL below and open this |');
            console.log('| in your browser: http://' + address + ':' + port + '/                 |');
            console.log('|                  http://localhost:' + port + '/                    |');
            console.log('| SWagger Docs:    http://' + address + ':' + port + '/api/docs         |');
            console.log('| Rest API:        http://localhost:' + port + '/api/                |');
            console.log('+------------------------------------------------------------+');
        });
    })
    
}
runServer();

