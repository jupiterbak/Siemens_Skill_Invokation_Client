/**
 * Copyright 2020 Siemens AG.
 * Project: SP 347
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
 * -- 10.07.2020
 *      Initial implementation
 * --------------------------------------------------------------------
 **/

// The `https` setting requires the `fs` module. Uncomment the following
// to make it available:
//var fs = require("fs");

module.exports = {
    // the tcp port that the web server is listening on
    uiPort: process.env.PORT || 7400,

    // By default, the LEMS UI accepts connections on all IPv4 interfaces.
    // The following property can be used to listen on a specific interface. For
    // example, the following would only allow connections from the local machine.
    uiHost: "127.0.0.1",

    // Retry time in milliseconds for TCP socket connections
    socketReconnectTime: 10000,

    // Timeout in milliseconds for TCP server socket connections
    //  defaults to no timeout
    socketTimeout: 120000,

    // Timeout in milliseconds for HTTP request connections
    //  defaults to 120 seconds
    httpRequestTimeout: 120000,

    // The maximum length, in characters, of any message sent to the debug sidebar tab
    debugMaxLength: 1000,


    // By default, credentials are encrypted in storage using a generated key. To
    // specify your own secret, set the following property.
    // If you want to disable encryption of credentials, set this property to false.
    // Note: once you set this property, do not change it - doing so will prevent
    // LEMS from being able to decrypt your existing credentials and they will be
    // lost.
    //credentialSecret: "a-secret-key",

    // The maximum size of HTTP request that will be accepted by the runtime swagger.
    // Default: 5mb
    apiMaxLength: '5mb',

    // Securing LEMS
    // -----------------
    // To password protect the LEMS editor and admin API, the following
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
            permissions: "*"
        }]
    },

    // The following property can be used to enable HTTPS
    // See http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
    // for details on its contents.
    // See the comment at the top of this file on how to load the `fs` module used by
    // this setting.
    //
    //https: {
    //    key: fs.readFileSync('privatekey.pem'),
    //    cert: fs.readFileSync('certificate.pem')
    //},

    // The following property can be used to cause insecure HTTP connections to
    // be redirected to HTTPS.
    requireHttps: false,


    // Anything in this hash is globally available to all functions.
    // It is accessed as context.global.
    // eg:
    //    functionGlobalContext: { os:require('os') }
    // can be accessed in a function block as:
    //    context.global.os

    functionGlobalContext: {
        os: require('os'),
        // octalbonescript:require('octalbonescript'),
        // jfive:require("johnny-five"),
        // j5board:require("johnny-five").Board({repl:false})
    },

    // The following property can be used to order the categories in the editor
    // palette. If a node's category is not in the list, the category will get
    // added to the end of the palette.
    // If not set, the following default order is used:
    //paletteCategories: ['subflows', 'input', 'output', 'function', 'social', 'mobile', 'storage', 'analysis', 'advanced'],

    // Configure the logging output
    runtimeMetricInterval: 60000,
    logging: {
        // Only console logging is currently supported
        console: {
            // Level of logging to be recorded. Options are:
            // fatal - only those errors which make the application unusable should be recorded
            // error - record errors which are deemed fatal for a particular request + fatal errors
            // warn - record problems which are non fatal + errors + fatal errors
            // info - record information about the general running of the application + warn + error + fatal errors
            // debug - record information which is more verbose than info + info + warn + error + fatal errors
            // trace - record very detailed logging + debug + info + warn + error + fatal errors
            level: "info",
            // Whether or not to include metric events in the log output
            metrics: true,
            // Whether or not to include audit events in the log output
            audit: false
        }
    },
    service:{
        opcuaclient: {
            name: "OPCUAClientService0",
            type: "OPCUAClientService",
            id: "IOTRuntime_0",
            level: "info",
            modulesetting: {
                interval: 10,
                ip: "0.0.0.0",
                port: 4840, // default OPC UA Port to initialize the input text fields
                defaultObjectModel: {
                    _states: ["Id", "xResultAcknowledge", "xRequestProvided"], // ["CurrentStateExt", "CurrentState", "Id"],
                    _kpi: ["CurrentLoads", "CurrentLoad", "CurrMachSpeed", "TargetLoad", "Product", "MachSpeed", "StateChangeInProgress", "Interlocked", "EnergySource", "SupportedModes", "Version", "MachSpeed_AC", "MachSpeed_DC"],
                    _actions: ["Abort", "Clear", "Reset", "Stop", "Hold", "Start", "UnHold", "GetResult"],
                    _data: [{
                        name: "",
                        nodeId: {
                            nsuri: "",
                            nid: ""
                        }
                    }]
                }
            },
        }
    }
};