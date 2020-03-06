
import View from "./View"
import Toolbar from "./Toolbar"
import Layer from "./Layer"
import FilterPane from "./FilterPane"
import Storage from "./io/BackendStorage"
import SelectionToolPolicy from './policy/SelectionToolPolicy'
import FileOpen from "./dialog/FileOpen"
import FileSave from "./dialog/FileSave"
import FileSaveAs from "./dialog/FileSaveAs"

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */

export default class Application {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {

    this.documentConfigurationTempl = {
      baseClass: "draw2d.SetFigure",
      code: $("#shape-edit-template").text().trim()
    }

    this.localStorage = []
    try {
      if ('localStorage' in window && window.localStorage !== null) {
        this.localStorage = localStorage
      }
    } catch (e) {

    }

    $( "body" )
      .delegate( ".mousetrap-pause", "focus", function() {
        Mousetrap.pause()
      })
      .delegate(".mousetrap-pause", "blur", function (){
        Mousetrap.unpause()
      });

    // automatic add the configuration to the very first shape
    // in the document as userData
    //
    this.documentConfiguration = $.extend({}, this.documentConfigurationTempl)

    this.storage = new Storage()
    this.view = new View(this, "canvas")
    this.toolbar = new Toolbar(this, ".toolbar", this.view)
    this.layer = new Layer(this, "layer_elements", this.view)
    this.filter = new FilterPane(this, "#filter .filter_actions", this.view)

    this.view.installEditPolicy(new SelectionToolPolicy())

    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    let file = this.getParam("file")
    if (file) {
      this._load(file)
    }
    else {
      this.fileNew()
    }

    // listen on the history object to load files
    //
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.id === 'editor') {
        // Render new content for the hompage
        this._load(event.state.file)
      }
    })
  }

  _load(file){
     this.storage.loadFile(file)
      .then((content) => {
        this.view.clear()
        this.view.centerDocument()
        let reader = new draw2d.io.json.Reader()
        reader.unmarshal(this.view, content)
        this.getConfiguration()
        this.storage.fileName = file
        this.view.getCommandStack().markSaveLocation()
        this.view.centerDocument()
        return content
      })
  }

  getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
    let regexS = "[\\?&]" + name + "=([^&#]*)"
    let regex = new RegExp(regexS)
    let results = regex.exec(window.location.href)
    // the param isn't part of the normal URL pattern...
    //
    if (results === null) {
      // maybe it is part in the hash.
      //
      regexS = "[\\#]" + name + "=([^&#]*)"
      regex = new RegExp(regexS)
      results = regex.exec(window.location.hash)
      if (results === null) {
        return null
      }
    }
    return results[1]
  }

  fileNew(shapeTemplate) {
    this.view.clear()
    this.storage.currentFile = null
    this.documentConfiguration = $.extend({}, this.documentConfigurationTempl)

    if (shapeTemplate) {
      new draw2d.io.json.Reader().unmarshal(this.view, shapeTemplate)
      this.view.getCommandStack().markSaveLocation()
      this.view.centerDocument()
    }
  }

  fileOpen() {
    new FileOpen().show(this.storage, this.view)
  }

  fileSave() {
    this.setConfiguration()
    if (this.storage.currentFile === null) {
      new FileSaveAs().show(this.storage,this.view)
    }
    else {
      new FileSave().show(this.storage,this.view)
    }
  }


  getConfiguration(key) {
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      this.documentConfiguration = $.extend({}, this.documentConfiguration, figures.first().getUserData())
    }

    if (key) {
      return this.documentConfiguration[key]
    }
    return this.documentConfiguration
  }

  setConfiguration(conf) {
    this.documentConfiguration = $.extend({}, this.documentConfiguration, conf)
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      figures.first().setUserData(this.documentConfiguration)
    }
  }
}
