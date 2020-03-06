import "google-code-prettify/bin/prettify.min.css"

import {prettyPrint} from "google-code-prettify/bin/prettify.min"

export default class CodeDialog {

  constructor() {
  }

  show(js) {
    $('#codePreviewDialog .prettyprint').text(js)
    $('#codePreviewDialog .prettyprint').removeClass("prettyprinted")
    prettyPrint()
    $('#codePreviewDialog').modal('show')
  }
}
