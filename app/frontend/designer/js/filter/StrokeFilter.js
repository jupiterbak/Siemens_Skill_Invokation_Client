import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"

export default shape_designer.filter.StrokeFilter = class StrokeFilter extends Filter {

  constructor() {
    super("shape_designer.filter.StrokeFilter")
  }

  insertPane(figure, $parent) {
    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + this.cssScope + '_width_panel">' +
      '     Stroke' +
      '    <span id="button_remove_' + this.cssScope + '"><img  class="svg icon pull-right" src="./images/dialog_close.svg"/></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="' + this.cssScope + '_width_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_' + this.cssScope + '_width" type="text" value="' + figure.getStroke() + '" name="filter_' + this.cssScope + '_width" class="mousetrap-pause form-control" />' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_' + this.cssScope + '_color" type="text" value="" name="stroke_' + this.cssScope + '_color" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("input[name='filter_" + this.cssScope + "_width']").TouchSpin({
      min: 0,
      max: 50,
      step: 1,
      maxboostedstep: 1,
      postfix: 'px'
    })
    $("input[name='filter_" + this.cssScope + "_width']").on("change", $.proxy(function () {
      this.setStroke(parseInt($("input[name='filter_" + this.cssScope + "_width']").val()))
    }, figure))

    var picker = this.colorPicker = new jscolor.color(document.getElementById('filter_' + this.cssScope + '_color'), {})
    this.colorPicker.fromString(figure.getColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setColor("#" + picker.toString())
    }, figure)

    $("#button_remove_" + this.cssScope).on("click", () => {
      figure.removeFilter(this)
      figure.setStroke(0)
      $("#" + this.containerId ).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#' + this.containerId).remove()
      })
    })
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }

  onInstall(figure) {
    figure.setStroke(1)
  }

}




