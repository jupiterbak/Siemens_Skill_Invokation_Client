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
        return {err: resp.err, skill_descp: resp.skill_descp};
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