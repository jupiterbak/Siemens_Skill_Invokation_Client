
var uuidv4 = require('uuid/v4');
var parser = require('xml-js');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var xmlserial = require('xmldom').XMLSerializer;
var url = require('url');


var MTPParser = function(raw_xml_json_object, logger) {
    var self = this;
    this.logger = logger;
    this.start_method = null;
    this.version = "MTPV0";
    this.service_ip = "localhost";
    this.service_port = "4840";
    this.mtp_services = [];
    this.hmi_views = [];
    this.dom = new dom();
    this.xml_serial = new xmlserial();
    this.mtp_xml_object = raw_xml_json_object; 
    self.moduleTypePackage_doc = null;
    //this.opcua_server_set_doc = null;
    this.connection_set_instance_list_doc = null;
    this.connection_set_source_list_doc = null;

    this.instance_list_dict = {};
    this.source_list_dict = {};

    this.mtp_services = this.parseAllServices(this.mtp_xml_object);
    this.hmi_views = this.parseAllHMIViews(this.mtp_xml_object);
};

function hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
}

// =================================================================
// Parse the skill object to determine all the information needed.
//
// =================================================================
MTPParser.prototype.parseAllServices = function(mtp_xml_object) {
    var self = this;
    //console.time("Load MTP");
    // Parse the dom
    var doc = self.dom.parseFromString(mtp_xml_object);
    //console.timeLog("Load MTP", "--> ParseString()");
    // determine the Version
    //var version_node = xpath.select("/CAEXFile[@SchemaVersion]", doc);
    //var _tmp_version = parser.xml2js(self.xml_serial.serializeToString(version_node[0]),{compact: true, spaces: 4});
    //self.version = _tmp_version.CAEXFile._attributes.SchemaVersion;
    self.version = xpath.select("/CAEXFile/@SchemaVersion", doc)[0].value;

    //console.timeLog("Load MTP", "--> Read version");

    // get the module type package
    var moduleTypePackage_node = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPSUCLib/ModuleTypePackage']", doc, false);
    if(moduleTypePackage_node.length > 0){
        self.moduleTypePackage_doc = new dom().parseFromString(self.xml_serial.serializeToString(moduleTypePackage_node[0]));
    }
    //console.timeLog("Load MTP", "--> GetModuleTypePackage");

    // extract instance list from Connection set
    var connection_set_instance_node = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPSUCLib/CommunicationSet/InstanceList']", self.moduleTypePackage_doc, false);
    if(connection_set_instance_node.length > 0){
        self.connection_set_instance_list_doc = new dom().parseFromString(self.xml_serial.serializeToString(connection_set_instance_node[0]));
    }
    //console.timeLog("Load MTP", "--> Get Connection Instance");

    // Build Instance list Dict
    var _tmp_inst_list = parser.xml2js(self.xml_serial.serializeToString(connection_set_instance_node[0]),{compact: true, spaces: 4});
    _tmp_inst_list.InternalElement.InternalElement.forEach(__ie => { // InternalElement
        if (__ie.Attribute && __ie.Attribute.length){
            __ie.Attribute.forEach(_ie_attr => {
                if(_ie_attr._attributes.Name === 'RefID'){
                    self.instance_list_dict[_ie_attr.Value._text] = __ie.Attribute;
                }                
            });
        }
    });
    
    //console.timeLog("Load MTP", "--> Build Instance list Dict");


    // extract sources list from Connection set
    var connection_set_source_node = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPSUCLib/CommunicationSet/SourceList']", self.moduleTypePackage_doc, false);
    if(connection_set_source_node.length > 0){
        self.connection_set_source_list_doc = new dom().parseFromString(self.xml_serial.serializeToString(connection_set_source_node[0]));
    }
    //console.timeLog("Load MTP", "--> Get Connection Source List");

    // Prepare Source List dict
    var _tmp_src_list = parser.xml2js(self.xml_serial.serializeToString(connection_set_source_node[0]),{compact: true, spaces: 4});
    _tmp_src_list.InternalElement.InternalElement.ExternalInterface.forEach(_ei => {
        self.source_list_dict[_ei._attributes.ID] = _ei.Attribute;
    });
    //console.timeLog("Load MTP", "--> Build Source list Dict");

    // Extract the connectionSet & IP-Address
    // TODO: JUPITER - Add Support for multiple opcua servers
    /*    
    var opcua_server_set = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPCommunicationSUCLib/ServerAssembly/OPCUAServer']", self.connection_set_source_list_doc);
    if(opcua_server_set.length > 0){
        var _tmp = parser.xml2js(self.xml_serial.serializeToString(opcua_server_set[0]),{compact: true, spaces: 4});
        var myURL =  url.parse(_tmp.InternalElement.Attribute.Value._text);
        self.service_port = myURL.port;
        self.service_ip = myURL.host.split(':')[0];
        //self.opcua_server_set_doc = new dom().parseFromString(self.xml_serial.serializeToString(opcua_server_set[0]));
    }
    */
    var opcua_server_urls = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPCommunicationSUCLib/ServerAssembly/OPCUAServer']/Attribute[@Name='Endpoint']/Value/text()", self.connection_set_source_list_doc);
    if(opcua_server_urls.length > 0){
        var myURL =  url.parse(opcua_server_urls[0].nodeValue);
        self.service_port = myURL.port;
        self.service_ip = myURL.host.split(':')[0];
        
    }
    //console.timeLog("Load MTP", "--> Get OPC UA Server Instance");

    // Extract all MTP services
    this.service_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/Service']", doc);
    //console.timeLog("Load MTP", "--> Extract MTP services");
    //console.timeLog("Load MTP", "--> Start Reading services");
    // Extract all procedures/Strategies from the mtp services and generate corresponding skill models
    this.service_nodes.forEach(service_node => {
        //console.timeLog("Load MTP", "--> New service");
        var service_doc = new dom().parseFromString(self.xml_serial.serializeToString(service_node));
        var _tmp_service = parser.xml2js(self.xml_serial.serializeToString(service_node),{compact: true, spaces: 4});

        var _service_model = {
            "Description": {
                "name": _tmp_service.InternalElement._attributes.Name,
            },
            "Interface":null
        };
        //console.timeLog("Load MTP", "--> Start read service attributes");
        // Get the service properties and build a skill model
        
        // External refID from MTP
        var _serviceRefID = self.filterByAttribute(_tmp_service.InternalElement.Attribute, 'RefID').Value._text;
        if(_serviceRefID){
            // Save 
            _service_model.Description['RefID'] = _serviceRefID;
            // Get Communication Instance object
            var service_com_Inst_attr_list = self.instance_list_dict[_serviceRefID];
            
            if(service_com_Inst_attr_list && (service_com_Inst_attr_list.length > 0)){
                
                // Extract all Attribute RefID
                var _tmp_service_Inst_attr = self.getAllAttributeAsObject(service_com_Inst_attr_list);

                // Extract al OPCUA Tag for the attribute of the services
                var _tmp_service_opcua_tag = self.getAllOPCUATagAsObject(_tmp_service_Inst_attr, self.connection_set_source_list_doc);

                // Save
                _service_model.Interface = _tmp_service_opcua_tag;
            }
        }
        //console.timeLog("Load MTP", "--> End read service attributes");

        // Extract Procedure for this service
        var procedure_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/ServiceProcedure']", service_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        
        //console.timeLog("Load MTP", "--> Start read Strategies");
        // Transcribe mtp to skill model    
        procedure_nodes.forEach(visua_object_node => {
            //console.timeLog("Load MTP", "--> new Procedure");
            var procedure_doc = new dom().parseFromString(self.xml_serial.serializeToString(visua_object_node));

            // Parse the xmljs
            var _tmp_procedure = parser.xml2js(self.xml_serial.serializeToString(visua_object_node),{compact: true, spaces: 4});
            
            // Add skill model
            var _procedure_model = {
                "ip": self.service_ip,
                "port": self.service_port,
                "skill": {
                    "name": _tmp_service.InternalElement._attributes.Name + "_" + _tmp_procedure.InternalElement._attributes.Name,
                    "IsSelfCompleting": self.filterByAttribute(_tmp_procedure.InternalElement.Attribute, 'IsSelfCompleting').Value._text,
                    "ProcedureID": self.filterByAttribute(_tmp_procedure.InternalElement.Attribute, 'ProcedureID').Value._text,
                    "IsDefault": self.filterByAttribute(_tmp_procedure.InternalElement.Attribute, 'IsDefault').Value._text,
                    "Description":self.filterByAttribute(_tmp_procedure.InternalElement.Attribute, 'Description').Value._text,
                    "Type": self.filterByAttribute(_tmp_procedure.InternalElement.Attribute, 'Type').Value._text
                },
                "serviceModel": _service_model,
                "version": "V0",
                "parameters": {
                    "inputs": [],
                    "outputs": []
                }
            };

            //console.timeLog("Load MTP", "--> read Procedure Parameter");
            // Extract Procedure parameters and generate inputs
            //var parameter_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/ServiceParameter/ProcedureParameter']", procedure_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
            var parameter_nodes = _tmp_procedure.InternalElement.InternalElement;
            parameter_nodes.forEach(_tmp_param => {
                // Get the parameter description
                var param_desc = [];
                param_desc = self.parseParameterDescriptionWithOPCUAInterface(_tmp_param);
                // Name
                var _param_name = _tmp_param._attributes.Name;
                var _param_type = self.filterByAttribute(_tmp_param.Attribute, 'Type').Value._text;

                if(_param_type === 'ProcedureParameter' || _param_type === 'ConfigurationParameter' || _param_type === 'ProcessValueIn'){
                    _procedure_model.parameters.inputs.push({
                        "name": _param_name,
                        "type": _param_type,
                        "Interface": param_desc,
                        "type": "Variable",
                        "id_circle": uuidv4(),
                        "id_label": uuidv4(),
                        "id_port": uuidv4()
                    });
                }else if(_param_type === 'ProcessValueOutput' || _param_type === 'ReportValue'){
                    _procedure_model.parameters.outputs.push({
                        "name": _param_name,
                        "type": _param_type,
                        "Interface": param_desc,
                        "type": "Variable",
                        "id_circle": uuidv4(),
                        "id_label": uuidv4(),
                        "id_port": uuidv4()
                    });
                }
                
                
            });
            //console.timeLog("Load MTP", "--> End Read Procedure Parameter");
            // Add to the skill list
            self.mtp_services.push(_procedure_model);
        });
        //console.timeLog("Load MTP", "--> End read Strategies");
    });
    //console.timeLog("Load MTP", "--> End Reading services");
    //console.timeEnd("Load MTP");
    return self.mtp_services;
};

MTPParser.prototype.parseAllHMIViews = function(mtp_xml_object) {
    var self = this;
    
    // Parse the dom
    var doc = self.dom.parseFromString(mtp_xml_object);

    // determine the Version
    var hmi_node = xpath.select("//InstanceHierarchy[@Name='HMI']", doc);
    var hmi_node_doc = new dom().parseFromString(self.xml_serial.serializeToString(hmi_node[0]));
    // Extract all VIEW
    this.view_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPHMISUCLib/Picture']", hmi_node_doc);

    // Extract all procedures/Strategies from the mtp services and generate corresponding skill models
    this.view_nodes.forEach(view_node => {
        var view_doc = new dom().parseFromString(self.xml_serial.serializeToString(view_node));
        var _tmp_view = parser.xml2js(self.xml_serial.serializeToString(view_node),{compact: true, spaces: 4});
        var brain_objects = {
            "draw2d":[]
        };

        // Extract All lines simulating the connections
        var connection_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPHMISUCLib/Connection/Pipe']", view_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        // Transcribe mtp to brain Objects   
        connection_nodes.forEach(connection_node => {
            // Parse the xmljs
            var _tmp_con = parser.xml2js(self.xml_serial.serializeToString(connection_node),{compact: true, spaces: 4});            
            // Add visual object
            var connection_model = {
                "type": "draw2d.shape.basic.PolyLine",
                "id": uuidv4(),
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "PolyLine",
                "stroke": 3,
                "color": "#b0b0b0",
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "vertex": self.makeEdgePathArray(self.filterByAttribute(_tmp_con.InternalElement.Attribute, 'Edgepath').Value._text),
                "radius": 2,
                "text":  _tmp_con.InternalElement._attributes.Name,            
                "labels": []
            };

            brain_objects.draw2d.push(connection_model);
        });

        // Extract All lines simulating the measuring connections
        var connection_mes_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPHMISUCLib/Connection/MeasurementLine']", view_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        // Transcribe mtp to brain Objects   
        connection_mes_nodes.forEach(connection_mes_node => {
            // Parse the xmljs
            var _tmp_con_mes = parser.xml2js(self.xml_serial.serializeToString(connection_mes_node),{compact: true, spaces: 4});            
            // Add visual object
            var connection_mes_model = {
                "type": "draw2d.shape.basic.PolyLine",
                "id": uuidv4(),
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "PolyLine",
                "stroke": 3,
                "color": "#b0b0b0",
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "vertex": self.makeEdgePathArray(self.filterByAttribute(_tmp_con_mes.InternalElement.Attribute, 'Edgepath').Value._text),
                "radius": 2,
                "text":  _tmp_con_mes.InternalElement._attributes.Name,            
                "labels": []
            };

            brain_objects.draw2d.push(connection_mes_model);
        });

        // Extract All lines simulating the measuring connections
        var connection_func_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPHMISUCLib/Connection/FunctionLine']", view_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        // Transcribe mtp to brain Objects   
        connection_func_nodes.forEach(connection_func_node => {
            // Parse the xmljs
            var _tmp_con_func = parser.xml2js(self.xml_serial.serializeToString(connection_func_node),{compact: true, spaces: 4});            
            // Add visual object
            var connection_func_model = {
                "type": "draw2d.shape.basic.PolyLine",
                "id": uuidv4(),
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "PolyLine",
                "stroke": 3,
                "color": "#b0b0b0",
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "vertex": self.makeEdgePathArray(self.filterByAttribute(_tmp_con_func.InternalElement.Attribute, 'Edgepath').Value._text),
                "radius": 2,
                "text":  _tmp_con_func.InternalElement._attributes.Name,            
                "labels": []
            };

            brain_objects.draw2d.push(connection_func_model);
        });

        // Extract All Visual Objects
        var visua_object_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPHMISUCLib/VisualObject']", view_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        // Transcribe mtp to brain Objects   
        visua_object_nodes.forEach(visua_object_node => {
            // Parse the xmljs
            var _tmp = parser.xml2js(self.xml_serial.serializeToString(visua_object_node),{compact: true, spaces: 4});
            
            // Add visual object
            var visual_object_model = {
                "type": "draw2d.shape.basic.Rectangle",
                "id": uuidv4(),
                "x": self.filterByAttribute(_tmp.InternalElement.Attribute, 'X').Value._text,
                "y": self.filterByAttribute(_tmp.InternalElement.Attribute, 'Y').Value._text,
                "width": self.filterByAttribute(_tmp.InternalElement.Attribute, 'Width').Value._text, 
                "height": self.filterByAttribute(_tmp.InternalElement.Attribute, 'Height').Value._text,
                "zindex": self.filterByAttribute(_tmp.InternalElement.Attribute, 'ZIndex').Value._text,
                "text":  _tmp.InternalElement._attributes.Name,
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "angle": self.filterByAttribute(_tmp.InternalElement.Attribute, 'Rotation').Value._text,
                "userData": {},
                "cssClass": "Rectangle",
                "bgColor": "#f0f0f0",
                "color": "#303030",
                "stroke": 0.5,
                "radius": 1,
                "dasharray": null,
                "labels": []
              };

            brain_objects.draw2d.push(visual_object_model);
        });

        self.hmi_views.push(brain_objects);
    });
    return self.hmi_views;
};

MTPParser.prototype.getVersion = function() {
    var self = this;
    return self.version;
};

MTPParser.prototype.getParsedservices = function() {
    var self = this;
    return self.mtp_services;
};

MTPParser.prototype.getParsedHMIViews = function() {
    var self = this;
    return self.hmi_views;
};

MTPParser.prototype.parseParameterDescriptionWithOPCUAInterface = function(param_node) {
    var self = this;
    var _res = {};
    // External refID from MTP
    var _RefID = self.filterByAttribute(param_node.Attribute, 'RefID').Value._text;
    if(_RefID){
        // Get Communication Instance object
        var param_Inst_attr = self.instance_list_dict[_RefID];
        if(param_Inst_attr){
            
            // Extract all Attribute
            var _tmp_param_Inst_attr = self.getAllAttributeAsObject(param_Inst_attr);

            // Extract al OPCUA Tag for the attribute of the services
            var _tmp_param_opcua_tag = self.getAllOPCUATagAsObject(_tmp_param_Inst_attr);

            // Save
            _res = _tmp_param_opcua_tag;
        }
    }
    return _res;
};

MTPParser.prototype.getAllOPCUATagAsObject = function(src_object) {
    var self = this;
    var _res = {};
    for(var key in src_object) {
        var refID = src_object[key];
        //
        var  opcua_Inst_attr_list = self.source_list_dict[refID];
        if(opcua_Inst_attr_list){
            var _tmp_opcua_Inst_Attr = self.getAllAttributeAsObject(opcua_Inst_attr_list);
            _res[key] ={
                //"name": _tmp_opcua_Inst.ExternalInterface._attributes.Name,
                "nodeId": _tmp_opcua_Inst_Attr,
            };
        }
    }
    return _res;
};

MTPParser.prototype.getAllAttributeAsObject = function(_list) {
    var _res = {};

    for (let i = 0; i < _list.length; i++) {
        const _elem = _list[i];
        if(_elem.Value){
            _res[_elem._attributes.Name] = _elem.Value._text;
        }        
    }
    return _res;
};

MTPParser.prototype.filterByAttribute = function(_list, _attr) {
    if(Array.isArray(_list) ){
        for (let i = 0; i < _list.length; i++) {
            const _elem = _list[i];
            if (_elem._attributes.Name === _attr){
                return _elem;
            }
        }
    }else{
        return _list;
    }
    
    return null;
};

MTPParser.prototype.makeEdgePathArray = function(_txt) {
    var self = this;
    var _c_list = (""+ _txt).split(";");
    var coordinates = [];
    for (var i = 0; i < _c_list.length; i++) {
        var _str_elem = _c_list[i];
        if(_str_elem.indexOf(",") < 0) continue;
        var _cood = _str_elem.split(",");
        try {
            coordinates.push({
                "x": Number.parseInt(_cood[0]),
                "y": Number.parseInt(_cood[1])
            });
        } catch (error) {
            continue;
        }        
    }
    return coordinates;
};

module.exports = MTPParser;