export default draw2d.policy.canvas.SelectionPolicy.extend({

  init: function () {
    this._super()
  },

  setToolText: function (message) {
    $('#currentTool_message').fadeOut(200, function () {
      $("#currentTool_message").html(message)
      $('#currentTool_message').fadeIn(200)
    })
  },

  executed: function(){
  }
})




