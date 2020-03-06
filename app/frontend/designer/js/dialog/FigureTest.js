import FigureWriter from "./../io/FigureWriter"

export default class FigureTest {

  constructor() {
  }

  show() {
    var _this = this
    this.animationFrameFunc = this._calculate.bind(this)

    var writer = new FigureWriter()
    var testShape = null
    writer.marshal(shape_designer.app.view, "testShape", function (js) {
      try {
        js = $("#decoratedport-template").text().trim() + js
        testShape = eval(js)
      }
      catch (exc) {
        alert("Error in shape code. \nRemove error and try it again:\n\n>>    " + exc)
        throw exc
      }
      var splash = $(
        '<div class="overlay-scale">' +
        '<div id="test_canvas">' +
        '</div>' +
        ' <div               id="test_info" >Test page for your designed and coded draw2d shape.</div>' +
        ' <img title="Close" id="test_close" class="icon" src="./images/dialog_close.svg"/>' +
        '<div>')

      // fadeTo MUSS leider sein. Man kann mit raphael keine paper.text elemente einfügen
      // wenn das canvas nicht sichtbar ist. In diesen Fall mach ich das Canvas "leicht" sichtbar und raphael ist
      // zufrieden.
      $("body").append(splash)

      var canvas = new draw2d.Canvas("test_canvas")
      _this.canvas = canvas
      canvas.installEditPolicy(new draw2d.policy.canvas.ShowDotEditPolicy(20, 1, "#FF4981"))
      var router = new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
      canvas.installEditPolicy(new draw2d.policy.connection.ComposedConnectionCreatePolicy(
        [
          // create a connection via Drag&Drop of ports
          //
          new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function () {
              return new draw2d.Connection({
                radius: 3,
                stroke: 2,
                color: "#129CE4",
                outlineStroke: 1,
                outlineColor: "#ffffff",
                router: router
              })
            }
          }),
          // or via click and point
          //
          new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
            createConnection: function () {
              return new draw2d.Connection({
                radius: 3,
                stroke: 2,
                color: "#129CE4",
                outlineStroke: 1,
                outlineColor: "#ffffff",
                router: router
              })
            }
          })
        ])
      )
      var test = new testShape()
      canvas.add(test, 400, 160)

      // create and add two nodes which contains Ports (In and OUT)
      //
      var start = new draw2d.shape.node.Start()
      var toggle1 = new shape_designer.figure.TestSwitch()
      var toggle2 = new shape_designer.figure.TestSwitch()
      var end = new draw2d.shape.node.End()

      // ...add it to the canvas
      canvas.add(toggle1, 50, 150)
      canvas.add(toggle2, 50, 200)
      canvas.add(start, 50, 250)
      canvas.add(end, 630, 250)

      canvas.setCurrentSelection(test)
      var removeDialog = function () {
        _this.simulate = false
        splash.removeClass("open")
        setTimeout(function () {
          splash.remove()
        }, 400)
      }

      $("#test_close").on("click", removeDialog)
      splash.addClass("open")

      _this.simulate = true
      requestAnimationFrame(_this.animationFrameFunc)
    })

  }

  _calculate() {
    // call the "calculate" method if given to calculate the output-port values
    //
    var figures = this.canvas.getFigures().clone().grep(function (f) {
      return f.calculate
    })
    figures.each(function (i, figure) {
      figure.calculate()
    })

    // transport the value from oututPort to inputPort
    //
    this.canvas.getLines().each(function (i, line) {
      var outPort = line.getSource()
      var inPort = line.getTarget()
      inPort.setValue(outPort.getValue())
      line.setColor(outPort.getValue() ? "#ff5252" : "#0000ff")
    })

    if (this.simulate === true) {
      requestAnimationFrame(this.animationFrameFunc)
    }
  }
}
