import Remarkable from "remarkable"

export default class MarkdownDialog {

  constructor() {
    this.defaults = {
      html: true,         // Enable HTML tags in source
      xhtmlOut: false,        // Use '/' to close single tags (<br />)
      breaks: false,        // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',  // CSS language prefix for fenced blocks
      linkify: true,         // autoconvert URL-like texts to links
      linkTarget: '_blank',     // set target to open link in
      typographer: true          // Enable smartypants and other sweet transforms
    }
  }

  show(markdown) {
    let markdownParser = new Remarkable('full', this.defaults)
    $('#markdownDialog .html').html(markdownParser.render(markdown))
    $('#markdownDialog').modal('show')
  }
}
