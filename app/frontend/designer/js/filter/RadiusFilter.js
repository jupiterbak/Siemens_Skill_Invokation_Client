import Filter from "./Filter"

export default shape_designer.filter.RadiusFilter = class RadiusFilter extends Filter {

  constructor() {
    super("shape_designer.filter.RadiusFilter")
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="' + this.containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#radius_panel">' +
      '    Corner Radius' +
      '    <span id="button_remove_RadiusFilter"><img class="svg icon pull-right" src="./images/dialog_close.svg"/></span>' +
      '</div>' +
      ' <div class="panel-body collapse in" id="radius_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '      <div class="input-group">' +
      '         <input class="mousetrap-pause form-control" id="filter_radius" type="text" value="' + figure.getRadius() + '" />' +
      '      </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')
    inlineSVG.init({svgSelector:"#"+this.containerId + " img.svg"})

    $("#filter_radius").TouchSpin({
      min: 0,
      max: 200,
      step: 1,
      maxboostedstep: 10,
      postfix: 'px'
    })
    $("#filter_radius").on("change", $.proxy(function () {
      this.setRadius(parseInt($("#filter_radius").val()))
    }, figure))

    $("#button_remove_RadiusFilter").on("click", () => {
      figure.removeFilter(this)
      figure.setRadius(0)
      $("#"+this.containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+this.containerId).remove()
      })
    })
  }

  removePane() {
  }
}




