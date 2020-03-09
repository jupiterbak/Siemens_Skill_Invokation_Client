
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
      if((""+ip === "") || (""+port ==="")){
        $("#skillBrowseDialog .alert").text("Please define the IP and the Port!").show();
      }else{
        skillproxy.browseSkills(ip,port)
        .then(function (obj) {
          if(obj.err){
            $("#skillBrowseDialog .alert").text("Error while browsing the opc ua server.").show();
          }else{
            const _skills =obj.skills;
            $("#skillBrowseDialog .alert").text("Found " + _skills.length + " skills. saving ...").show();
            _skills.forEach(_skill => {
              skillproxy.saveSkill(_skill)
              .then(function () {
                $("#skillBrowseDialog .alert").text("Saving " + _skill.skill.name + " ...").show();
                $("#skillBrowseDialog .alert").addClass("spinner");
              });
            });
            setTimeout(() => {              
              $('#skillBrowseDialog').modal('hide');
              Mousetrap.unpause();
              location.reload();
            }, 10000);
            
          }
        });
      }
    });
  }
}
