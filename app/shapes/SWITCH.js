// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var SWITCH = CircuitFigure.extend({

   NAME: "SWITCH",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:95,height:224},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.5263157894736842, 15.628487723214286));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-0.5263157894736842, 30.088588169642858));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input02");
     port.setMaxFanOut(20);
     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 15.628487723214286));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out1");
     port.setMaxFanOut(20);
     // out2
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 30.088588169642858));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out2");
     port.setMaxFanOut(20);
     // out3
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 44.59751674107143));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out3");
     port.setMaxFanOut(20);
     // out4
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 58.65304129464286));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out4");
     port.setMaxFanOut(20);
     // out5
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 72.93875558035715));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out5");
     port.setMaxFanOut(20);
     // out6
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.76973684210526, 87.22446986607143));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out6");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 95;
      this.originalHeight= 224;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L95,0 L95,224 L0,224");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L92,0Q95,0 95, 3L95,221Q95,224 92, 224L3,224Q0,224 0, 221L0,3');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'SWITCH');
       shape.attr({"x":10.03125,"y":14.5,"text-anchor":"start","text":"SWITCH","font-family":"\"Arial\"","font-size":19,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Ctrl');
       shape.attr({"x":6,"y":35.9921875,"text-anchor":"start","text":"Ctrl","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Case 1');
       shape.attr({"x":49.28125,"y":35.9921875,"text-anchor":"start","text":"Case 1","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Case 2');
       shape.attr({"x":49.328125,"y":68.3828125,"text-anchor":"start","text":"Case 2","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Value');
       shape.attr({"x":6,"y":68.3828125,"text-anchor":"start","text":"Value","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Case 3');
       shape.attr({"x":49.1171875,"y":99.8984375,"text-anchor":"start","text":"Case 3","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Case 4');
       shape.attr({"x":49.1171875,"y":132.3828125,"text-anchor":"start","text":"Case 4","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Case 5');
       shape.attr({"x":49.1171875,"y":164.3828125,"text-anchor":"start","text":"Case 5","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Default');
       shape.attr({"x":49.1171875,"y":196.3828125,"text-anchor":"start","text":"Default","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
SWITCH = SWITCH.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.on("change:userData.case1",(emitter, event)=>{
            this.case1Val = event.value;
        });
        this.on("change:userData.case2",(emitter, event)=>{
            this.case2Val = event.value;
        });
        this.on("change:userData.case3",(emitter, event)=>{
            this.case3Val = event.value;
        });
        this.on("change:userData.case4",(emitter, event)=>{
            this.case4Val = event.value;
        });
        this.on("change:userData.case5",(emitter, event)=>{
            this.case5Val = event.value;
        });
        this.on("change:userData.default",(emitter, event)=>{
            if(event.value == 0) 
            this.defaultVal = false;
            if(event.value == 1)
            this.defaultVal = true;
         });
        this.attr({resizeable:false});
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(1).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(2).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(3).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(4).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(5).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(0).attr({
            semanticGroup:"signal"
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
        var o2 = this.getOutputPort(1);
        var o3 = this.getOutputPort(2);
        var o4 = this.getOutputPort(3);
        var o5 = this.getOutputPort(4);
        var o6 = this.getOutputPort(5);
        o1.setValue(i1.getValue() && (i2.getValue() == this.case1Val));
        o2.setValue(i1.getValue() && (i2.getValue() == this.case2Val));
        o3.setValue(i1.getValue() && (i2.getValue() == this.case3Val));
        o4.setValue(i1.getValue() && (i2.getValue() == this.case4Val));
        o5.setValue(i1.getValue() && (i2.getValue() == this.case5Val));
        o6.setValue(i1.getValue() && this.defaultVal && !o1.getValue() && !o2.getValue() 
        && !o3.getValue() && !o4.getValue() && !o5.getValue());
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

    getParameterSettings:function()
    {
        return [
        {
            name:"case1",
            label:"Case 1 Value",
            property:{
                type: "String",
            }
        },
        {
            name:"case2",
            label:"Case 2 Value",
            property:{
                type: "String",
            }
        },
        {
            name:"case3",
            label:"Case 3 Value",
            property:{
                type: "String",
            }
        },
        {
            name:"case4",
            label:"Case 4 Value",
            property:{
                type: "String",
            }
        },
        {
            name:"case5",
            label:"Case 5 Value",
            property:{
                type: "String",
            }
        },
        {
            name:"default",
            label:"Default Value",
            property:{
                type: "select",
                optional_values:[
                    {label: "HIGH", value:1},
                    {label: "LOW", value:0}
                ]
            },
            default_value:0
        }];
    }
});