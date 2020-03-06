// just a simple mock object for the brainbox
// Hardware binding
//
export default {

  raspi: {
    set: function (pin, value) {
    },
    get: function (pin) {
      return false
    },
    on: function(event, callback){
    },
    connected: false
  },

  arduino: {
    set: function (pin, value) {
    },
    get: function (pin) {
      return false
    },
    on: function(event, callback){
    },
    connected: false
  }
}
