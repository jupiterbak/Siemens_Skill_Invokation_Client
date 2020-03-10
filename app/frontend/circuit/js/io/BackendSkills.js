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
}

let skillproxy = new BackendSkills();
export default skillproxy