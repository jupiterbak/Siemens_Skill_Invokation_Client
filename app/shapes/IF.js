// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var IF = CircuitFigure.extend({

  NAME: "IF",

  init: function (attr, setter, getter) {
    var _this = this;

    this._super($.extend({
      stroke: 0,
      bgColor: null,
      width: 82,
      height: 81
    }, attr), setter, getter);
    var port;
    // input01
    port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.6097560975609756, 43.96219135802469));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#1C9BAB");
    port.setName("input01");
    port.setMaxFanOut(20);
    // input02
    port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.6097560975609756, 83.9506172839506));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#1C9BAB");
    port.setName("input02");
    port.setMaxFanOut(20);
    // out1
    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.73323170731707, 43.95254629629629));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#1C9BAB");
    port.setName("out1");
    port.setMaxFanOut(20);
    // out2
    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.73323170731707, 83.9506172839506));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#1C9BAB");
    port.setName("out2");
    port.setMaxFanOut(20);
  },

  createShapeElement: function () {
    var shape = this._super();
    this.originalWidth = 82;
    this.originalHeight = 81;
    return shape;
  },

  createSet: function () {
    this.canvas.paper.setStart();
    var shape = null;
    // BoundingBox
    shape = this.canvas.paper.path("M0,0 L82,0 L82,81 L0,81");
    shape.attr({
      "stroke": "none",
      "stroke-width": 0,
      "fill": "none"
    });
    shape.data("name", "BoundingBox");

    // Rectangle
    shape = this.canvas.paper.path('M0,6Q0,3 3, 3L79,3Q82,3 82, 6L82,78Q82,81 79, 81L3,81Q0,81 0, 78L0,6');
    shape.attr({
      "stroke": "#303030",
      "stroke-width": 1,
      "fill": "#FFFFFF",
      "dasharray": null,
      "opacity": 1
    });
    shape.data("name", "Rectangle");

    // Label
    shape = this.canvas.paper.text(0, 0, 'IF');
    shape.attr({
      "x": 32.5546875,
      "y": 14.5,
      "text-anchor": "start",
      "text": "IF",
      "font-family": "\"Arial\"",
      "font-size": 19,
      "stroke": "none",
      "fill": "#080808",
      "stroke-scale": true,
      "font-weight": "normal",
      "stroke-width": 0,
      "opacity": 1
    });
    shape.data("name", "Label");

    // Label
    shape = this.canvas.paper.text(0, 0, 'Ctrl');
    shape.attr({
      "x": 6.5,
      "y": 35,
      "text-anchor": "start",
      "text": "Ctrl",
      "font-family": "\"Arial\"",
      "font-size": 12,
      "stroke": "none",
      "fill": "#080808",
      "stroke-scale": true,
      "font-weight": "normal",
      "stroke-width": 0,
      "opacity": 1
    });
    shape.data("name", "Label");

    // Label
    shape = this.canvas.paper.text(0, 0, 'True');
    shape.attr({
      "x": 48.28125,
      "y": 34.59375,
      "text-anchor": "start",
      "text": "True",
      "font-family": "\"Arial\"",
      "font-size": 12,
      "stroke": "none",
      "fill": "#080808",
      "stroke-scale": true,
      "font-weight": "normal",
      "stroke-width": 0,
      "opacity": 1
    });
    shape.data("name", "Label");

    // Label
    shape = this.canvas.paper.text(0, 0, 'False');
    shape.attr({
      "x": 44.328125,
      "y": 66.984375,
      "text-anchor": "start",
      "text": "False",
      "font-family": "\"Arial\"",
      "font-size": 12,
      "stroke": "none",
      "fill": "#080808",
      "stroke-scale": true,
      "font-weight": "normal",
      "stroke-width": 0,
      "opacity": 1
    });
    shape.data("name", "Label");

    // Label
    shape = this.canvas.paper.text(0, 0, 'Cond');
    shape.attr({
      "x": 6,
      "y": 66.984375,
      "text-anchor": "start",
      "text": "Cond",
      "font-family": "\"Arial\"",
      "font-size": 12,
      "stroke": "none",
      "fill": "#080808",
      "stroke-scale": true,
      "font-weight": "normal",
      "stroke-width": 0,
      "opacity": 1
    });
    shape.data("name", "Label");


    return this.canvas.paper.setFinish();
  }
});

/**
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custome code and event handler here.
 *
 *
 */
IF = IF.extend({

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter);

    this.attr({
      resizeable: false
    });
    this.getOutputPort(0).attr({
      semanticGroup: "signal"
    });
    this.getOutputPort(1).attr({
      semanticGroup: "signal"
    });
    this.getInputPort(0).attr({
      semanticGroup: "signal"
    });
    this.getInputPort(1).attr({
      semanticGroup: "data"
    });
    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

  },

  calculate: function () {
    var i1 = this.getInputPort(0);
    var i2 = this.getInputPort(1);
    var o1 = this.getOutputPort(0);
    var o2 = this.getOutputPort(1);

    o1.setValue(i1.getValue() && i2.getValue());
    o2.setValue(i1.getValue() && !(i2.getValue()));
  }
});
