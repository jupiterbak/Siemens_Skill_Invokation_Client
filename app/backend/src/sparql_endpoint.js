/**
 * Copyright 2018 Siemens AG.
 * 
 * File: LEMS.js
 * Project: SP 164
 * Author:
 *  - Jupiter Bakakeu
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
 * -- 10.02.2018
 *      Initial implementation
 * --------------------------------------------------------------------
 **/

var when = require('when');
var util = require("util");
var SparqlHttp = require('sparql-http-client');
var fetch = require('isomorphic-fetch');
SparqlHttp.fetch = fetch;
// which endpoint to query

const Q_ALL_SKILLS = " \
SELECT ? subject ? predicate ? object\
WHERE { ? subject ? predicate ? object }\
LIMIT 100 ";

const Q_ALL_PROCESS = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX cps: <http://siemens.com/knowledge_graph/cyber_physical_systems/industrial_cps#> \
SELECT ?subClass ?label ?comment WHERE { \
  ?subClass rdfs:subClassOf cps:Process . \
  ?subClass rdfs:label ?label . \
  ?subClass rdfs:comment ?comment . \
}";

const Q_ALL_PRODUCT = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX cps: <http://siemens.com/knowledge_graph/cyber_physical_systems/industrial_cps#> \
SELECT ?subClass ?label ?comment WHERE { \
  ?subClass rdfs:subClassOf cps:Material . \
  ?subClass rdfs:label ?label . \
  ?subClass rdfs:comment ?comment . \
}";

const Q_ALL_RESSOURCE = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX cps: <http://siemens.com/knowledge_graph/cyber_physical_systems/industrial_cps#> \
SELECT ?subClass ?label ?comment WHERE { \
  ?subClass rdfs:subClassOf cps:Resource . \
  ?subClass rdfs:label ?label . \
  ?subClass rdfs:comment ?comment . \
}";

const Q_TYPED_CHILD = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX cps: <http://siemens.com/knowledge_graph/cyber_physical_systems/industrial_cps#> \
SELECT ?subClass ?label ?comment WHERE { \
  ?subClass rdfs:subClassOf <####> . \
  ?subClass rdfs:label ?label . \
  ?subClass rdfs:comment ?comment . \
}";

const Q_GET_SKILL_KG = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
PREFIX owl: <http://www.w3.org/2002/07/owl#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
PREFIX eq: <http://siemens.com/knowledge_graph/cyber_physical_systems/sma/equipment#>\
PREFIX cps: <http://siemens.com/knowledge_graph/cyber_physical_systems/industrial_cps#>\
PREFIX upper: <http://siemens.com/knowledge_graph/industrial_upper_ontology#>\
SELECT  DISTINCT  ?machine ?skill  ?label ?skill2 ?label2 \
WHERE {\
  ?machine rdf:type ?q.\
  ?machine rdf:type owl:NamedIndividual.\
  ?q  owl:onProperty cps:performs.\
  ?q owl:allValuesFrom ?skill.\
  {\
       ?skill rdfs:label ?label .\
  } UNION {\
       ?skill owl:unionOf ?k .\
       ?k rdf:rest*/rdf:first? ?skill2 .\
       ?skill2 rdfs:label ?label2.\
       FILTER EXISTS{ ?skill2 rdfs:label ?label2. }\
  }\
}"



var ID_COUNTER = 888;
var SparqlEndpoint = function(ip, port) {
    this.ip = ip;
    this.port = port;
    this.endpoint = new SparqlHttp({ endpointUrl: 'http://' + ip + ':' + port + '/skill' });
    this.ID = ID_COUNTER++;
};

SparqlEndpoint.prototype.getID = function(_app, _settings) {
    return this.ID;
};

SparqlEndpoint.prototype.init = function(_app, _settings) {

};
SparqlEndpoint.prototype.start = function() {

};
SparqlEndpoint.prototype.stop = function() {

};

SparqlEndpoint.prototype.getAllSkill = function() {
    return endpoint.selectQuery(Q_ALL_SKILLS).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter The result
        console.log(body);
    }).catch(function(err) {
        console.error(err);
    });
};

SparqlEndpoint.prototype.getAllProcess = function(original_res) {
    return this.endpoint.selectQuery(Q_ALL_PROCESS).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter the results
        obj = JSON.parse(body);
        var rslts = [];
        if (obj.results) {
            obj.results.bindings.forEach(el => {
                if (Object.keys(el).length > 0) {
                    var label = el.label;
                    var comment = el.comment;
                    var piece = el.subClass.value.split("#").pop(-1);
                    rslts.push({
                        "key": el.subClass.value,
                        "id": el.subClass.value,
                        "text": label ? label.value : piece,
                        "comment": comment ? comment.value : el.subClass.value,
                        'state': {
                            'opened': false,
                            'selected': false
                        },
                        "children": true
                    });
                }
            });
        }
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));

    }).catch(function(err) {
        console.error(err);
    });
};

SparqlEndpoint.prototype.getAllResource = function(original_res) {
    return this.endpoint.selectQuery(Q_ALL_RESSOURCE).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter the results
        obj = JSON.parse(body);
        var rslts = [];
        if (obj.results) {
            obj.results.bindings.forEach(el => {
                if (Object.keys(el).length > 0) {
                    var label = el.label;
                    var comment = el.comment;
                    var piece = el.subClass.value.split("#").pop(-1);
                    rslts.push({
                        "id": el.subClass.value,
                        "key": el.subClass.value,
                        "text": label ? label.value : piece,
                        "comment": comment ? comment.value : el.subClass.value,
                        'state': {
                            'opened': false,
                            'selected': false
                        },
                        "children": true
                    });
                }
            });
        }
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));

    }).catch(function(err) {
        console.error(err);
    });
};

SparqlEndpoint.prototype.getAllProduct = function(original_res) {
    return this.endpoint.selectQuery(Q_ALL_PRODUCT).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter the results
        obj = JSON.parse(body);
        var rslts = [];
        if (obj.results) {
            obj.results.bindings.forEach(el => {
                if (Object.keys(el).length > 0) {
                    var label = el.label;
                    var comment = el.comment;
                    var piece = el.subClass.value.split("#").pop(-1);
                    rslts.push({
                        "id": el.subClass.value,
                        "key": el.subClass.value,
                        "text": label ? label.value : piece,
                        "comment": comment ? comment.value : el.subClass.value,
                        'state': {
                            'opened': false,
                            'selected': false
                        },
                        "children": true
                    });
                }
            });
        }
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));

    }).catch(function(err) {
        console.error(err);
    });
};

SparqlEndpoint.prototype.getChildBySubType = function(original_res, parentID) {
    var query = Q_TYPED_CHILD.replace("####", parentID);
    var rslts = [];
    return this.endpoint.selectQuery(query).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter the results
        obj = JSON.parse(body);
        if (obj.results) {
            obj.results.bindings.forEach(el => {
                if (Object.keys(el).length > 0) {
                    var label = el.label;
                    var comment = el.comment;
                    var piece = el.subClass.value.split("#").pop(-1);
                    rslts.push({
                        "key": el.subClass.value,
                        "id": el.subClass.value,
                        "text": label ? label.value : piece,
                        "comment": comment ? comment.value : el.subClass.value,
                        'state': {
                            'opened': false,
                            'selected': false
                        },
                        "children": true
                    });
                }
            });
        }
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));

    }).catch(function(err) {
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));
    });
};

SparqlEndpoint.prototype.getAllSkillInstances = function(original_res) {
    return this.endpoint.selectQuery(Q_GET_SKILL_KG).then(function(res) {
        return res.text();
        // result body of the query
    }).then(function(body) {
        // Filter the results
        obj = JSON.parse(body);
        var rslts = [];
        if (obj.results) {
            obj.results.bindings.forEach(el => {
                if (Object.keys(el).length > 0) {
                    var label = el.label;
                    var label2 = el.label2;
                    var machine = el.machine;
                    var skill = el.skill.value.split("#").pop(-1);
                    var skill2 = el.skill2? el.skill2.value.split("#").pop(-1):skill;
                    rslts.push({
                        "id": label ? el.skill.value: el.skill2.value,
                        "key": label ? el.skill.value: el.skill2.value,
                        "text": label ? label.value : label2.value,
                        "comment": machine ? machine.value : skill,
                        'state': {
                            'opened': false,
                            'selected': false
                        },
                        "children": true
                    });
                }
            });
        }
        original_res.setHeader('Content-Type', 'application/json');
        original_res.send(JSON.stringify(rslts));

    }).catch(function(err) {
        console.error(err);
    });
};




module.exports = SparqlEndpoint;