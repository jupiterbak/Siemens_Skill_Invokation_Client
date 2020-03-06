export default shape_designer.figure.DecoratedInputPort = draw2d.InputPort.extend({

  init: function (attr, setter, getter) {
    this.hasChanged = true

    this._super(attr, setter, getter)

    this.decoration = new shape_designer.figure.MarkerFigure()

    this.add(this.decoration, new draw2d.layout.locator.LeftLocator({margin: 8}))


    // a port can have a value. Useful for workflow engines or circuit diagrams
    this.setValue(true)
  },

  useDefaultValue: function () {
    this.decoration.setStick(true)
  },

  setValue: function (value) {
    this.hasChanged = this.value !== value
    this._super(value)
  },

  hasChangedValue: function () {
    return this.hasChanged
  },

  hasRisingEdge: function () {
    return this.hasChangedValue() && this.getValue()
  },

  hasFallingEdge: function () {
    return this.hasChangedValue() && !this.getValue()
  }
})
