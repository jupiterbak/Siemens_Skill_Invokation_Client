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