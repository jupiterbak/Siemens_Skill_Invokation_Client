export default shape_designer.figure.TestSwitch = draw2d.shape.basic.Label.extend({

  NAME: "shape_designer.figure.TestSwitch",

  init: function (attr, setter, getter) {
    this._super({text: "Low"}, setter, getter)

    this.createPort("output")

    var _this = this

    this.value = false
    this.on("click", function () {
      _this.toggleValue()
      _this.getOutputPort(0).setValue(_this.value)
      _this.getOutputPort(0).getConnections().each(function (i, c) {
        c.getTarget().setValue(_this.value)
      })
    })
  },

  toggleValue: function () {
    this.value = !this.value
    this.attr({text: this.value ? "High" : "Low"})
  }
})

