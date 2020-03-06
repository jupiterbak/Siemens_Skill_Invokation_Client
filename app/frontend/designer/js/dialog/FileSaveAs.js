import conf from "./../Configuration"
import Hogan from "hogan.js"

export default class FileSaveAs {

  /**
   * @constructor
   *
   */
  constructor() {
  }

  /**
   * @method
   *
   * Open the file picker and load the selected file.
   *
   * @since 4.0.0
   */
  show(storage, canvas) {
    if (storage.currentFile === null) {
      storage.currentFile = "DocumentName" + conf.fileSuffix
    }

    new draw2d.io.png.Writer().marshal(canvas, (imageDataUrl) => {
      // else reopen the already selected directory
      $("#githubFileSaveAsDialog .okButton").prop("disabled", false)
      this.fetchPathContent(storage, storage.currentDir)

      $("#githubFileSaveAsDialog .filePreview").attr("src", imageDataUrl)
      $("#githubFileSaveAsDialog .githubFileName").val(storage.currentFile)

      $('#githubFileSaveAsDialog').off('shown.bs.modal').on('shown.bs.modal', (event) =>{
        $(event.currentTarget).find('input:first').focus()
      })
      $("#githubFileSaveAsDialog").modal("show")
      Mousetrap.pause()

      // Button: Commit to GitHub
      //
      $("#githubFileSaveAsDialog .okButton").off('click').on("click",  () => {
        Mousetrap.unpause()
        let writer = new draw2d.io.json.Writer()
        writer.marshal(canvas, (json) => {
          var title = $("#githubFileSaveAsDialog .githubFileName").val()
          storage.saveFile(json, imageDataUrl, title)
          .then( () => {
            storage.currentFile = name
            $('#githubFileSaveAsDialog').modal('hide')
          })
        })
      })
    }, canvas.getBoundingBox().scale(20, 20))
  }

  fetchPathContent(storage, newPath) {
    storage.getFiles(newPath).then( (files) => {
        storage.currentFile = newPath
        let compiled = Hogan.compile(
          '         <a href="#" class="list-group-item githubPath" data-type="{{parentType}}" data-path="{{parentPath}}" >' +
          '             <span class="glyphicon glyphicon-menu-left"></span>' +
          '             ..' +
          '         </a>' +
          '         {{#files}}' +
          '           <a href="#" data-draw2d="{{draw2d}}" class="list-group-item githubPath text-nowrap" data-type="{{type}}" data-path="{{currentDir}}{{name}}" data-title="{{name}}" data-id="{{id}}" data-sha="{{sha}}">' +
          '              <span class="glyphicon {{icon}}"></span>' +
          '              {{{name}}}' +
          '           </a>' +
          '         {{/files}}'
        )


        let parentPath = storage.dirname(newPath)
        let output = compiled.render({
          parentPath: parentPath,
          currentDir: storage.currentDir,
          files: files,
          draw2d: function () {
            return this.name.endsWith(conf.fileSuffix)
          },
          icon: function () {
            if (this.name.endsWith(conf.fileSuffix)) {
              return "fa fa-object-group"
            }
            return this.type === "dir" ? "fa fa-folder-o" : "fa fa-file-o"
          }
        })
        $("#githubFileSaveAsDialog .list-group").html($(output))
        $("#githubFileSaveAsDialog .list-group").scrollTop(0)

        //we are in a folder. Create of a file is possible now
        //
        $("#githubFileSaveAsDialog .okButton").prop("disabled", false)


        $(".githubPath[data-type='dir']").on("click",  (event) =>{
          this.fetchPathContent(storage, $(event.currentTarget).data("path"))
        })

        $('.githubPath*[data-draw2d="true"][data-type="file"]').on("click",  (event) => {
          let path = $(event.currentTarget).data("path")
          let title = path.split(/[\\/]/).pop() // basename
          $("#githubFileSaveAsDialog .githubFileName").val(title)
        })
      })
  }
}
