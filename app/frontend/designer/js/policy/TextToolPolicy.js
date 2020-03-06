import AbstractToolPolicy from "./AbstractToolPolicy"

import cursor from "../../images/cursors/cursor_text.png"

export default AbstractToolPolicy.extend({

  TITLE: "Text",
  MESSAGE_STEP1: "Select location for text",
  MESSAGE_STEP2: "Enter Text",

  init: function () {
    this._super()

    this.topLeft = null
    this.newFigure = null
  },


  onInstall: function (canvas) {
    this.setToolText(this.MESSAGE_STEP1)
    canvas.setCursor(cursor)
  },

  onUninstall: function (canvas) {
    canvas.setCursor(null)
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {

  },

  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @template
   */
  onMouseMove: function (canvas, x, y) {
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} dx The x diff between start of dragging and this event
   * @param {Number} dy The y diff between start of dragging and this event
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @template
   */
  onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
  },

  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @template
   */
  onMouseUp: function (canvas, x, y) {
    if (this.topLeft === null) {
      this.topLeft = new draw2d.geo.Point(x, y)
      this.setToolText(this.MESSAGE_STEP2)

      this.newFigure = new shape_designer.figure.ExtLabel()
      this.newFigure.setText("Text")
      this.newFigure.setStroke(0)
      this.newFigure.setPadding(5)
      this.newFigure.setFontSize(16)

      var command = new draw2d.command.CommandAdd(canvas, this.newFigure, parseInt(x), parseInt(y))
      canvas.getCommandStack().execute(command)
      canvas.setCurrentSelection(this.newFigure)

      // start inplace editing
      //
      setTimeout($.proxy(function () {
        this.newFigure.onDoubleClick()
      }, this), 100)

      this.executed()
    }
    else {
      this.topLeft = null
    }
  }
})




