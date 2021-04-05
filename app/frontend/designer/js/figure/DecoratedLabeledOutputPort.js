
import LabeledMarkerFigure from "./LabeledMarkerFigure"

let locator = require("./PortDecorationCenterLocator");
let growPolicy = new draw2d.policy.port.IntrusivePortsFeedbackPolicy();
growPolicy.growFactor = 1.5;

export default draw2d.OutputPort.extend({

  NAME: "DecoratedLabeledOutputPort",

  init: function (attr, setter, getter) {
    this.hasChanged = false;

    this._super($.extend(attr, {coronaWidth: 2}), setter, getter);

    this.installEditPolicy(growPolicy);

    // var circle = new draw2d.shape.basic.Circle({radius:2, stroke:0, bgColor: "#909090"});
    // circle.hitTest = () => false;
    // this.add(circle, locator);

    // Add decoration
    this.decoration = new LabeledMarkerFigure();

    this.add(this.decoration, new draw2d.layout.locator.RightLocator({margin:-3}));

    // Add decoration event listeners
    this.on("disconnect",function(emitter, event){
      this.decoration.setVisible(this.getConnections().getSize()===0);
    }.bind(this));

    this.on("connect",function(emitter, event){
        this.decoration.setVisible(false);
    }.bind(this));

    this.on("dragend",function(emitter, event){
        this.decoration.setVisible(this.getConnections().getSize()===0);
    }.bind(this));

    this.on("drag",function(emitter, event){
        this.decoration.setVisible(false);
    }.bind(this));
  },

  setValue:function(value)
  {
      this.hasChanged = this.value !==value;
      this.decoration.setVisibleValue(value);
      this._super(value);
  },

  /**
   *
   * Set Canvas must be overridden because all "children" must be painted BEHIND the main figures.
   * This behaviour is different to the base implementation.
   *
   * If the port fades out - the little circle stays visible. This is the wanted effect.
   *
   * @param {draw2d.Canvas} canvas the new parent of the figure or null
   */
  setCanvas: function (canvas) {
    // remove the shape if we reset the canvas and the element
    // was already drawn
    if (canvas === null && this.shape !== null) {
      if (this.isSelected()) {
        this.unselect();
      }
      this.shape.remove();
      this.shape = null;
    }


    // child must be init BEFORE the main shape. Now the child is behind the main shape and
    // this is exact the behaviour we want.
    //
    this.children.each( (i, e) => {
      e.figure.setCanvas(canvas);
    });

    this.canvas = canvas;

    if (this.canvas !== null) {
      this.getShapeElement();
    }

    // reset the attribute cache. We must start by paint all attributes
    //
    this.lastAppliedAttributes = {};


    if (canvas === null) {
      this.stopTimer();
    } else {
      if (this.timerInterval >= this.MIN_TIMER_INTERVAL) {
        this.startTimer(this.timerInterval);
      }
    }
    return this;
  }

});


