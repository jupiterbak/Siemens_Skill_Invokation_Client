// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var AND = CircuitFigure.extend({

   NAME: "AND",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-1.6666666666666667, 22.5));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-1.6666666666666667, 77.5));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input02");
     port.setMaxFanOut(20);
     // out
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(104.42708333333334, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("out");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30,0 L30,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'&');
       shape.attr({"x":9,"y":20,"text-anchor":"start","text":"&","font-family":"\"Arial\"","font-size":20,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
AND = AND.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(1).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getValue() && i2.getValue());
    }
});


var Documentation_Text = draw2d.shape.basic.Text.extend({

    NAME: "Documentation_Text",
    VERSION: "1.0.0",

    init: function () {
        this._super({bold: false, fontFamily: "Verdana", fontSize: 10, bgColor: "#fafafa"});


        this.on("change:userData.text", (figure, event) => {
            this.setText(event.value);
        });

        this.attr("userData.text", "A simple text description");
    },

    calculate: function( context )
    {
    },

    onStart: function(context)
    {
    },

    onStop:function(context)
    {
    },

    getParameterSettings: function () {
        return [
            {
                name: "text",
                label: "Text",
                property: {
                    type: "longtext"
                }

            }];
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
        return {
          raspi: false,
          arduino: false
        };
      }
});




// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var End = CircuitFigure.extend({

   NAME: "End",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:50,height:50},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(0, 54));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 50;
      this.originalHeight= 50;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L50,0 L50,50 L0,50");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Circle_Innen
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":25,"ry":25,"cx":25,"cy":25,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Circle_Innen");
       
       // Circle_Out
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":20,"ry":20,"cx":25,"cy":25,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Circle_Out");
       

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
End = End.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         this.attr({resizeable:false});
         this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate: function()
    {
        if(this.getInputPort(0).getValue()){
            this.layerAttr("Circle_Out",{fill:"#faa50a"});
        }
        else{
            this.layerAttr("Circle_Out",{fill:"#f0f0f0"});
        }
        this.layerAttr("Circle_Innen",{fill:"#f0f0f0"});
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var MUX = CircuitFigure.extend({

   NAME: "MUX",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:50},attr), setter, getter);
     var port;
     // output_2
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(102.52031250000073, 19.780000000000655));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("output_2");
     port.setMaxFanOut(20);
     // output_1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(102.52031250000073, 82.87137500000063));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("output_1");
     port.setMaxFanOut(20);
     // input_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-6.207600000000184, 50));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input_1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 40;
      this.originalHeight= 50;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L40,0 L40,50 L0,50");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,1Q0,0 1, 0L39,0Q40,0 40, 1L40,49Q40,50 39, 50L1,50Q0,50 0, 49L0,1');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'MUX');
       shape.attr({"x":7.516959999999926,"y":24.756000000000313,"text-anchor":"start","text":"MUX","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
MUX = MUX.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(1).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var o2 = this.getOutputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getValue());
        o2.setValue(i1.getValue());
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var OR = CircuitFigure.extend({

   NAME: "OR",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:31,height:40},attr), setter, getter);
     var port;
     // input01
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-3.225806451612903, 22.5));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input01");
     port.setMaxFanOut(20);
     // input02
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-3.225806451612903, 78.75));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input02");
     port.setMaxFanOut(20);
     // output
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(116.12903225806451, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 31;
      this.originalHeight= 40;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L31,0 L31,40 L0,40");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0,3Q0,0 3, 0L27,0Q30,0 30, 3L30,37Q30,40 27, 40L3,40Q0,40 0, 37L0,3');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'>1');
       shape.attr({"x":4,"y":20,"text-anchor":"start","text":">1","font-family":"\"Arial\"","font-size":20,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
OR = OR.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(1).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        o1.setValue(i1.getValue() || i2.getValue());
    }
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//

var Signals_DataSource = CircuitFigure.extend({

    NAME: "Signals_DataSource",
    VERSION: "1.0.168_309",
 
    init:function(attr, setter, getter)
    {
      var _this = this;
 
      this._super( $.extend({stroke:0, bgColor:null, width:65.72720000000481,height:22},attr), setter, getter);
      var port;
      // Port
      port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 98.47855986562651, y: 46.56272727272815 }));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port");
      port.setMaxFanOut(20);
    },
 
    createShapeElement : function()
    {
       var shape = this._super();
       this.originalWidth = 65.72720000000481;
       this.originalHeight= 22;
       return shape;
    },
 
    createSet: function()
    {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L65.72720000000481,0 L65.72720000000481,22 L0,22");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // outline
        shape = this.canvas.paper.path('M0 0L53.81817921990478 0L65.72720000000481 10L53.81817921990478 20L0.24380000000201107 20.243800000000192Z');
        shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
        shape.data("name","outline");
        
        // label
        shape = this.canvas.paper.text(0,0,'Data_ID');
        shape.attr({"x":4.773050000005242,"y":11,"text-anchor":"start","text":"Data_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","label");
        
 
        return this.canvas.paper.setFinish();
    }
 });

 /**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */

Signals_DataSource = Signals_DataSource.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this._valueParserInst = new ValueParserValidator();

        this.attr({resizeable:false});
        this.getOutputPort(0).attr({
            semanticGroup:"data"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        var _this = this;
             
        // calculate the outer frame/shape in the correct size in relation to the length of the text
        //
        _this.adjustWidth = function(){
            var width = _this.layerGet("label").getBBox().width+15;

            _this.setWidth(width+5);
            _this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`});
            _this.layerAttr("outline",     { path: `M0 0 L${width-13} 0 L${width} 10 L${width-13} 20 L0 20 Z`});
        };
        this.on("change:userData.dataId",function(emitter, event){
            _this.layerAttr("label", {text: event.value});
            if(_this.constSignalValue){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " + event.value + ": " + _this.constSignalValue});
            }
            _this.adjustWidth();
        });

        this.on("change:userData.dataValue",function(emitter, event){
            _this.constSignalValue = event.value;
            var dataId = _this.attr("userData.dataId");
            if(!dataId){
                dataId = "Data_Id";
                _this.attr("userData.dataId", dataId);
            }
            _this.layerAttr("label", {text: dataId});            
            if(_this.constSignalValue){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " + dataId + ": " + _this.constSignalValue});
            }
            _this.adjustWidth();
        });

        this.on("added", function(){
            var dataId = _this.attr("userData.dataId");
            if(!dataId){
                dataId = "Data_Id";
                _this.attr("userData.dataId", dataId);
            }
            _this.layerAttr("label", {text: dataId});
            var dataValue = _this.attr("userData.dataValue");
            if(dataValue){
                _this.constSignalValue = dataValue;
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " +dataId + ": " + _this.constSignalValue});
            }
            _this.adjustWidth();
        });

        // override the "getValue" method of the port and delegate them to the related party (SourceTarget port)
        this.originalGetValue = this.getOutputPort(0).getValue;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var _this = this;
        var dataId = this.attr("userData.dataId");
        this.getOutputPort(0).getValue = function(){
            if(_this.constSignalValue){
                return _this.constSignalValue;
            }else{
                if(context.signalPorts && context.signalPorts[dataId]){
                    if(context.signalPorts[dataId] instanceof draw2d.Port){
                        return context.signalPorts[dataId].getValue();
                    }
                    else {
                        return 0;
                    }
                }else {
                    return 0;
                }              
            }                
        };

        // first check if any object already create the signal context
        if(!context.signalPorts){
            context.signalPorts = { };
        }
        
        // check if my signal port is set 
        if(_this.constSignalValue){
            if(!(dataId in context.signalPorts)){
                context.signalPorts[dataId] = _this.getOutputPort(0);
            }
        }

        var _val = _this.getOutputPort(0).getValue();
        if(_val){
            if(_this.constSignalValue){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " +dataId + ": " + _val});
                _this.adjustWidth();
            }else{
                // Update the label with the value
                _this.layerAttr("label", {text: dataId + ": " + _val});
                _this.adjustWidth();
            }
            
        }else{
            // Update the label with the value
            _this.layerAttr("label", {text: dataId});
            _this.adjustWidth();
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
            name:"dataId",
            label:"Data Id",
            property:{
                type: "string"
            }
        },
        {
            name:"dataType",
            label:"Data Type (OPC UA)",
            property:{
                type: "select",
                optional_values:[
                    {label: "Boolean", value:"Boolean"},
                    {label: "Byte", value:"Byte"},
                    {label: "SByte", value:"SByte"},                    
                    {label: "Int16", value:"Int16"},
                    {label: "Int32", value:"Int32"},
                    {label: "UInt16", value:"UInt16"},
                    {label: "UInt32", value:"UInt32"},
                    {label: "Float (e.g 1.023)", value:"Float"},
                    {label: "Double (e.g 1.023)", value:"Double"},
                    {label: "String", value:"String"},
                    {label: "localizedText", value:"localizedText"},                    
                    {label: "Timestamp", value:"Timestamp"},
                    {label: "Date (e.g. '01 Jan 1970')", value:"Date"}
                ]
            },
            default_value:'String'
        },
        {
            name:"dataIsArray",
            label:"Is Array? (1-Dim) e.g [x,...,x]",
            property:{
                type: "checkbox",
                optional_values:[
                    true,
                    false
                ],
                value:false
            },
            default_value:false
        },
        {
            name:"dataValue",
            label:"(Optional) Data Value",
            property:{
                type: "String"
            }
        }];
    },
    
    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      };
    },
    
    /**
     * @private
     */
    applyTransformation: function () {
        let s =
        // override the base implementation and do not scale the internal SVG elements....this let the arrow looks a like streche...we
        // calculate the path in the event handler. A lot more code....but the result is much cleaner
        //"S" + this.scaleX + "," + this.scaleY + ",0,0 " +
        "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
        "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
        ""
        this.svgNodes.transform(s)
        if (this.rotationAngle === 90 || this.rotationAngle === 270) {
        let before = this.svgNodes.getBBox(true)
        let ratio = before.height / before.width
        let reverseRatio = before.width / before.height
        let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
        this.svgNodes.transform(rs)
        }

        return this
    },

    validateInputs: function(){
        var self = this;
        // Read the content of the input fields
        // Value
        var el_value = $("#figure_property_dataValue")[0];
        var _value = el_value?el_value.value:"";
        // Datatype
        var el_dataType = $("#figure_property_dataType")[0];
        var _dataType = el_dataType?el_dataType.value:"String";
        // IsArray
        var el_isArray = $("#figure_property_dataIsArray")[0];
        var _isArray = el_isArray?el_isArray.checked===true:false;
    
        // Check value considering the Datatype and the value rank
        var parsed_value = self.checkOPCUAValue(_dataType, _value, _isArray);
        
        // Return true if value is ok oder generate the error message
        if( parsed_value.error){
            return {error: parsed_value.error};
        }else{
            // Change the value with the parsed value
            el_value.value = JSON.stringify(parsed_value.value.value);
            return true;
        }
        
    },
    
    checkOPCUAValue: function(dataType, dataValue, isArray){
        var self = this;
        // Return true or false if datavalue is of datatype
        var _value = null;
        try {
          _value = self._valueParserInst.parse(dataType,dataValue,isArray);
        }catch (e) {
            if (typeof e === "string") {
                return {error: e, value: null};
            }
            else if (typeof e === "object")
            {
                if (e instanceof SyntaxError) {
                    return {error: "Value is not valid.", value: null};
                }
                else{
                    return {error: "Error occured while parsing the value.", value: null};
                }
            }            
        }
        return {error: null, value: _value};
    }
});




// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var Signals_DataTarget = CircuitFigure.extend({

    NAME: "Signals_DataTarget",
    VERSION: "1.0.168_309",
 
    init:function(attr, setter, getter)
    {
      var _this = this;
 
      this._super( $.extend({stroke:0, bgColor:null, width:69.55780000000595,height:22},attr), setter, getter);
      var port;
      // Port
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -1.8643487861801238, y: 48.86363636363637 }));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port");
      port.setMaxFanOut(20);
    },
 
    createShapeElement : function()
    {
       var shape = this._super();
       this.originalWidth = 69.55780000000595;
       this.originalHeight= 22;
       return shape;
    },
 
    createSet: function()
    {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L69.55780000000595,0 L69.55780000000595,22 L0,22");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // outline
        shape = this.canvas.paper.path('M0 9.932800000005955L13.10158237711039 0.75L69 0.75L69 20.75L11.482077748871234 20.75Z');
        shape.attr({"stroke":"rgba(0,120,242,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
        shape.data("name","outline");
        
        // label
        shape = this.canvas.paper.text(0,0,'Data_ID');
        shape.attr({"x":13.182800000005955,"y":11,"text-anchor":"start","text":"Data_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#0078F2","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","label");
        
 
        return this.canvas.paper.setFinish();
    }
 });
 
 /**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
Signals_DataTarget = Signals_DataTarget.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.getInputPort(0).attr({
            semanticGroup:"data"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        var _this = this;
        
        // handle the size of the shape if the label has changed
        //
        this.adjustWidth = function(){
            var width = _this.layerGet("label").getBBox().width+15 ;

            _this.setWidth(width+5);
            _this.layerAttr("BoundingBox", { path: `M0 0 L${width} 0 L${width} 20 L0 20 Z`});
            _this.layerAttr("outline",     { path: `M0 10 L13 0 L${width} 0 L${width} 20 L13 20 Z`});
          
        };
        this.on("change:userData.dataId",function(emitter, event){
            _this.layerAttr("label", {text: event.value});
            _this.adjustWidth();
        });
        this.on("added", function(){
            var dataId = _this.attr("userData.dataId");
            if(!dataId){
                dataId = "Data_Id";
                _this.attr("userData.dataId", dataId);
            }            
            _this.layerAttr("label", {text: dataId});
            _this.adjustWidth();
        });
        
        // get the connected port and forward the port to the related party ( SignalSource shape)
        //
        this.getInputPort(0).on("connect", function(emitter, event){
           _this.signalPort = event.connection.getSource();
        });

        this.getInputPort(0).on("disconnect", function(emitter, event){
            delete _this.signalPort;
        });
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        var _this = this;
        var dataId = this.attr("userData.dataId")
        // first check if any object already create the signal context
        if(!context.signalPorts){
            context.signalPorts = { };
        }
        
        // check if my signal port is set 
        if(this.signalPort){
            if(!(dataId in context.signalPorts)){
                context.signalPorts[dataId] = _this.signalPort;
            }
            // Update the value
            // var _val = _this.signalPort.getValue();
            // if(_val){
                _this.layerAttr("label", {text: dataId + ": " + _this.signalPort.getValue()});
                _this.adjustWidth();
            // }else{
            //     _this.layerAttr("label", {text: dataId});
            //     _this.adjustWidth();
            // }
            
        }
        else{
            delete context.signalPorts[dataId];
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
        //console.log("start");
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
        //console.log("end");
    },


    getParameterSettings: function()
    {
        return [
        {
            name:"dataId",
            label:"Data Id",
            property:{
                type: "string"
            }
        }];
    },
    
    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      };
    },
    
    
    /**
     * @private
     */
    applyTransformation: function () {
        let s =
        // override the base implementation and do not scale the internal SVG elements....this let the arrow looks a like streche...we
        // calculate the path in the event handler. A lot more code....but the result is much cleaner
        //"S" + this.scaleX + "," + this.scaleY + ",0,0 " +
        "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
        "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
        ""
        this.svgNodes.transform(s)
        if (this.rotationAngle === 90 || this.rotationAngle === 270) {
        let before = this.svgNodes.getBBox(true);
        let ratio = before.height / before.width;
        let reverseRatio = before.width / before.height;
        let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
        this.svgNodes.transform(rs);
        }

        return this;
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var START = CircuitFigure.extend({

   NAME: "START",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:30,height:30},attr), setter, getter);
     var port;
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(103.33333333333334, 49.44075946666696));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 30;
      this.originalHeight= 30;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L30,0 L30,30 L0,30");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":15,"ry":15,"cx":15,"cy":15,"stroke":"none","stroke-width":0,"fill":"#303030","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle_
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":10,"ry":10,"cx":15,"cy":14.832227840000087,"stroke":"none","stroke-width":0,"fill":"#303030","dasharray":null,"opacity":1});
       shape.data("name","Circle_");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
START = START.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        this.attr({resizeable:false});
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        // your special code here
        this.current_state = 0;
        
        // Initialize default values
        this.getOutputPort(0).setValue(false);
        this.layerAttr("Circle_", { fill: "#303030" });
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        var self = this;
        switch(this.current_state) {
          case 0: // STOPPED
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_", { fill: "#303030" });
            this.current_state = 1;
            break;
          case 1: // SIGNAL_UP
            this.getOutputPort(0).setValue(true);
            this.layerAttr("Circle_", { fill: "#faa50a" });
            setTimeout(function(){
                self.current_state = 2;
            }, 1000);
            break;
          case 2: //SIGNAL_DOWN
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_", { fill: "#303030" });
            break;
          default:
            break;
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
        this.getOutputPort(0).setValue(false);
        this.layerAttr("Circle_", { fill: "#303030" });
        this.current_state = 0;
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
        this.getOutputPort(0).setValue(false);
        this.layerAttr("Circle_", { fill: "#303030" });
        this.current_state = 0;
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


