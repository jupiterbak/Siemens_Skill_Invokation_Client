import conf from '../Configuration'

let sanitize = require("sanitize-filename")


class BackendStorage {

  /**
   * @constructor
   *
   */
  constructor() {
    this.fileName = ""
    Object.preventExtensions(this)
  }

  get currentDir() {
    return this.dirname(this.dirname())
  }

  get currentFile() {
    return this.basename(this.fileName)
  }

  set currentFile(name) {
    this.fileName = name
    history.pushState({
      id: 'editor',
      file: name
    }, 'Brainbox Simulator | ' + name, window.location.href.split('?')[0] + '?file=' + name)
  }

  getFiles(path) {
    return $.ajax({
      url: conf.backend.file.list(path),
      xhrFields: {
        withCredentials: true
      }
    }).then((response) => {
      // happens in "serverless" mode on the gh-pages/docs installation
      //
      if (typeof response === "string")
        response = JSON.parse(response)

      let files = response.files
      // sort the result
      // Directories are always on top
      //
      files.sort(function (a, b) {
        if (a.type === b.type) {
          if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1
          if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1
          return 0
        }
        if (a.type === "dir") {
          return -1
        }
        return 1
      })
      return files
    })
  }

  saveFile(json, imageDataUrl, fileName) {
    return $.ajax({
        url: conf.backend.file.save,
        method: "POST",
        xhrFields: {
          withCredentials: true
        },
        data: {
          filePath: fileName,
          content: JSON.stringify({draw2d: json, image: imageDataUrl}, undefined, 2)
        }
      }
    )
  }

  /**
   * Load the file content of the given path
   *
   * @param fileName
   * @returns {*}
   */
  loadFile(fileName) {
    return $.ajax({
      url: conf.backend.file.get(fileName),
      xhrFields: {
        withCredentials: true
      }
    })
      .then((content) => {
        // happens in the serverless mode
        if(typeof content === "string")
          content = JSON.parse(content)

        if (content.draw2d)
          return content.draw2d
        
        return content
      })
  }

  deleteFile(fileName) {
    return $.ajax({
        url: conf.backend.file.del,
        method: "POST",
        xhrFields: {
          withCredentials: true
        },
        data: {
          filePath: fileName
        }
      }
    )
  }

  dirname(path) {
    if (path === undefined || path === null || path.length === 0)
      return null

    let segments = path.split("/")
    if (segments.length <= 1)
      return null

    segments = segments.filter(n => n !== "")
    path = segments.slice(0, -1).join("/")
    return (path === "") ? null : path + "/"

  }

  sanitize(file) {
    file = sanitize(file, "_")
    file = file.replace(conf.fileSuffix, "")
    // I don't like dots in the name to
    file = file.replace(RegExp("[.]", "g"), "_")
    file = file + conf.fileSuffix
    return file
  }

  basename(path) {
    if (path === null || path === "" || path === undefined) {
      return null
    }
    return path.split(/[\\/]/).pop()
  }
}

let storage = new BackendStorage()
export default storage
