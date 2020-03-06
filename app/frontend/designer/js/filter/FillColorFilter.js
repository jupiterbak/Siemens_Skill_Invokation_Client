import Filter from "./Filter"
import jscolor from "../widget/jscolor/jscolor"

export default shape_designer.filter.FillColorFilter = class FillColorFilter extends Filter {

  constructor() {
    super("shape_designer.filter.FillColorFilter")
    this.colorPicker = null
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#color_fill_panel">' +
      '    Color Fill' +
      '    <span id="button_remove_FillColorFilter"><img class="svg icon pull-right" src="./images/dialog_close.svg"/><span>' +
      ' </div>' +

      ' <div class="panel-body collapse in" id="color_fill_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '      <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_color_fill" type="text" value="" name="filter_color_fill" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '    </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    var picker = this.colorPicker = new jscolor.color(document.getElementById('filter_color_fill'), {})
    this.colorPicker.fromString(figure.getBackgroundColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setBackgroundColor("#" + picker.toString())
    }, figure)

    $("#button_remove_FillColorFilter").on("click", $.proxy(function () {
      figure.removeFilter(this)
      figure.setBackgroundColor(null)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, function () {
        $('#'+this.containerId).remove()
      })
    }, this))
  }

  onInstall(figure) {
    figure.setBackgroundColor("#f0f3f3")
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }
}




