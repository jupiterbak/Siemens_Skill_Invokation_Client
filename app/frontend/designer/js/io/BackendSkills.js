import conf from './../Configuration'

let sanitize = require("sanitize-filename")


class BackendSkills {

  /**
   * @constructor
   *
   */
  constructor() {
    this.skillList = [];
    Object.preventExtensions(this);
  }

  get allSkills() {
    return this.skillList;
  }

  getSkillStateConfig() {
    return {
        "nodeKeyProperty": "id",
        "nodeDataArray": [
            { "id": "running", "text": "Running", "isGroup": true, "group": "cleared", "isHighlighted": true, "nid": 75 },
            { "id": "stopped", "text": "Stopped", "trans": 0, "group": "cleared", "isHighlighted": true, "loc": "150 650", "nid": 53 },
            { "id": "cleared", "text": "cleared", "isGroup": true, "isHighlighted": true, "nid": 71 },
            { "id": "aborted", "text": "aborted", "trans": 0, "loc": "600 850", "nid": 62 },
            { "id": "aborting", "text": "aborting", "trans": 1, "loc": " 370 850", "nid": 61 },
            { "id": "clearing", "text": "clearing", "trans": 1, "group": "cleared", "loc": "600 700", "nid": 55 },
            { "id": "stopping", "text": "stopping", "trans": 1, "group": "cleared", "loc": "370 650", "nid": 54 },
    
            { "id": "resetting", "text": "resetting", "trans": 1, "group": "running", "isGroup": true, "loc": "150 500", "nid": 27 },
            { "id": "check_resource", "text": "Check Res.", "trans": 1, "group": "resetting", "isHighlighted": true, "loc": "0 450", "nid": 1026 },
            { "id": "initialize_resource", "text": "Init. Res.", "trans": 1, "group": "resetting", "loc": "300 450", "nid": 1025 },
            { "id": "skill_initialized", "text": "Skill Res. Init.", "trans": 1, "group": "resetting", "loc": "150 400", "nid": 1027 },
    
            { "id": "idle", "text": "idle", "trans": 0, "group": "running", "isGroup": true, "loc": "150 250", "nid": 28 },
            { "id": "init_skill", "text": "Init. Skill", "trans": 0, "group": "idle", "isHighlighted": true, "loc": "150 270", "nid": 1018 },
            { "id": "skill_ready", "text": "Skill Ready", "trans": 0, "group": "idle", "loc": "150 200", "nid": 1017 },
    
    
            { "id": "execute", "text": "execute", "trans": 0, "group": "running", "isGroup": true, "loc": "400 200", "nid": 36 },
            { "id": "execute_skill", "text": "Execute Skill", "trans": 0, "group": "execute", "loc": "400 170", "nid": 1013 },
            { "id": "wait_next_step", "text": "Wait next Step", "trans": 0, "group": "execute", "loc": "400 270", "nid": 1014 },
    
    
            { "id": "completing", "text": "completing", "trans": 1, "group": "running", "loc": "600 200", "nid": 37 },
            { "id": "completed", "text": "completed", "trans": 0, "group": "running", "loc": "800 200", "nid": 38 },
    
            { "id": "hold", "text": "hold", "trans": 0, "group": "running", "isGroup": true, "isHighlighted": true, "loc": "350 0", "nid": 136 },
            { "id": "holding", "text": "holding", "trans": 1, "group": "hold", "loc": "200 0", "nid": 1020 },
            { "id": "held", "text": "held", "trans": 0, "group": "hold", "loc": "400 0", "nid": 1021 },
            { "id": "unholding", "text": "unholding", "trans": 1, "group": "hold", "loc": "600 0", "nid": 1022 }
        ],
        "linkDataArray": [
    
            { "from": "cleared", "to": "aborting", "curviness": 0, "text": "Abort" },
            { "from": "aborting", "to": "aborted", "curviness": 0, "text": "SC" },
            { "from": "aborted", "to": "clearing", "curviness": 0, "text": "Clear" },
            { "from": "clearing", "to": "stopped", "curviness": 50, "text": "SC" },
            { "from": "stopped", "to": "resetting", "curviness": 0, "text": "Reset" },
    
            { "from": "skill_initialized", "to": "idle", "curviness": 0, "text": "SC" },
            { "from": "check_resource", "to": "skill_initialized", "curviness": 20, "text": "OK" },
            { "from": "check_resource", "to": "initialize_resource", "curviness": 0, "text": "n.OK" },
            { "from": "initialize_resource", "to": "check_resource", "curviness": 50, "text": "SC" },
    
    
            { "from": "skill_ready", "to": "execute_skill", "curviness": 0, "text": "StartSkill" },
            { "from": "init_skill", "to": "skill_ready", "curviness": 0, "text": "SC" },
    
            { "from": "execute_skill", "to": "completing", "curviness": 0, "text": "SC" },
            { "from": "completing", "to": "completed", "curviness": 0, "text": "SC" },
            { "from": "completed", "to": "init_skill", "curviness": 180, "text": "Reset" },
            { "from": "execute", "to": "hold", "curviness": 0, "text": "hold" },
            { "from": "holding", "to": "held", "curviness": 0, "text": "SC" },
            { "from": "held", "to": "unholding", "curviness": 0, "text": "UnHold" },
            { "from": "unholding", "to": "execute_skill", "curviness": 0, "text": "SC" },
            { "from": "running", "to": "stopping", "curviness": 0, "text": "Stop" },
            { "from": "stopping", "to": "stopped", "curviness": 0, "text": "SC" },
    
            { "from": "execute_skill", "to": "wait_next_step", "curviness": 0, "text": "SC" },
            { "from": "wait_next_step", "to": "execute_skill", "curviness": 50, "text": "NEXT" }
        ]
    }
  }


  connectSkill(ip, port) {
    const self = this;
    self.skillList = [];
    return $.ajax({
      url: conf.backend.skill.connect,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: ip,
        port:port
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        self.skillList = resp.results;
        return {err: resp.err, skills:self.skillList};
      }        
      return {err: "Unknown response."};
    });
  }

  browseSkills(ip, port) {
    const self = this;
    self.skillList = [];
    return $.ajax({
      url: conf.backend.skill.browse,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: ip,
        port:port
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        self.skillList = resp.results;
        return {err: resp.err, skills:self.skillList};
      }        
      return {err: "Unknown response."};
    });
  }

  saveSkill(skillObject, _machineName) {
    return $.ajax({
        url: conf.backend.skill.save,
        method: "POST",
        async: false,
        xhrFields: {
          withCredentials: true
        },
        data: {
          filePath: "" + _machineName + "_" + skillObject.ip + "_" + skillObject.port + "_"+ skillObject.skill.name + ".shape",
          skill: skillObject
        }
      }
    );
  }

  deleteSkill(skill) {
    // TODO: Jupiter Delete Skill remotely
    // return $.ajax({
    //     url: conf.backend.skill.del,
    //     method: "POST",
    //     xhrFields: {
    //       withCredentials: true
    //     },
    //     data: {
    //       filePath: fileName
    //     }
    //   }
    // );
  }

  getSkillDescription(skill_name) {
    const self = this;
    return $.ajax({
      url: conf.backend.skill.getDescription,
      xhrFields: {
        withCredentials: true
      },
      data: {
        skill_name: skill_name,
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, skill_descp: JSON.parse(resp.skill_descp)};
      }        
      return {err: "Unknown response."};
    });
  }

  startSkill(_ip, _port, _skill_name, _parameters) {
    const self = this;
    self.skillList = [];
    return $.ajax({
      url: conf.backend.skill.call,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        skillName: _skill_name,
        method: 'Start',
        parameters: _parameters
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }        
      return {err: "Unknown response."};
    });
  }

  getResultsOfSkillCall(_ip, _port, _skill_name, _parameters) {
    const self = this;
    self.skillList = [];
    return $.ajax({
      url: conf.backend.skill.call,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        skillName: _skill_name,
        method: 'GetResults',
        parameters: _parameters
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }        
      return {err: "Unknown response."};
    });
  }
}

let skillproxy = new BackendSkills();
export default skillproxy