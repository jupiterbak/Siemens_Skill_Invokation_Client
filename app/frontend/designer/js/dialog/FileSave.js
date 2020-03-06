import conf from "./../Configuration"

export default class FileSave {

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
  show(storage, canvas) {

    new draw2d.io.png.Writer().marshal(canvas, imageDataUrl => {
      $("#fileSaveDialog .filePreview").attr("src", imageDataUrl)
      $("#fileSaveDialog .githubFileName").val(storage.currentFile?storage.currentFile:"NewDocument"+conf.fileSuffix)

      $('#fileSaveDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#fileSaveDialog").modal("show")
      Mousetrap.pause()

      // Button: Commit to GitHub
      //
      $("#fileSaveDialog .okButton").off('click').on("click", () => {
        Mousetrap.unpause()
        let writer = new draw2d.io.json.Writer()
        writer.marshal(canvas, json => {
          let newName = $("#fileSaveDialog .githubFileName").val()
          storage.saveFile(json, imageDataUrl, newName)
            .then(() => {
              storage.currentFile = newName
              $('#fileSaveDialog').modal('hide')
            });
        })
      })
    }, canvas.getBoundingBox().scale(20, 20))
  }
}
