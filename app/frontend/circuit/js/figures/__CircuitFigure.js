import MarkdownDialog from '../dialog/MarkdownDialog'
import conf from '../Configuration'

export default draw2d.SetFigure.extend({

  NAME: "CircuitFigure",

  init: function (attr, setter, getter) {
    this.tooltip = null
    this.tooltipTimer = -1

    this._super(attr, setter, getter)

    this.persistPorts = false
    this.zoomCallback = $.proxy(this.positionTooltip, this)

    this.on("dragstart", () => {
      this.hideTooltip(true)
    })

    this.on("mouseenter", () => {
      this.tooltipTimer = window.setTimeout(() => {
        this.tooltipTimer = -1
        this.showTooltip()
      }, 500)
    })

    this.on("mouseleave", () => {
      this.hideTooltip()
    })

    this.on("move", () => {
      this.positionTooltip()
    })

    this.on("dblclick", () => {
      let pathToMD = conf.shapes.url + this.NAME + ".md"
      $.get(pathToMD, function (content) {
        new MarkdownDialog().show(content)
      })
    })
  },

  setCanvas: function (canvas) {
    if (this.canvas !== null) this.canvas.off(this.zoomCallback)
    this._super(canvas)
    if (this.canvas !== null) this.canvas.on("zoom", this.zoomCallback)
  },

  hideTooltip: function (fast) {
    if (this.tooltipTimer !== -1) {
      window.clearTimeout(this.tooltipTimer)
      this.tooltipTimer = -1
    }
    else if (this.tooltip !== null) {
      if (fast) {
        this.tooltip.remove()
      }
      else {
        this.tooltip.fadeOut(500, function () {
          $(this).remove()
        })
      }
      this.tooltip = null
    }
  },

  showTooltip: function () {
    // don't show any tooltips if the simulation is running
    if(this.canvas.simulate===true){
      return
    }

    this.tooltip = $('<div class="draw2d_tooltip">' + this.NAME + '</div>')
      .appendTo('body')
      .hide()
      .fadeIn(1000)
    this.positionTooltip()
  },


  positionTooltip: function () {
    if (this.tooltip === null) {
      return
    }

    let width = this.tooltip.outerWidth(true)
    let pos = this.canvas.fromCanvasToDocumentCoordinate(
      this.getAbsoluteX() + this.getWidth() / 2 - width / 2 + 8,
      this.getAbsoluteY() + this.getHeight() + 10)

    this.tooltip.css({'top': pos.y, 'left': pos.x})
  },

  applyAlpha: function () {
  },

  layerGet: function (name, attributes) {
    if (this.svgNodes === null) return null

    let result = null
    this.svgNodes.some(function (shape) {
      if (shape.data("name") === name) {
        result = shape
      }
      return result !== null
    })

    return result
  },

  layerAttr: function (name, attributes) {
    if (this.svgNodes === null) return

    this.svgNodes.forEach(function (shape) {
      if (shape.data("name") === name) {
        shape.attr(attributes)
      }
    })
  },

  layerShow: function (name, flag, duration) {
    if (this.svgNodes === null) return

    if (duration) {
      this.svgNodes.forEach(function (node) {
        if (node.data("name") === name) {
          if (flag) {
            node.attr({opacity: 0}).show().animate({opacity: 1}, duration)
          }
          else {
            node.animate({opacity: 0}, duration, function () {
              this.hide()
            })
          }
        }
      })
    }
    else {
      this.svgNodes.forEach(function (node) {
        if (node.data("name") === name) {
          if (flag) {
            node.show()
          }
          else {
            node.hide()
          }
        }
      })
    }
  },

  calculate: function () {
  },

  onStart: function () {
  },

  onStop: function () {
  },

  getParameterSettings: function () {
    return []
  },


  getRequiredHardware: function () {
    return {
      raspi: false,
      arduino: false
    }
  },

  onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    // Activate a "smart insert" If the user drop this figure on connection
    //
    /*
    if (dropTarget instanceof draw2d.Connection) {
      let additionalConnection = dropTarget.getCanvas().createConnection()
      let oldSource = dropTarget.getSource()
      let oldTarget = dropTarget.getTarget()
      if (oldSource instanceof draw2d.InputPort) {
        oldSource = dropTarget.getTarget()
        oldTarget = dropTarget.getSource()
      }

      let stack = this.getCanvas().getCommandStack()
      let cmd = new draw2d.command.CommandReconnect(dropTarget)
      cmd.setNewPorts(oldSource, this.getInputPort(0))
      stack.execute(cmd)

      cmd = new draw2d.command.CommandConnect(oldTarget, this.getOutputPort(0))
      cmd.setConnection(additionalConnection)
      stack.execute(cmd)
    }
    */
  },


  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    let memento = this._super()

    // add all decorations to the memento
    //
    memento.labels = []
    this.children.each(function (i, e) {
      let labelJSON = e.figure.getPersistentAttributes()
      labelJSON.locator = e.locator.NAME
      memento.labels.push(labelJSON)
    })

    return memento
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    // remove all decorations created in the constructor of this element
    //
    this.resetChildren()

    // and add all children of the JSON document.
    //
    $.each(memento.labels, $.proxy(function (i, json) {
      // create the figure stored in the JSON
      let figure = eval("new " + json.type + "()")

      // apply all attributes
      figure.attr(json)

      // instantiate the locator
      let locator = eval("new " + json.locator + "()")

      // add the new figure as child to this figure
      this.add(figure, locator)
    }, this))
  }
})

