// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var Signals_DataSource = CircuitFigure.extend({

   NAME: "Signals_DataSource",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:65.72720000000481,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98.47855986562651, 46.56272727272815));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
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
       shape.attr({"stroke":"#41AAAA","stroke-width":1,"fill":"none","dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'Data_ID');
       shape.attr({"x":4.773050000005242,"y":11,"text-anchor":"start","text":"Data_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#41AAAA","fill":"#41AAAA","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
        var self = this;
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
            // Add Label for DataID
            var dataId = _this.attr("userData.dataId");
            if(!dataId){
                dataId = "Data_Id";
                _this.attr("userData.dataId", dataId);
            }
            _this.layerAttr("label", {text: dataId});
            
            // Parse the value
            var _dataType = _this.attr("userData.dataType");
            var _value = _this.attr("userData.dataValue");
            var _isArray = _this.attr("userData.dataIsArray");
            
            // Check value considering the Datatype and the value rank
            var parsed_value = self.checkOPCUAValue(_dataType, _value, _isArray);
            
            // Save the value if ok else save null
            if( parsed_value.error){
                _this.constSignalValue = null;
            }else{
                _this.constSignalValue = parsed_value.value.value;
            }

            // Change the label
            if(_this.constSignalValue){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " + dataId + ": " + JSON.stringify(_this.constSignalValue)});
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
                // Parse the value
                var _dataType = _this.attr("userData.dataType");
                var _isArray = _this.attr("userData.dataIsArray");
                
                // Check value considering the Datatype and the value rank
                var parsed_value = self.checkOPCUAValue(_dataType, dataValue, _isArray);
                
                // Save the value if ok else save null
                if( parsed_value.error){
                    _this.constSignalValue = null;
                }else{
                    _this.constSignalValue = parsed_value.value.value;
                }
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " +dataId + ": " + JSON.stringify(_this.constSignalValue)});
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
