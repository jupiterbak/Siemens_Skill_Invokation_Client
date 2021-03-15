
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
    this.dom = new dom();
    this.xml_serial = new xmlserial();
    this.mtp_xml_object = raw_xml_json_object; 
    this.mtp_services = this.parseAllServices(this.mtp_xml_object);
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
    this.service_nodes.forEach(service_node => {
        var service_doc = new dom().parseFromString(self.xml_serial.serializeToString(service_node));
        var _tmp_service = parser.xml2js(self.xml_serial.serializeToString(service_node),{compact: true, spaces: 4});

        // Extract Strategy for this service
        var strategy_nodes = xpath.select("//InternalElement[@RefBaseSystemUnitPath='MTPServiceSUCLib/ServiceStrategy']", service_doc);//,null, xpath.XPathResult.ANY_TYPE, null);
        
        // Transcribe mtp to skill model    
        strategy_nodes.forEach(strategy_node => {
            var strategy_doc = new dom().parseFromString(self.xml_serial.serializeToString(strategy_node));

            // Parse the xmljs
            var _tmp = parser.xml2js(self.xml_serial.serializeToString(strategy_node),{compact: true, spaces: 4});
            
            // Add skill model
            var _skill_model = {
                "ip": self.service_ip,
                "port": self.service_port,
                "skill": {
                    "name": _tmp_service.InternalElement._attributes.Name + "_" + _tmp.InternalElement._attributes.Name
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

MTPParser.prototype.getVersion = function() {
    var self = this;
    return self.version;
};

MTPParser.prototype.getParsedservices = function() {
    var self = this;
    return self.mtp_services;
};

module.exports = MTPParser;