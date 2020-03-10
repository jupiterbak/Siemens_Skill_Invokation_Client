
import skillproxy from "./../io/BackendSkills"

export default class BrowseSkillsDialog {

  /**
   * @constructor
   *
   */
  constructor() {
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
    Mousetrap.pause()
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
    $("#skillBrowseDialog .okButton").off("click").on("click", async () => {
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
          }else{
            const _skills =obj.skills;
            $("#skillBrowseDialog .alert").text("Found " + _skills.length + " skills. saving ...").show();            
            _skills.forEach(async _skill =>  {
              $("#skillBrowseDialog .alert").text("Saving Skill " + _skill.skill.name + " ...").show();
              $("#skillBrowseDialog .alert").addClass("spinner");
              await skillproxy.saveSkill(_skill, machineName);
            });                        
            setTimeout(() => {              
              $('#skillBrowseDialog').modal('hide');
              Mousetrap.unpause();
              location.reload();
            }, 10000 * _skills.length);
            
          }
        });
      }
    });
  }
}
