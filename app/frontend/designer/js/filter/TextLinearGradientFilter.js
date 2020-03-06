import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"
import "../widget/ui.anglepicker"

export default shape_designer.filter.TextLinearGradientFilter = class TextLinearGradientFilter extends Filter {

  constructor() {
    super("shape_designer.filter.TextLinearGradientFilter")
    this.colorPicker1 = null
    this.colorPicker2 = null
    this.startColor = "#f0f0f0"
    this.endColor = "#3f3f3f"
    this.angle = 0
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_panel">' +
      '     Linear Gradient' +
      '    <span id="button_remove_' + this.cssScope + '"><img  class="svg icon pull-right" src="./images/dialog_close.svg"/></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '      <div class="input-group text-center" style="width:100%" >' +
      '           <div id="' + this.cssScope + '_angle" />' +
      '      </div> ' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="' + this.cssScope + '_color1" type="text" value="' + this.startColor + '" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="' + this.cssScope + '_color2" type="text" value="' + this.endColor + '" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $('#' + this.cssScope + '_angle').anglepicker({
      start: (e, ui) => {
      },
      change: (e, ui) => {
        this.angle = ui.value
        figure.repaint()
      },
      stop: (e, ui) => {
      },
      value: this.angle
    })

    var picker1 = this.colorPicker1 = new jscolor.color($("#" + this.cssScope + '_color1')[0], {})
    this.colorPicker1.fromString(this.startColor)
    this.colorPicker1.onImmediateChange = () => {
      this.startColor = "#" + picker1.toString()
      figure.repaint()
    }

    var picker2 = this.colorPicker2 = new jscolor.color($("#" + this.cssScope + '_color2')[0], {})
    this.colorPicker2.fromString(this.endColor)
    this.colorPicker2.onImmediateChange = () => {
      this.endColor = "#" + picker2.toString()
      figure.repaint()
    }


    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      $('#' + this.containerId).animate({
        "height": "0",
        "opacity": 0,
        "margin-bottom": 0
      }, 500, () => {
        $('#' + this.containerId ).remove()
      })
    })
  }

  apply(figure, attributes, lattr) {
    lattr.fill = this.angle + "-" + this.endColor + "-" + this.startColor
  }

  removePane() {
    if (this.colorPicker1 !== null) {
      this.colorPicker1.hidePicker()
    }
    if (this.colorPicker2 !== null) {
      this.colorPicker2.hidePicker()
    }
  }

  onInstall(figure) {
  }

  getPersistentAttributes(relatedFigure) {
    let memento = super.getPersistentAttributes(relatedFigure)

    memento.startColor = this.startColor
    memento.endColor = this.endColor
    memento.angle = this.angle

    return memento
  }

  setPersistentAttributes(relatedFigure, memento) {
    super.setPersistentAttributes(relatedFigure, memento)

    this.startColor = memento.startColor
    this.endColor = memento.endColor
    this.angle = memento.angle

    return memento
  }
}




