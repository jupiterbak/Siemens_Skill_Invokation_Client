
import storage from "../io/BackendStorage"

export default class MTPLoadDialog {

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
    let self = this;
    Mousetrap.pause();
    

    $('#mtpFileSaveDialog').off('shown.bs.modal').on('shown.bs.modal', (event) => {
      $(event.currentTarget).find('input:first').focus();
    });

    $("#mtpFileSaveDialog").modal("show");

    $('#LabelFileUploadProgressBar').text("Select a file to upload.");
    $('#FileUploadProgressBar').css('width', 0+'%').attr('aria-valuenow', 0);

    // Button: Commit to GitHub
    //
    $("#mtpFileSaveDialog .okButton").off("click").on("click", () => {
      canvas.setCurrentSelection(null);
      if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        self.log.error('[Storage] The File APIs are not fully supported in this browser.');
        return;
      }

      // get File content
      
      var mtpFile = $('#mtpFileSaveDialogUploadBtn').prop('files');
      if (!mtpFile) {
        self.log.error('[Storage] The File APIs are not fully supported in this browser.');
        return;
      }
      else if (!mtpFile[0]) {
        self.log.error("[Storage] Please select a file before clicking 'Upload'");
        return;        
      }      

      var name = storage.sanitizeMTPFile(mtpFile[0].name);
      
      $('#LabelFileUploadProgressBar').text("Saving file ...");
      $('#FileUploadProgressBar').css('width', 1+'%').attr('aria-valuenow', 1);
      $('#FileUploadProgressBar').text(1+'%');
      
      // read the content of the file as string
      var reader = new FileReader();
      reader.readAsText(mtpFile[0]);
      reader.onloadend = function(){
          var xmlData = reader.result;
          var service_count = 1;
          var view_count = 1;
          $('#LabelFileUploadProgressBar').text("Saving file ...");
          $('#FileUploadProgressBar').css('width', 5+'%').attr('aria-valuenow', 5);
          $('#FileUploadProgressBar').text(5+'%');

          // setUp All socket Io messages
          socket.on("mtp:file:saved", function(msg) {
            $('#LabelFileUploadProgressBar').text("MTP-File saved.");
            $('#FileUploadProgressBar').css('width', 50+'%').attr('aria-valuenow', 50);
            $('#FileUploadProgressBar').text(50+'%');
          });

          socket.on("mtp:file:parsing", function(msg) {
            $('#LabelFileUploadProgressBar').text("Parsing MTP-File...");
            $('#FileUploadProgressBar').css('width', 55+'%').attr('aria-valuenow', 55);
            $('#FileUploadProgressBar').text(55+'%');
          });

          socket.on("mtp:saving:views", function(msg) {
            view_count = msg.count;
            console.log("View count", view_count);
            $('#LabelFileUploadProgressBar').text("Saving Views...");
            $('#FileUploadProgressBar').css('width', 75+'%').attr('aria-valuenow', 75);
            $('#FileUploadProgressBar').text(75+'%');
          });

          socket.on("mtp:saving:view", function(msg) {
            $('#LabelFileUploadProgressBar').text("Generating View_" + msg.index + " as .brain file");
            if(view_count !== 0){
              var v_percentage = ((msg.index / view_count) * 25) + 75;
              $('#FileUploadProgressBar').css('width', v_percentage+'%').attr('aria-valuenow', v_percentage);
              $('#FileUploadProgressBar').text(v_percentage+'%');
            }            
          });

          socket.on("mtp_services_count", function(msg) {
            service_count = msg.count;
            console.log("Service count", service_count);
          });
          
          socket.on("mtp:service:generating", function(msg) {
            $('#LabelFileUploadProgressBar').text("Generating service: " + msg.service + " ...");
            if(service_count !== 0){
              var percentage = (msg.index / service_count) * 100;
              console.log("mtp:service:generating percentage", percentage);
              $('#FileUploadProgressBar').css('width', percentage+'%').attr('aria-valuenow', percentage);
              $('#FileUploadProgressBar').text(percentage+'%');
            }            
          });

          socket.on("mtp:service:generated", function(msg) {
            $('#LabelFileUploadProgressBar').text("Service: " + msg.service + " generated.");
            if(service_count !== 0){
              var percentage = ((msg.index + 1) / service_count) * 100;
              console.log("mtp:service:generated percentage", percentage);
              $('#FileUploadProgressBar').css('width', percentage+'%').attr('aria-valuenow', percentage);
              $('#FileUploadProgressBar').text(percentage+'%');
            }            
          });

          socket.on("mtp:services:generated", function(msg) {
            $('#LabelFileUploadProgressBar').text("All services generated");
            $('#FileUploadProgressBar').css('width', 100+'%').attr('aria-valuenow', 100);
            $('#FileUploadProgressBar').text(100+'%');
            Mousetrap.unpause();
            $('#mtpFileSaveDialog').modal('hide');
            location.reload();   
          });

          storage.saveMTPFile(xmlData, name, 
            function(progress) {
              //console.log("TEST_PROGRESS: " + progress);
            }
          ).then(function () {
              self.log.info('[Storage] File ' + name + ' saved sucessfully.');
          });
      };
    });
  }
}
