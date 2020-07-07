import conf from './../Configuration'

let sanitize = require("sanitize-filename")


class ModelChecker {

  /**
   * @constructor
   *
   */
  constructor() {
    Object.preventExtensions(this);
  }

  check(_model, _formula) {
    const self = this;
    return $.ajax({
      url: conf.backend.model_checker.check,
      xhrFields: {
        withCredentials: true
      },
      data: {
        model: _model,
        formula:_formula
      }
    }).then((resp) => {
      return resp;        
    });
  }
}

let modelChecker = new ModelChecker();
export default modelChecker;