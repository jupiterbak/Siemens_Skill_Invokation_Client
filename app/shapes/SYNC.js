// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var SYNC = CircuitFigure.extend({

   NAME: "SYNC",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:40,height:50},attr), setter, getter);
     var port;
     // input_2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-6.207600000000184, 84));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input_2");
     port.setMaxFanOut(20);
     // input_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-6.207600000000184, 19.780000000000655));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("input_1");
     port.setMaxFanOut(20);
     // output_1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(102.10088210000094, 49.512000000000626));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("output_1");
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
       shape = this.canvas.paper.text(0,0,'SYNC');
       shape.attr({"x":4,"y":26.569687500000327,"text-anchor":"start","text":"SYNC","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
SYNC = SYNC.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(1).attr({
            semanticGroup:"signal"
        });
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.state = 100; // STOPPED
        this.to_read_wait = null;
        this.first_one = null;
        this.last_one = null;
    },
    
    calculate:function()
    {
        var i1 = this.getInputPort(0);
        var i2 = this.getInputPort(1);
        var o1 = this.getOutputPort(0);
        
        // STATE MACHINE
        switch (this.state) {
            case 100: // STOPPED
                o1.setValue(false);
                if(i1.getValue() === true && i2.getValue() === true){
                    this.state = 300;
                    this.first_one = i1.getValue();
                    this.last_one = i2.getValue();
                }else if(i1.getValue() === true && i2.getValue() === false){
                    this.state = 200;
                    this.first_one = i1.getValue();
                    this.last_one = null;
                    this.to_read_wait = 1;
                }else if(i1.getValue() === false && i2.getValue() === true){
                    this.state = 200;
                    this.first_one = i2.getValue();
                    this.last_one = null;
                    this.to_read_wait = 0;
                }
                break;
            case 200: // WAIT SECOND
                if(this.getInputPort(this.to_read_wait).getValue() === true){
                    this.last_one = this.getInputPort(this.to_read_wait).getValue();
                    this.state = 300;
                }
                break;
            case 300: // Set Output
                o1.setValue(this.first_one && this.last_one);
                this.state = 100;
                break;
        }
    },
    
     /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        var self = this;
        this.state = 100; // STOPPED
    },
    
    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        var self = this;
        this.state = 100; // STOPPED
    },
});