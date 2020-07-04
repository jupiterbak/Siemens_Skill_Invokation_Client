
import skillproxy from "./../io/BackendSkills"

export default class BrowseSkillsDialog {

  /**
   * @constructor
   *
   */
  constructor() {
    this.log = application_log;
  }

  /**
   * @method
   *
   * Open the file picker and load the selected file.<br>
   *
   * @param {Function} successCallback callback method if the user select a file and the content is loaded
   * @param {Function} errorCallback method to call if any error happens
   *
   * @since 4.0.0
   */
  show(canvas) {
    var self = this;
    Mousetrap.pause();
    $("#skillBrowseDialog .opcuaip").val("localhost");
    $("#skillBrowseDialog .opcuaport").val("4840");
    $("#skillBrowseDialog .opcua_module_name").val("Module 01");
    

    $('#skillBrowseDialog').off('shown.bs.modal').on('shown.bs.modal', (event) => {
      $("#skillBrowseDialog .alert").hide();
      $("#skillBrowseDialog .alert").removeClass("spinner");
      $(event.currentTarget).find('input:first').focus();
    });
    $("#skillBrowseDialog").modal("show");

    // Button: Commit to GitHub
    //
    $("#skillBrowseDialog .okButton").off("click").on("click", () => {
      canvas.setCurrentSelection(null);
      let ip = $("#skillBrowseDialog .opcuaip").val();
      let port = $("#skillBrowseDialog .opcuaport").val();
      let machineName = ("" + $("#skillBrowseDialog .opcua_module_name").val()).replace(/\s/g, "");
      if((""+ip === "") || (""+port ==="") || (""+machineName ==="")){
        $("#skillBrowseDialog .alert").text("Please define the machine name, the IP-address and the Port of the module.").show();
      }else{
        $("#skillBrowseDialog .alert").text("Browsing ...").show();
        $("#skillBrowseDialog .alert").addClass("spinner");
        skillproxy.browseSkills(ip,port)
        .then(function (obj) {
          if(obj.err){
            $("#skillBrowseDialog .alert").text("Error while browsing the opc ua server.").show();
            self.log.error('[OPCUA] Error while browsing the opc ua server: ' + JSON.stringify(obj.err));
          }else{
            // Get the skill objects
            const _skills =obj.skills;

            // Show the results
            $("#skillBrowseDialog .alert").text("Found " + _skills.length + " skills. saving ...").show();
            self.log.info("[OPCUA] Found " + _skills.length + " skill(s). saving ...");
            // Save the found skills
            for (var i = 0, len = _skills.length; i < len; i++) {
              var _skill = _skills[i];
              $("#skillBrowseDialog .alert").text("Saving Skill " + _skill.skill.name + " ...").show();
              $("#skillBrowseDialog .alert").addClass("spinner");

              // Save the skill synchronously
              skillproxy.saveSkill(_skill, machineName)
              .then(function(s_data) {
                if(s_data.err){
                  $("#skillBrowseDialog .alert").text("Error while saving the skill " + _skill.skill.name + ":" + s_data.err).show();
                  $("#skillBrowseDialog .alert").removeClass("spinner");
                  self.log.error("[OPCUA] Error while saving the skill"  + _skill.skill.name + ":" + s_data.err);
                }else{
                  $("#skillBrowseDialog .alert").text("Skill " + _skill.skill.name + "saved successfully.").show();
                  self.log.info("[OPCUA] Skill " + _skill.skill.name + "saved successfully.");
                  $("#skillBrowseDialog .alert").removeClass("spinner");
                  if(i=== (len -1)){
                    $('#skillBrowseDialog').modal('hide');
                    Mousetrap.unpause();
                    location.reload();
                  }
                }
              });
            }

            /*                                  
            setTimeout(() => {              
              $('#skillBrowseDialog').modal('hide');
              Mousetrap.unpause();
              location.reload();
            }, 10000 * _skills.length);
            */
            
          }
        });
      }
    });
  }
}
