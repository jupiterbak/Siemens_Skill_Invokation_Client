import conf from "./Configuration"
import FileNew from "./dialog/FileNew"
import Hogan from "hogan.js"
import storage from "./io/BackendStorage"

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */

export default class Files {

  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
    this.render()
  }

  render() {
    storage.getFiles("").then((files) => {
      files = files.map(file => {
        return {
          ...file,
          title: file.name.replace(conf.fileSuffix, ""),
          path: conf.backend.file.image()
        }
      })

      let compiled = Hogan.compile($("#filesTemplate").html())
      let output = compiled.render({
        files: files
      })

      $("#files .container > .row").html($(output))

      $("#files .container .deleteIcon").on("click", (event) => {
        let $el = $(event.currentTarget)
        let name = $el.data("name")
        storage.deleteFile(name).then(() => {
          let parent = $el.closest(".list-group-item")
          parent.hide('slow', () => parent.remove())
        })
      })

      $("[data-toggle='confirmation']").popConfirm({
        title: "Delete File?",
        content: "",
        placement: "bottom" // (top, right, bottom, left)
      })


      $("#files .list-group-item h4").on("click", (event) => {
        Mousetrap.pause()
        let $el = $(event.currentTarget)
        let name = $el.closest(".list-group-item").data("name")
        let $replaceWith = $('<input type="input" class="filenameInplaceEdit" value="' + name.replace(conf.fileSuffix, "") + '" />')
        $el.hide()
        $el.after($replaceWith)
        $replaceWith.focus()

        let fire = () => {
          Mousetrap.unpause()
          let newName = $replaceWith.val()
          if (newName !== "") {
            // get the value and post them here
            newName = storage.sanitize(newName)
            $.ajax({
                url: conf.backend.file.rename,
                method: "POST",
                xhrFields: {withCredentials: true},
                data: {
                  from: name,
                  to: newName
                }
              }
            ).then(() => {
              $replaceWith.remove()
              $el.html(newName.replace(conf.fileSuffix, ""))
              $el.show()
              $el.parent().parent().find("[data-name='" + name + "']").data("name", newName)
            })
          }
          else {
            // get the value and post them here
            $replaceWith.remove()
            $el.show()
          }
        }
        $replaceWith.blur(fire)
        $replaceWith.keypress((e) => {
          if (e.which === 13) {
            fire()
          }
        })
      })

      $("#files .list-group-item .thumbnail").on("click", (event) => {
        let $el = $(event.currentTarget)
        let parent = $el.closest(".list-group-item")
        let name = parent.data("name")
        parent.addClass("spinner")
        storage.loadFile(name)
          .then((content) => {
            $("#leftTabStrip .editor").click()
            storage.currentFile = name
            app.view.clear()
            new draw2d.io.json.Reader().unmarshal(app.view, content)
            app.view.getCommandStack().markSaveLocation()
            app.view.centerDocument()
            parent.removeClass("spinner")
          })
      })

      $("#files .thumbAdd").on("click", () => {
        new FileNew().show()
      })

      socket.on("brain:generated", msg => {
        let preview = $("a[data-name='" + msg.filePath + "'] img")
        if (preview.length === 0) {
          this.render()
        }
        else {
          $("a[data-name='" + msg.filePath + "'] img").attr({src: conf.backend.file.image()  + msg.filePath + "&timestamp=" + new Date().getTime()})
        }
      })
    })
  }
}
