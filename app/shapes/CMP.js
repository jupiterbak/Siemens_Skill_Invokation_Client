// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var CMP = CircuitFigure.extend({

   NAME: "CMP",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:61,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.819672131147541, 22.5));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.819672131147541, 77.5));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input02");
     port.setMaxFanOut(20);
     // out
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 61;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L61,0 L61,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L58,0Q61,0 61, 3L61,37Q61,40 58, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'CMP');
       shape.attr({"x":9,"y":20,"text-anchor":"start","text":"CMP","font-family":"\"Arial\"","font-size":20,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       

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
CMP = CMP.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.on("change:userData.operator",(emitter, event)=>{
            this.operatorValue = event.value;
        });
        this.attr({resizeable:false});
        this.getOutputPort(0).attr({
            semanticGroup:"data"
        });
        this.getInputPort(0).attr({
            semanticGroup:"data"
        });
        this.getInputPort(1).attr({
            semanticGroup:"data"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        switch(this.operatorValue){
            default:
            case "greater (>)"          :   o1.setValue(i1.getValue() > i2.getValue());
            break;
            case "greater or equal (>=)":   o1.setValue(i1.getValue() >= i2.getValue());
            break;
            case "equal (=)"            :   o1.setValue(i1.getValue() == i2.getValue());
            break;
            case "smaller (<)"          :   o1.setValue(i1.getValue() < i2.getValue());
            break;
            case "smaller or equal (<=)":   o1.setValue(i1.getValue() <= i2.getValue());
            break;
            case "not equal (!=)"       :   o1.setValue(i1.getValue() != i2.getValue());
            break;
        }
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function(context)
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function(context)
    {
    },

    getParameterSettings: function()
    {
        return [
        {
            name:"operator",
            label:"Comparison operator",
            property:{
                type: "select",
                optional_values:[
                    {label: "greater (>)", value:"greater (>)"},
                    {label: "greater or equal (>=)", value:"greater or equal (>=)"},
                    {label: "equal (=)", value:"equal (=)"},                    
                    {label: "smaller (<)", value:"smaller (<)"},
                    {label: "smaller or equal (<=)", value:"smaller or equal (<=)"},
                    {label: "not equal (!=)", value:"not equal (!=)"}
                ]
            },
            default_value:'greater (>)'
        }];
    },
});