
const uuidv4 = require('uuid/v4');
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
    
    // Parse the dom
    var doc = self.dom.parseFromString(mtp_xml_object);

    // determine the Version
    var version_node = xpath.select("/CAEXFile[@SchemaVersion]", doc);
    var _tmp_version = parser.xml2js(self.xml_serial.serializeToString(version_node[0]),{compact: true, spaces: 4});
    self.version = _tmp_version.CAEXFile._attributes.SchemaVersion;
    
    // Extract the connectionSet & IP-Address    
    var connection_set = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPCommunicationSUCLib/ServerAssembly/OPCUAServer']", doc);
    if(connection_set[0]){
        var _tmp = parser.xml2js(self.xml_serial.serializeToString(connection_set[0]),{compact: true, spaces: 4});
        var myURL =  url.parse(_tmp.InternalElement.Attribute.Value._text);
        self.service_port = myURL.port;
        self.service_ip = myURL.host.split(':')[0];
    }
    
    // Extract all MTP services
    this.service_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/Service']", doc);

    // Extract all procedures/Strategies from the mtp services and generate corresponding skill models
    this.service_nodes.forEach(view_node => {
        var view_doc = new dom().parseFromString(self.xml_serial.serializeToString(view_node));
        var _tmp_view = parser.xml2js(self.xml_serial.serializeToString(view_node),{compact: true, spaces: 4});

        // Extract Strategy for this service
        var strategy_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/ServiceStrategy']", view_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        
        // Transcribe mtp to skill model    
        strategy_nodes.forEach(visua_object_node => {
            var strategy_doc = new dom().parseFromString(self.xml_serial.serializeToString(visua_object_node));

            // Parse the xmljs
            var _tmp = parser.xml2js(self.xml_serial.serializeToString(visua_object_node),{compact: true, spaces: 4});
            
            // Add skill model
            var _skill_model = {
                "ip": self.service_ip,
                "port": self.service_port,
                "skill": {
                    "name": _tmp_view.InternalElement._attributes.Name + "_" + _tmp.InternalElement._attributes.Name
                },
                "skillModel": {
                },
                "version": "V0",
                "parameters": {
                    "inputs": [],
                    "outputs": []
                }
            };

            // Extract Strategy parameters and generate inputs
            var parameter_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/ServiceParameter/StrategyParameter']", strategy_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
            parameter_nodes.forEach(parameter_node => {
                var _tmp_param = parser.xml2js(self.xml_serial.serializeToString(parameter_node),{compact: true, spaces: 4});
                _skill_model.parameters.inputs.push({
                    "name": _tmp_param.InternalElement._attributes.Name,
                    "nodeId": {
                        "ns": "-",
                        "nid": "-"
                    },
                    "type": "Variable",
                    "id_circle": uuidv4(),
                    "id_label": uuidv4(),
                    "id_port": uuidv4()
                });
            });
            // Add to the skill list
            self.mtp_services.push(_skill_model);
        });
    });
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

MTPParser.prototype.filterByAttribute = function(_list, _attr) {
    for (let i = 0; i < _list.length; i++) {
        const _elem = _list[i];
        if (_elem._attributes.Name === _attr){
            return _elem;
        }
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