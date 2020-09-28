export default class FilterPane {


  constructor(app, elementId, view) {
    this.DEFAULT_LABEL = "Properties";
    this.html = $(elementId);
    this.view = view;
    this.currentFigure = null;

    // Register a Selection listener for the state handling
    // of the Delete Button
    //
    view.on("select", this.onSelectionChanged.bind(this));
  }

  /**
   * @method
   * Called if the selection in the canvas has been changed. You must register this
   * class on the canvas to receive this event.
   *
   * @param {draw2d.Canvas} canvas the emitter of the event. In this case it is the canvas.
   * @param {draw2d.Figure} figure
   */
  onSelectionChanged(canvas, event = {figure: null}) {
    var figure = event.figure;
    var self = this;
    this.html.html('');
    $('#add_filter_button').addClass('disabled');

    // Clear Pane
    if (this.currentFigure !== null) {
      self.removePane(this.html);
    }

    $("#add_filter_action_menu").html("");

    // Add if figure selected
    if (figure !== null) {
      $('#add_filter_button').removeClass('disabled');
      // Add Name
      self.insertPane(this.html, "figure_id" , 'ID', figure.id);
      self.insertPane(this.html, "figure_name" , 'Name', figure.NAME);      

      // If it is a skill load the description
      skillproxy.getSkillDescription(figure.NAME).then(function (desc) {
        if (desc.skill_descp){
          self.insertPane(self.html, "figure_ip" , 'IP', desc.skill_descp.ip);
          self.insertPane(self.html, "figure_port" , 'Port', desc.skill_descp.port);
          self.insertPane(self.html, "figure_skill_version" , 'skillVersion', desc.skill_descp.version);
        }
        if(figure.inputPorts){
          self.insertPane(self.html, "figure_inputs_count" , 'Inputs', figure.inputPorts.data.length);
        }
        if(figure.outputPorts){
          self.insertPane(self.html, "figure_outputs_count" , 'Outputs', figure.outputPorts.data.length);
        }

        if (desc.skill_descp){
          // Check if subskills
          var _keys = self.filterKeys(desc.skill_descp.skillModel).filter(function (el) {
            return el !== "Description" &&
                   el !== "Invokation";
          });

          _keys.forEach(e => {
            var obj_ = desc.skill_descp.skillModel[e];
            self.insertPane(self.html, "figure_subskill_" +  obj_.name , 'HasSubSkill ' +  obj_.name, obj_.name);
          });

        }
      });
    }

    this.currentFigure = figure;
  }

  filterKeys(obj){
      var keys = [];
      for(var key in obj){
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
  }

  

  insertPane($parent, containerId, label, txt) {

    $parent.append('<div id="' + containerId + '" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#' + label + '_fill_panel">' +
      label +
      '    <span id="button_remove_' + label + '"><img class="svg icon pull-right" src="./images/dialog_close.svg"/></span>' +
      ' </div>' +

      ' <div class="panel-body collapse in" id="' + label + '_fill_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '      <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_' + label + '_fill" type="text" value="" name="filter_' + label + '_fill" class="mousetrap-pause form-control color"/>' +
      '       </div>' +
      '    </div>' +
      ' </div>' +
      '</div>');
    $('#filter_' + label + '_fill' ).val(txt);

    $("#button_remove_" + label + "").on("click", () => {
      $("#"+containerId).animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#'+containerId).remove();
      });
    });
  }

  removePane($parent) {
    $parent.empty();
    //$('#'+containerId).remove();
  }
}