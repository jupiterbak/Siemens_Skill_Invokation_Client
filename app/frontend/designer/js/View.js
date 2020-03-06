
export default draw2d.Canvas.extend({

  init: function (app, id) {
    this._super(id, 16000, 16000)
    this.clippboardFigure = null
    this.app = app
    this.grid = new draw2d.policy.canvas.ShowGridEditPolicy(20)

    this.setScrollArea("#" + id)

    this.installEditPolicy(this.grid)
    this.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy())
    this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy())

    Mousetrap.bindGlobal(['left'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(-diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['up'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, -diff)
      })
      return false
    })
    Mousetrap.bindGlobal(['right'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(diff, 0)
      })
      return false
    })
    Mousetrap.bindGlobal(['down'], () => {
      let diff = this.getZoom() < 0.5 ? 0.5 : 1
      this.getSelection().each((i, f) => {
        f.translate(0, diff)
      })
      return false
    })

    Mousetrap.bindGlobal(['ctrl+c', 'command+c'], () => {
      let primarySelection = this.getSelection().getPrimary()
      if (primarySelection !== null) {
        this.clippboardFigure = primarySelection.clone()
        this.clippboardFigure.translate(5, 5)
      }
      return false
    })

    Mousetrap.bindGlobal(['ctrl+v', 'command+v'], () => {
      if (this.clippboardFigure !== null) {
        let cloneToAdd = this.clippboardFigure.clone()
        let command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition())
        this.getCommandStack().execute(command)
        this.setCurrentSelection(cloneToAdd)
      }
      return false
    })

    let zoom = new draw2d.policy.canvas.WheelZoomPolicy()
    this.installEditPolicy(zoom)

    let setZoom = (newZoom) => {
      let bb = this.getBoundingBox().getCenter()
      let c = $("#canvas")
      this.setZoom(newZoom)
      c.scrollTop((bb.y / newZoom - c.height() / 2))
      c.scrollLeft((bb.x / newZoom - c.width() / 2))
    }

    // Inject the ZoomIn Button and the callbacks
    //
    $("#canvas_zoom_in").on("click", () => {
      setZoom(this.getZoom() * 1.2)
    })

    // Inject the OneToOne Button
    //
    $("#canvas_zoom_normal").on("click", () => {
      setZoom(1.0)
    })

    // Inject the ZoomOut Button and the callback
    //
    $("#canvas_zoom_out").on("click", () => {
      setZoom(this.getZoom() * 0.8)
    })

    $('#canvas_config_grid').on('change', () => {
      if ($('#canvas_config_grid').prop('checked')) {
        this.installEditPolicy(this.grid)
      }
      else {
        this.uninstallEditPolicy(this.grid)
      }
    })

    $("#canvas_config_items").on("click", (e) => {
      e.stopPropagation()
    })

    this.reset()
  },

  setCursor: function (cursor) {
    if (cursor !== null) {
      this.html.css("cursor", "url(" + cursor + ") 0 0, default")
    }
    else {
      this.html.css("cursor", "default")
    }
  },


  /**
   * @method
   * Reset the view/canvas and starts with a clean and new document with default decorations
   *
   *
   */
  reset: function () {
    this.clear()
  },

  setZoom: function (newZoom) {
    $("#canvas_zoom_normal").text((parseInt((1.0 / newZoom) * 100)) + "%")
    this._super(newZoom)
  },


  getExtFigure: function (id) {
    let figure = null
    this.getExtFigures().each((i, e) => {
      if (e.id === id) {
        figure = e
        return false
      }
    })
    return figure
  },

  getExtFigures: function () {
    let figures = this.getFigures().clone()

    // the export rectangles are not part of the document itself. In this case we
    // filter them out
    //
    figures.grep((figure) => {
      return (typeof figure.isExtFigure !== "undefined")
    })

    let lines = this.getLines().clone()
    lines.grep((line) => {
      return (typeof line.isExtFigure !== "undefined")
    })

    figures.addAll(lines)

    return figures
  },


  getBoundingBox: function () {
    let xCoords = []
    let yCoords = []
    this.getExtFigures().each((i, f) => {
      if (f instanceof shape_designer.figure.ExtPort) {
        return
      }
      let b = f.getBoundingBox()
      xCoords.push(b.x, b.x + b.w)
      yCoords.push(b.y, b.y + b.h)
    })
    let minX = Math.min(...xCoords)
    let minY = Math.min(...yCoords)
    let width = Math.max(10, Math.max(...xCoords) - minX)
    let height = Math.max(10, Math.max(...yCoords) - minY)

    return new draw2d.geo.Rectangle(minX, minY, width, height)
  },

  hideDecoration: function () {
    this.uninstallEditPolicy(this.grid)
    this.getFigures().each((index, figure) => {
      figure.unselect()
    })
  },

  showDecoration: function () {
    this.installEditPolicy(this.grid)
  },

  /**
   * @method
   * Return the width of the canvas
   *
   * @return {Number}
   **/
  getWidth: function () {
    return this.html.find("svg").width()
  },


  /**
   * @method
   * Return the height of the canvas.
   *
   * @return {Number}
   **/
  getHeight: function () {
    return this.html.find("svg").height()
  },

  centerView: function(){
    let bb = this.getBoundingBox().getCenter()
    let c = $("#canvas")
    c.scrollTop((bb.y / this.getZoom() - c.height() / 2))
    c.scrollLeft((bb.x /this.getZoom() - c.width() / 2))
  },

  centerDocument: function () {
    this.setZoom(1.0)
    // get the bounding box of the document and translate the complete document
    // into the center of the canvas. Scroll to the top left corner after them
    //
    let bb = this.getBoundingBox()

    let dx = (this.getWidth() / 2) - (bb.x + bb.w / 2)
    let dy = (this.getHeight() / 2) - (bb.y + bb.h / 2)

    this.getFigures().each((i, f) => {
      f.translate(dx, dy)
    })
    this.getLines().each((i, f) => {
      f.translate(dx, dy)
    })
    this.centerView()
  }

})

