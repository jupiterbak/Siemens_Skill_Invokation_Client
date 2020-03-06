export default class About {
  constructor() {
  }

  show() {

    this.splash = $(
      '<div id="splash">' +
      '<div>Draw2D Designer<br>' +
      '@VERSION@' +
      '</div>' +
      '</div>')
    this.splash.hide()
    $("body").append(this.splash)

    this.splash.fadeIn("fast")
  }

  hide() {
    this.splash.delay(2500)
      .fadeOut("slow", () => {
        this.splash.remove()
      })
  }
}
