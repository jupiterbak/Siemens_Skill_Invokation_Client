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