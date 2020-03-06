import AbstractToolPolicy from "./AbstractToolPolicy"

import cursor from "../../images/cursors/cursor_line.png"

export default AbstractToolPolicy.extend({

  MESSAGE_STEP1: "Select start point of the line.",
  MESSAGE_STEP2: "Click to add additional vertex.<br>Double click to finish line.",

  init: function () {
    this._super()

    this.lineFigure = null
    this.canvas = null
  },


  onInstall: function (canvas) {
    this.setToolText(this.MESSAGE_STEP1)
    this.canvas = canvas
    canvas.setCursor(cursor)
  },

  onUninstall: function (canvas) {
    if (this.lineFigure !== null) {
      if (this.lineFigure.getVertices().getSize() < 2) {
        canvas.remove(this.lineFigure)
        this.lineFigure = null
      }
      else {
        // stay in the canvas and finalize the stroke if a doubleClick
        let last = this.lineFigure.vertices.last()
        this.onDoubleClick(this.lineFigure, last.x, last.y, false, false)
      }
    }
    this.canvas = null
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

    if (this.lineFigure !== null) {
      this.lineFigure.setEndPoint(x, y)
    }
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


  onDoubleClick: function (figure, x, y, shiftKey, ctrlKey) {
    this.onClick(figure, x, y, shiftKey, ctrlKey)

    // Remove duplicate points at the end of the polyLine. This happens during the DoubleClick.
    // Reason: before the double click is fired the two "single click" comes before. In this case we
    // added three vertex for a doubleClick event
    //

    // don't use the shortcut and assign the this.lineFigure.vertices to a local var.
    // the vertices are recreated in the "calculatePath" mnethod of the polygon and
    // the reference is in this case invalid...design flaw!
    //
    let last = this.lineFigure.vertices.last()
    let beforeLast = this.lineFigure.vertices.get(this.lineFigure.vertices.getSize() - 2)
    while (last.equals(beforeLast)) {
      this.lineFigure.removeVertexAt(this.lineFigure.vertices.getSize() - 2)
      beforeLast = this.lineFigure.vertices.get(this.lineFigure.vertices.getSize() - 2)
    }

    this.lineFigure = null
    this.executed()
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @template
   */
  onClick: function (figure, x, y, shiftKey, ctrlKey) {
    if (this.lineFigure === null) {
      this.setToolText(this.MESSAGE_STEP2)

      this.lineFigure = new shape_designer.figure.ExtLine()
      this.lineFigure.setStartPoint(x, y)
      this.lineFigure.setEndPoint(x, y)
      let command = new draw2d.command.CommandAdd(this.canvas, this.lineFigure, x, y)
      this.canvas.getCommandStack().execute(command)
      this.canvas.setCurrentSelection(this.lineFigure)
    }
    else {
      this.lineFigure.addVertex(x, y)
    }
  }
})




