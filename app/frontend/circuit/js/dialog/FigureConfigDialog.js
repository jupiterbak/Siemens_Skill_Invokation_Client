//"private" variables
import Hogan from "hogan.js"

var currentFigure = null;

//"public" stuff
var dialog = null;

export default dialog= new class FigureConfigDialog {
  constructor(){
    this.figure = null;
  }

  show(figure, pos) {
    var self = this;
    Mousetrap.pause();

    currentFigure = figure;
    this.figure = figure;

    var settings = figure.getParameterSettings().slice(0);
    $.each(settings, function (i, el) {
      el.value = currentFigure.attr("userData." + el.name);
      if(el.property.type === 'select'){
        el.optional_values = el.property.optional_values;
      }
    });

    // Generate the Header First
    var output =  '  <div class="header">Object Configuration</div>   ' +
                  '  <div class="bg-danger text-danger" id="FigureConfigDialogMessage"></div>   ';
    // Generate each fields
    $.each(settings, function (i, el) {
      if(el.property.type === 'select'){
        var compiled_select = Hogan.compile(
          '         <div class="form-group">' +
          '           <label for="figure_property_{{name}}">{{label}}</label>' +
          '           <select class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}">' +
          '             {{#optional_values}}' +
          '               <option  value="{{value}}">{{label}}</option>'+
          '             {{/optional_values}}' +
          '           </select>' +
          '         </div>                  '
        );
        output = output + compiled_select.render(el);
      }else if(el.property.type === 'checkbox'){
        var compiled_checkbox = Hogan.compile(
          '         <div class="form-group">' +
          '            <div class="checkbox">' +
          '               <label for="figure_property_{{name}}">' +
          '                    <input type="checkbox" id="figure_property_{{name}}" data-name="{{name}}"> {{label}}' +
          '               </label>' +
          '             </div>' +
          '         </div>                  '
        );
        output = output + compiled_checkbox.render(el);
      }else if(el.property.type === 'textarea' || el.property.type === 'longtext'){
        var compiled_checkbox = Hogan.compile(
          '         <div class="form-group">' +
          '               <label for="figure_property_{{name}}">{{label}}</label>' +
          '               <textarea type="text" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">{{value}}</textarea>' +
          '         </div>                  '
        );
        output = output + compiled_checkbox.render(el);
      }else if(el.property.type === 'integer' || el.property.type === 'number'){
        var compiled_checkbox = Hogan.compile(
          '         <div class="form-group">' +
          '               <label for="figure_property_{{name}}">{{label}}</label>' +
          '               <input type="number" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}}">' +
          '         </div>                  '
        );
        output = output + compiled_checkbox.render(el);
      }  
      else{
        var compiled = Hogan.compile(
          '         <div class="form-group">' +
          '           <label for="figure_property_{{name}}">{{label}}</label>' +
          '           <input type="text" class="form-control" id="figure_property_{{name}}" data-name="{{name}}" value="{{value}}" placeholder="{{label}} ">' +
          '         </div>                  '
        );
        output = output + compiled.render(el);
      }
    });

    // Generate the Btn
    output += '<button class="submit">Ok</button> ';

    $("#figureConfigDialog").html(output);
    $("#figureConfigDialog").show().css({top: pos.y, left: pos.x, position: 'absolute'});
    // Hide error message dialog
    $("#FigureConfigDialogMessage").text("");
    //$("#FigureConfigDialogMessage").hide();

    $("#figureConfigDialog input, #figureConfigDialog select, #figureConfigDialog textarea").focus();

    $("#figureConfigDialog input").keypress((e) => {
      if (e.which == 13) {
        var _validateInput = self.figure.validateInputs;
        if(_validateInput){
          var _validation_results = self.figure.validateInputs();
          if(_validation_results.error){
            // Show error message
            $("#FigureConfigDialogMessage").text(_validation_results.error);
            $("#FigureConfigDialogMessage").show();
          }else{
            this.hide();
          }
        }else{
          this.hide();
        }
      }
    });

    $("#figureConfigDialog textarea, #figureConfigDialog input, #figureConfigDialog select").change(function(){
      $("#FigureConfigDialogMessage").text("");
      $("#FigureConfigDialogMessage").hide();
    });

    $("#figureConfigDialog .submit").on("click",  () => {
      var _validateInput = self.figure.validateInputs;
      if(_validateInput){
        var _validation_results = self.figure.validateInputs();
        if(_validation_results.error){
          // Show error message
          $("#FigureConfigDialogMessage").text(_validation_results.error);
          $("#FigureConfigDialogMessage").show();
        }else{
          this.hide();
        }
      }else{
        this.hide();
      }         
    });

    $.each(settings, (index, setting) =>{
      var figureValue = currentFigure.attr("userData." + setting.name);
      $('#figureConfigDialog select[data-name="' + setting.name + '"] option[value="' + figureValue + '"]').attr('selected', 'selected');
    });
  }

  hide() {
    Mousetrap.unpause();
    if (currentFigure !== null) {
      $("#figureConfigDialog textarea, #figureConfigDialog input, #figureConfigDialog select").each(function (i, element) {
        element = $(element);
        var value = element.val();
        var name = element.data("name");

        currentFigure.attr("userData." + name, value);
      });
    }
    // Hide error message
    $("#FigureConfigDialogMessage").text("");
    //$("#FigureConfigDialogMessage").hide();

    $("#figureConfigDialog").hide();
    $("#figureConfigDialog").html("");

    currentFigure = null;
  }
}();

