
import skillproxy from "./../io/BackendSkills"
import async from 'async';

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
      $("#skill_browse_progress_formgroup").hide();
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
        $('#LabelSkillBrowseProgressBar').text("Please define the machine name, the IP-address and the Port of the module.");
      }else{
        // Show the progressbar to notify that processing have begun
        $("#skill_browse_progress_formgroup").show();      
        $('#LabelSkillBrowseProgressBar').text("Browsing ...").show();
        $('#SkillBrowseProgressBar').css('width', 50+'%').attr('aria-valuenow', 50);
        $('#SkillBrowseProgressBar').text(50+'%').show();

        skillproxy.browseSkills(ip,port)
        .then(function (obj) {
          if(obj.err){
            self.log.error('[OPCUA] Error while browsing the opc ua server.');            
            $('#LabelSkillBrowseProgressBar').text("Error while browsing the opc ua server.");
          }else{
            // Get the skill objects
            const _skills =obj.skills;

            // Show the results           
            $('#LabelSkillBrowseProgressBar').text("Found " + _skills.length + " skills. Saving ...");
            $('#SkillBrowseProgressBar').css('width', 10+'%').attr('aria-valuenow', 10);
            $('#SkillBrowseProgressBar').text(10+'%');

            self.log.info("[OPCUA] Found " + _skills.length + " skill(s). saving ...");
            // Save the found skills
            /*
            async.eachSeries(_skills, function(_skill, callback) {
              $("#skillBrowseDialog .alert").text("Saving Skill " + _skill.skill.name + " ...").show();
              $("#skillBrowseDialog .alert").addClass("spinner");
              // Save the skill synchronously
              skillproxy.saveSkill(_skill, machineName)
              .then(function(s_data) {
                if(s_data.err){                  
                  $("#skillBrowseDialog .alert").text("Error while saving the skill " + _skill.skill.name + ":" + s_data.err).show();
                  $("#skillBrowseDialog .alert").removeClass("spinner");
                  callback("[OPCUA] Error while saving the skill"  + _skill.skill.name + ":" + s_data.err);
                }else{
                  $("#skillBrowseDialog .alert").text("Skill " + _skill.skill.name + "saved successfully.").show();
                  self.log.info("[OPCUA] Skill " + _skill.skill.name + "saved successfully.");
                  $("#skillBrowseDialog .alert").removeClass("spinner");
                  callback();
                }
              });              
            }, function(err) {
                if( err ) {
                  // One of the iterations produced an error.
                  // All processing will now stop.
                  self.log.error(err);
                } else {
                  $('#skillBrowseDialog').modal('hide');
                    Mousetrap.unpause();
                    location.reload();
                  }
            });
            */
            
            for (var i = 0, len = _skills.length; i < len; i++) {
              var _skill = _skills[i];

              var percentage = (((i) / _skills.length) * 90) + 10;
              $('#LabelSkillBrowseProgressBar').text("Saving Skill '" + _skill.skill.name + "' ...");
              $('#SkillBrowseProgressBar').css('width', percentage+'%').attr('aria-valuenow', percentage);
              $('#SkillBrowseProgressBar').text(percentage+'%');
              
              self.log.info("[OPCUA] Saving Skill '" + _skill.skill.name + "' ...");
              // Save the skill synchronously
              skillproxy.saveSkill(_skill, machineName)
              .then(function(s_data) {
                if(s_data.err){
                  self.log.error("[OPCUA] Error while saving the skill"  + _skill.skill.name + ":" + s_data.err);

                  $('#LabelSkillBrowseProgressBar').text("Error while saving the skill " + _skill.skill.name + ":" + s_data.err);
                }else{
                  self.log.info("[OPCUA] Skill '" + _skill.skill.name + "' saved successfully.");
                  var percentage = (((i + 1) / _skills.length) * 90) + 10;
                  $('#LabelSkillBrowseProgressBar').text("Skill '" + _skill.skill.name + "' saved successfully.");
                  $('#SkillBrowseProgressBar').css('width', percentage+'%').attr('aria-valuenow', percentage);
                  $('#SkillBrowseProgressBar').text(percentage+'%');                  
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
