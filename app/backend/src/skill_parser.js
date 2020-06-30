
const uuidv4 = require('uuid/v4');

var SkillParser = function(skill_object, logger) {
    this.skill_object = skill_object;
    this.logger = logger;
    this.version = "V3";
    this.start_method = null;
    this.parsed_object = this.parse(this.skill_object);
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
SkillParser.prototype.parse = function(skill_object) {
    var self = this;
    var _skill_object = skill_object;

    // Determine the skill version
    if(hasOwnProperty(_skill_object, 'skillModel')){
        var _skill_object_model = _skill_object.skillModel;
        var _skill_name = _skill_object.skill.name;
        if(hasOwnProperty(_skill_object_model, 'Invokation')){
            self.version = 'V3';
            _skill_object["version"] = "V3";
            self.start_method = _skill_object_model.Invokation.Start;
        }else if(hasOwnProperty(_skill_object_model, 'Result') && hasOwnProperty(_skill_object_model, 'xRequestProvided') && hasOwnProperty(_skill_object_model, 'xResultAcknowledge') ){
            if(hasOwnProperty(_skill_object_model, _skill_name + '_DB')){
                _skill_object["version"] = 'V2';
                self.version = 'V2';
                self.start_method = _skill_object_model[ _skill_name + '_DB'];
            }else{
                _skill_object["version"] = 'V1';
                self.version = 'V1';
            }
        }else{
            _skill_object["version"] = 'V0';
            self.version = 'V0';
        }        
    }else{
        self.version = 'V0';
        _skill_object["version"] = 'V0';
    }

    // Parse the parameters
    _skill_object["parameters"] = { "inputs": [], "outputs": [] };
    if(self.version === 'V3'){
        // Extract the parameters with the schema of a skill from ats
        // Input parameter from the parameters of the start function
        if(_skill_object.skillModel.Invokation.Start.parameters.inputArguments){
            _skill_object.skillModel.Invokation.Start.parameters.inputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.inputs.push(param);
            });
        }
        

        // Input parameter from the parameters of the GetResult function
        if(_skill_object.skillModel.Invokation.GetResult.parameters.inputArguments){
            _skill_object.skillModel.Invokation.GetResult.parameters.inputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.inputs.push(param);
            });
        }
       

        // Output parameter from the parameters of the start function
        if(_skill_object.skillModel.Invokation.Start.parameters.outputArguments){
            _skill_object.skillModel.Invokation.Start.parameters.outputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.outputs.push(param);
            });
        }

        // Output parameter from the parameters of the GetResult function
        if(_skill_object.skillModel.Invokation.GetResult.parameters.outputArguments){
            _skill_object.skillModel.Invokation.GetResult.parameters.outputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.outputs.push(param);
            });
        }
    }else if (self.version === 'V2'){
        // Extract the parameters with the schema of a skill from ats
        var _name = _skill_object.skill.name;
        var _object_model = _skill_object.skillModel;
        // Input parameter from the parameters of the start function
        if(_skill_object.skillModel[_name + '_DB'].parameters.inputArguments){
            _skill_object.skillModel[_name + '_DB'].parameters.inputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.inputs.push(param);
            });
        }

        // Output parameter from the parameters of the start function
        if(_skill_object.skillModel[_name + '_DB'].parameters.outputArguments){
            _skill_object.skillModel[_name + '_DB'].parameters.outputArguments.forEach(param => {
                param["id_circle"] = uuidv4();
                param["id_label"] = uuidv4();
                param["id_port"] = uuidv4();
                _skill_object.parameters.outputs.push(param);
            });
        }

        // Output parameter from the parameters of the Result variable
        if(_skill_object.skillModel.Result){
            for (const [key, value] of Object.entries(_skill_object.skillModel.Result)) {
                if(value.nodeId){
                    var param = value;
                    param["id_circle"] = uuidv4();
                    param["id_label"] = uuidv4();
                    param["id_port"] = uuidv4();
                    _skill_object.parameters.outputs.push(param);
                }
            }
        }
    }

    return _skill_object;
};

SkillParser.prototype.getVersion = function() {
    var self = this;
    return self.version;
};

SkillParser.prototype.getParsedObject = function() {
    var self = this;
    return self.parsed_object;
};

module.exports = SkillParser;