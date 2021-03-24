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


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var DELAY = CircuitFigure.extend({

   NAME: "DELAY",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:84,height:69},attr), setter, getter);
     var port;
     // output_0
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100.59523809523809, 52.11524637681209));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_0");
     port.setMaxFanOut(20);
     // input_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-5.357142857142857, 52.11524637681209));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 84;
      this.originalHeight= 69;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L84,0 L84,69 L0,69");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M84,67Q84,69 82, 69L2,69Q0,69 0, 67L0,2Q0,0 2, 0L82,0Q84,0 84, 2L84,67');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Delay');
       shape.attr({"x":38,"y":34,"text-anchor":"start","text":"Delay","font-family":"\"Arial\"","font-size":11,"stroke":"none","fill":"#41AAAA","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line_shadow
       shape = this.canvas.paper.path('M9.916348593882503 20.631087969915825L9.981884593883478,48.33643196991761');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M9.916348593882503 20.631087969915825L9.981884593883478,48.33643196991761');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#A8A8A8","stroke-width":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M35.98444459388338 57.68939196991232L35.41100459388326,27.297071969915123');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M35.98444459388338 57.68939196991232L35.41100459388326,27.297071969915123');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#C9C9C9","stroke-width":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // pulseline_top_shadow
       shape = this.canvas.paper.path('M4.002237499998955 19.776879999997618L9.309437499999149,19.776879999997618Q11.309437499999149,19.776879999997618 11.309437499999017, 17.776879999997618L11.30943749999837,8.006239999996978Q11.30943749999824,6.006239999996978 13.30931793710452, 6.0281086368907495L39.27579706289352,6.312051363103535Q41.2756774999998,6.333919999997306 41.2756774999998, 8.333919999997306L41.2756774999998,16.992499999997563Q41.2756774999998,18.992499999997563 43.275583463722825, 19.011894232776932L75.06557749999865,19.32017999999698');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_top_shadow");
       
       // pulseline_top
       shape = this.canvas.paper.path('M4.002237499998955 19.776879999997618L9.309437499999149,19.776879999997618Q11.309437499999149,19.776879999997618 11.309437499999017, 17.776879999997618L11.30943749999837,8.006239999996978Q11.30943749999824,6.006239999996978 13.30931793710452, 6.0281086368907495L39.27579706289352,6.312051363103535Q41.2756774999998,6.333919999997306 41.2756774999998, 8.333919999997306L41.2756774999998,16.992499999997563Q41.2756774999998,18.992499999997563 43.275583463722825, 19.011894232776932L75.06557749999865,19.32017999999698');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_top");
       
       // pulseline_bottom_shadow
       shape = this.canvas.paper.path('M3.1039974999966944 59.194799999995666L33.642557499997565,59.194799999995666Q35.642557499997565,59.194799999995666 35.642557499997565, 57.194799999995666L35.642557499997565,48.40719999999601Q35.642557499997565,46.40719999999601 37.64243793710385, 46.38533136310224L63.608917062891024,46.10138863688945Q65.60879749999731,46.07951999999568 65.60879749999731, 48.07951999999568L65.60879749999731,56.73809999999594Q65.60879749999731,58.73809999999594 67.60879749999731, 58.738099999995804L78.75485749999643,58.73809999999503');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_bottom_shadow");
       
       // pulseline_bottom
       shape = this.canvas.paper.path('M3.1039974999966944 59.194799999995666L33.642557499997565,59.194799999995666Q35.642557499997565,59.194799999995666 35.642557499997565, 57.194799999995666L35.642557499997565,48.40719999999601Q35.642557499997565,46.40719999999601 37.64243793710385, 46.38533136310224L63.608917062891024,46.10138863688945Q65.60879749999731,46.07951999999568 65.60879749999731, 48.07951999999568L65.60879749999731,56.73809999999594Q65.60879749999731,58.73809999999594 67.60879749999731, 58.738099999995804L78.75485749999643,58.73809999999503');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","pulseline_bottom");
       
       // Line_shadow
       shape = this.canvas.paper.path('M10.086228750001283 33.84501399999499L10.41390875000252,42.430230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M10.086228750001283 33.84501399999499L10.41390875000252,42.430230000002666');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#41AAAA","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M34.25262875000226 38.00094999999965L31.385428749999846,42.22802200000024');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M34.25262875000226 38.00094999999965L31.385428749999846,42.22802200000024');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#41AAAA","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M30.60130075000143 34.49864599999819L34.074708750000354,37.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M30.60130075000143 34.49864599999819L34.074708750000354,37.873749999997926');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#41AAAA","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M11.171028750002733 38.167670000003454L33.12558875000104,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M11.171028750002733 38.167670000003454L33.12558875000104,38.495350000001054');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#41AAAA","stroke-width":2,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

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
DELAY = DELAY.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.on("change:userData.delay",(emitter, event)=>{
            var value = event.value;
            this.delayedValues = []; 
            this.delayedValues.length = parseInt(parseInt(value)/50);
            this.pointer=0;
            
        });
        this.attr({
            resizeable:false,
            "userData.delay":500
        });
        this.getOutputPort(0).attr({
            semanticGroup:"signal"
        });
        this.getInputPort(0).attr({
            semanticGroup:"signal"
        });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * called every '10 [ms]' from the application.
     * 
     **/
    calculate:function(context)
    {
       this.getOutputPort(0).setValue(this.delayedValues[this.pointer]);
       this.delayedValues[this.pointer] = this.getInputPort(0).getValue();
       this.pointer = (this.pointer+1)%this.delayedValues.length; 
    },
    
    onStart:function(context)
    {
        this.currentTimer=0;
    },
    
    onStop:function(context)
    {
    },

    getParameterSettings:function()
    {
        return [
        {
            name:"delay",
            label:"Delay [ms]",
            property:{
                type: "integer",
                min: 10,
                max: 15000,
                increment:10
        }
        
        }];
    }

});



var Documentation_Markdown = draw2d.shape.basic.Rectangle.extend({
    NAME: "Documentation_Markdown",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super($.extend({bgColor: "#FDFDFD", color: "#1B1B1B"}, attr));

        this
            .on("change:userData.text", (figure, event) => {
                let rendered = markdownRenderer.render(this.attr("userData.text"))
                if(this.overlay) {
                    this.overlay.html(rendered)
                }
            })
            .on("added", (emitter, event) => {
                let rendered = markdownRenderer.render(this.attr("userData.text"))
                this.overlay = $(`<div id="${this.id}" style="padding:5px;font-size:80%;overflow:hidden;position:absolute; top:${this.getY()}px;left:${this.getY()}px">
                        ${rendered}
                        </div>`)
                event.canvas.html.append(this.overlay)
                this.overlay.css({
                    width: this.getWidth(),
                    height: this.getHeight(),
                    top: this.getY(),
                    left: this.getX()
                })
            })
            .on("removed", (emitter, event) => {
                this.overlay.remove()
            })
            .on("change:dimension", (emitter, event) => {
                if(this.overlay) {
                    this.overlay.css({width: event.width, height: event.height})
                }
            })
            .on("move", (emitter, event) => {
                if(this.overlay) {
                    this.overlay.css({top: event.y, left: event.x})
                }
            })

        this.attr("userData.text", "The quick brown fox $ **jumps** over the *lazy* dog")
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
                label: "Markdown Text",
                property: {
                    type: "longtext"
                }

            }];
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
var MTP_192168210_4840_ProductionService_Cip = CircuitFigure.extend({

   NAME: "MTP_192168210_4840_ProductionService_Cip",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:209,height:221},attr), setter, getter);
     var port;
     // Port_en
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_en");
     port.setMaxFanOut(20);
     // Port_done
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 32.35294117647059));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_done");
     port.setMaxFanOut(20);
     // Port_IN_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 43.21266968325792));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_0");
     port.setMaxFanOut(20);
     // Port_IN_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 49.09502262443439));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_1");
     port.setMaxFanOut(20);
     // Port_IN_2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 54.97737556561086));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_2");
     port.setMaxFanOut(20);
     // Port_IN_3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 60.85972850678733));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_3");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 209;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L209,0 L209,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.741887499999393,6Q4.741887499999393,0 10.741887499999393, 0L198.7418874999994,0Q204.7418874999994,0 204.7418874999994, 6L204.7418874999994,215Q204.7418874999994,221 198.7418874999994, 221L10.741887499999393,221Q4.741887499999393,221 4.741887499999393, 215L4.741887499999393,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'…rvice_Cip (V0)');
       shape.attr({"x":62.45282499999939,"y":13,"text-anchor":"start","text":"…rvice_Cip (V0)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Name");
       
       // Circle_en
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_en");
       
       // Label_en
       shape = this.canvas.paper.text(0,0,'En');
       shape.attr({"x":11.898637499999495,"y":71.5,"text-anchor":"start","text":"En","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_en");
       
       // Circle_done
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_done");
       
       // Label_done
       shape = this.canvas.paper.text(0,0,'Done');
       shape.attr({"x":170.75,"y":71.5,"text-anchor":"start","text":"Done","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_done");
       
       // Circle_IN_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_0");
       
       // Label_IN_0
       shape = this.canvas.paper.text(0,0,'CipSpeed');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"CipSpeed","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // Circle_IN_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_1");
       
       // Label_IN_1
       shape = this.canvas.paper.text(0,0,'CipFlow');
       shape.attr({"x":13.5,"y":108.1171875,"text-anchor":"start","text":"CipFlow","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_1");
       
       // Circle_IN_2
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":121.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_2");
       
       // Label_IN_2
       shape = this.canvas.paper.text(0,0,'CipDischargePressure');
       shape.attr({"x":13.5,"y":121.1171875,"text-anchor":"start","text":"CipDischargePressure","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_2");
       
       // Circle_IN_3
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":134.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_3");
       
       // Label_IN_3
       shape = this.canvas.paper.text(0,0,'CipInterval');
       shape.attr({"x":13.5,"y":134.1171875,"text-anchor":"start","text":"CipInterval","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_3");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'192.168.2.10:4840');
       shape.attr({"x":48.5,"y":41.5,"text-anchor":"start","text":"192.168.2.10:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Not Connected');
       shape.attr({"x":48.5,"y":60.5,"text-anchor":"start","text":"State: Not Connected","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: undefined');
       shape.attr({"x":48.5,"y":77.5,"text-anchor":"start","text":"NodeID: undefined","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Jupiter Bakakeu
 *
 *
 */
MTP_192168210_4840_ProductionService_Cip = MTP_192168210_4840_ProductionService_Cip.extend({

    init: function(attr, setter, getter){
      this._super(attr, setter, getter);

      this.attr({resizeable:false});

      // Input control signal types
      this.getOutputPort(0).attr({
        semanticGroup:"signal"
      });
      this.getInputPort(0).attr({
          semanticGroup:"signal"
      });

      // Other signals
      var i_ports = this.getInputPorts().data.length;
      for (var index = 0; index < i_ports; index++) {
        if(index > 0){
          this.getInputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }
      var o_ports = this.getOutputPorts().data.length;
      for (var index = 0; index < o_ports; index++) {
        if(index > 0){
          this.getOutputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

      // get the skill description from the backend.
      this.description = null;
      
      var _this= this;
      this.currentTimer=0;
      this.state = 5; // STOPPED
      this.last_en_value = 0;
      this.err_msg = "";
      this.skill_current_state = "Ready";

      this.initial_result_trigger_value = 0;
      this.last_result_trigger_value = 0;

      this.monitor_rt_call_results = null;
      this.start_call_results = null;
      this.get_results_call_results = null;

      for (var index = 0; index < this.getInputPorts().length -1 ; index++) {
        this.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
      for (var index = 0; index < this.getOutputPorts().length -1; index++) {
        this.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
    },
    
    calculate:function(){
        var self = this;
        // STATE MACHINE
        switch (this.state) {
          // case 0: // STOPPED
          //   this.getOutputPort(0).setValue(false);
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
          //   }
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);               
          //   }
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.layerAttr("Skill_State", {text: 'State: not connected'});
          //   if(this.getInputPort(0).getValue()){
          //       this.state = 10;
          //   }
          //   break;
          // case 10: // Get The skill description
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#FF3C00"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
          //   application_log.info("[" + self.NAME + "] Getting skill description.");
          //   skillproxy.getSkillDescription(this.NAME).then(function (desc) {
          //       if (desc.skill_descp){
          //           self.description = desc.skill_descp;
          //       }
          //       if(self.description){
          //         // Make transition
          //         self.state = 11;
          //       }else{
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Could not fetch the skill description";
          //         application_log.error("[" + self.NAME + "] Could not fetch the skill description.");
          //       }
          //   });
          //   this.state = 100;                       
          //   break;
          // case 100: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 11: // Connect to the skill
          //   this.layerAttr("Skill_State", {text: 'State: Connecting'});
          //   this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
          //   application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
          //   skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {
          //       if(resp_con.err){
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Error while connecting to the skill!";
          //         application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
          //       }else{
          //         self.layerAttr("Skill_State", {text: 'State: Connected'});
          //         application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
          //         socket.on("opcua_serverstatus", function(msg){
          //           // console.log("####### Serverstatus");
          //         });
                  
          //         socket.on("SkillStatesChanged", function(data){
          //           // console.log("####### StatesChanged");
          //           // Filter the event for the state changes related to this skill.
          //           var _changed_states = [];
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       var candidates = skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) { return item.id === el.state.value});
          //                       // filter with the nodeId
          //                       if (candidates.length == 0) {
          //                           candidates =skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) {
          //                               var src = el.state.value;
          //                               var target = item.nid;
          //                               var rslt = ("" + src).indexOf(target);
          //                               return rslt >= 0;
          //                           });
          //                       }
          //                       if (candidates.length > 0) {
          //                           _changed_states.push(candidates[0].id);
          //                       }
          //                   }
          //               }
          //           }
          //           self.skill_current_state = _changed_states;
          //         });

          //         socket.on("ResultTriggerChanged", function(data){
          //           // console.log("####### ResultTriggerChanged");
          //           // Filter the event for the state changes related to this skill.
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       self.last_result_trigger_value = el.value.value;
          //                   }
          //               }
          //           }
          //         });
                  
          //         // Make transition
          //         if (self.description.skillModel.StateMachine){
          //           self.state = 12; // Call the skill directly
          //         }else{
          //           self.state = 130; // monitor result trigger before calling the skill
          //         }                  
          //       }
          //   }); 
          //   self.state = 110;               
          //   break;
          // case 110: // Wait for result of connect skill
          //   this.currentTimer=0;
          //   break;
          // case 130: // Subscribe to result trigger before calling the skill
          //   self.layerAttr("Skill_State", {text: 'State: Subscribing to result trigger.'});
          //   application_log.info("[" + self.NAME + "] Subscribing to result trigger.");
          //   skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.Invokation.ResultTrigger).then(function (resp_rt) {
          //     self.monitor_rt_call_results = resp_rt;
          //     if(resp_rt.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while monitoring result trigger!";
          //       application_log.error("[" + self.NAME + "] Error while monitoring result trigger: " + JSON.stringify(resp_rt.err));
          //     }else{
          //       if(resp_rt.results){
          //         self.initial_result_trigger_value = resp_rt.results.value.value;
          //       }else{
          //         self.initial_result_trigger_value = 0;
          //       }
          //       // Make transition to call the skill
          //       self.state = 12;
          //       application_log.info("[" + self.NAME + "] successfully monitoring the result trigger." );
          //     }
          //   });
          //   self.state = 135;
          //   break;
          // case 135: // Wait for call 
          //   break;
          // case 12: // Call the skill (Model with state machine)
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Starting'});
          //   application_log.info("[" + self.NAME + "] starting the skill." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.Start.parameters.inputArguments || [];
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0
          //     });
          //   }

          //   // Call the skill
          //   skillproxy.startSkill(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_start) {
          //     self.start_call_results = resp_start;
          //     if(resp_start.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while starting the skill!";
          //       application_log.error("[" + self.NAME + "] Error while starting the skill: " + JSON.stringify(resp_start.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _outputs = resp_start.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 2;
          //       self.layerAttr("Skill_State", {text: 'State: Executing'});
          //       application_log.info("[" + self.NAME + "] successfully executing the skill. Waiting for the skill to complete..." );
          //     }
          //   });

          //   this.state = 120;               
          //   break;
          // case 120: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 2: // Wait for the  skill to be done
          //   self.layerAttr("Skill_State", {text: 'State: Executing'});
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('completed')){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }else{
          //     if(self.last_result_trigger_value > self.initial_result_trigger_value){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }            
          //   break;
          // case 3: // Call Get results
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting results'});
          //   application_log.info("[" + self.NAME + "] fetching the skill execution results..." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.GetResult.parameters.inputArguments || [];
          //   var _offset = (this.description.skillModel.Invokation.Start.parameters.inputArguments || []).length;
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index + _offset) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1 + _offset).getValue()?this.getInputPort(index + 1 + _offset).getValue():0
          //     });
          //   }

          //   // Call the emthod
          //   skillproxy.getResultsOfSkillCall(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_getResults) {
          //     self.get_results_call_results = resp_getResults;
          //     if(resp_getResults.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while fetching the results of the skill!";
          //       application_log.error("[" + self.NAME + "] Error while fetching the results of the skill: " + JSON.stringify(resp_getResults.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _offset = (self.description.skillModel.Invokation.Start.parameters.outputArguments || []).length;
          //       var _outputs = resp_getResults.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index + _offset) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 310;
          //       application_log.info("[" + self.NAME + "] results fetched sucessfully." );
          //     }
          //   });

          //   // Wait
          //   this.state = 300;
          //   break;
          // case 300: // Wait call getResults
          //   break;
          // case 310: // Wait until skill is ready again
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('skill_ready')){
          //       // Make transition
          //       this.state = 4;
          //       this.layerAttr("Skill_State", {text: 'State: Done'});
          //       application_log.info("[" + self.NAME + "] skill execusion is done." );
          //     }
          //   }else{
          //     this.state = 4;
          //     this.layerAttr("Skill_State", {text: 'State: Done'});
          //     application_log.info("[" + self.NAME + "] skill execusion is done." );
          //   }            
          //   break;
          // case 4: // Set the done signal
          //   this.getOutputPort(0).setValue(true);

          //   this.layerAttr("Circle_done",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   if(! this.getInputPort(0).getValue()){
          //       this.state = 5;
          //   }
          //   break;
          // case 5: // Reinitialize
          //   this.getOutputPort(0).setValue(false);
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);                
          //   }
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.state = 0;
          //   this.layerAttr("Skill_State", {text: 'State: Ready'});
          //   break;
          case 6: // Error
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("Skill_State", {text: 'State: Error'});
            this.layerAttr("circle",{fill:"#FFB19A"});
        }
        this.last_en_value = this.getOutputPort(0).getValue();
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);                
        }
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        //application_log.info("[" + self.NAME + "] skill execusion started." );
        application_log.error("[" + self.NAME + "] MTP-Service is not implemented." );
        this.state = 6; // ERROR
        this.last_en_value = 0;
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        application_log.info("[" + self.NAME + "] MTP-service execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);              
        }

        this.state = 6; // ERROR
        this.last_en_value = 0;
        
        socket.off("opcua_serverstatus", function(msg){
          // console.log("####### Serverstatus");
        });
        
        socket.off("SkillStatesChanged", function(msg){
          // console.log("####### StatesChanged");
        });
    },
    
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
var MTP_192168210_4840_ProductionService_Production = CircuitFigure.extend({

   NAME: "MTP_192168210_4840_ProductionService_Production",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:209,height:221},attr), setter, getter);
     var port;
     // Port_en
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_en");
     port.setMaxFanOut(20);
     // Port_done
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 32.35294117647059));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_done");
     port.setMaxFanOut(20);
     // Port_IN_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 43.21266968325792));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_0");
     port.setMaxFanOut(20);
     // Port_IN_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 49.09502262443439));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_1");
     port.setMaxFanOut(20);
     // Port_IN_2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 54.97737556561086));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_2");
     port.setMaxFanOut(20);
     // Port_IN_3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 60.85972850678733));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_3");
     port.setMaxFanOut(20);
     // Port_IN_4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 66.7420814479638));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_4");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 209;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L209,0 L209,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.741887499999393,6Q4.741887499999393,0 10.741887499999393, 0L198.7418874999994,0Q204.7418874999994,0 204.7418874999994, 6L204.7418874999994,215Q204.7418874999994,221 198.7418874999994, 221L10.741887499999393,221Q4.741887499999393,221 4.741887499999393, 215L4.741887499999393,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'…roduction (V0)');
       shape.attr({"x":62.45282499999939,"y":13,"text-anchor":"start","text":"…roduction (V0)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Name");
       
       // Circle_en
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_en");
       
       // Label_en
       shape = this.canvas.paper.text(0,0,'En');
       shape.attr({"x":11.898637499999495,"y":71.5,"text-anchor":"start","text":"En","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_en");
       
       // Circle_done
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_done");
       
       // Label_done
       shape = this.canvas.paper.text(0,0,'Done');
       shape.attr({"x":170.75,"y":71.5,"text-anchor":"start","text":"Done","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_done");
       
       // Circle_IN_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_0");
       
       // Label_IN_0
       shape = this.canvas.paper.text(0,0,'ProductionSpeed');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"ProductionSpeed","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // Circle_IN_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_1");
       
       // Label_IN_1
       shape = this.canvas.paper.text(0,0,'ProductionFlow');
       shape.attr({"x":13.5,"y":108.1171875,"text-anchor":"start","text":"ProductionFlow","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_1");
       
       // Circle_IN_2
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":121.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_2");
       
       // Label_IN_2
       shape = this.canvas.paper.text(0,0,'ProductionDischargePressure');
       shape.attr({"x":13.5,"y":121.1171875,"text-anchor":"start","text":"ProductionDischargePressure","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_2");
       
       // Circle_IN_3
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":134.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_3");
       
       // Label_IN_3
       shape = this.canvas.paper.text(0,0,'ProductionInterval');
       shape.attr({"x":13.5,"y":134.1171875,"text-anchor":"start","text":"ProductionInterval","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_3");
       
       // Circle_IN_4
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":147.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_4");
       
       // Label_IN_4
       shape = this.canvas.paper.text(0,0,'ProductionTubidity');
       shape.attr({"x":13.5,"y":147.1171875,"text-anchor":"start","text":"ProductionTubidity","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_4");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'192.168.2.10:4840');
       shape.attr({"x":48.5,"y":41.5,"text-anchor":"start","text":"192.168.2.10:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Not Connected');
       shape.attr({"x":48.5,"y":60.5,"text-anchor":"start","text":"State: Not Connected","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: undefined');
       shape.attr({"x":48.5,"y":77.5,"text-anchor":"start","text":"NodeID: undefined","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Jupiter Bakakeu
 *
 *
 */
MTP_192168210_4840_ProductionService_Production = MTP_192168210_4840_ProductionService_Production.extend({

    init: function(attr, setter, getter){
      this._super(attr, setter, getter);

      this.attr({resizeable:false});

      // Input control signal types
      this.getOutputPort(0).attr({
        semanticGroup:"signal"
      });
      this.getInputPort(0).attr({
          semanticGroup:"signal"
      });

      // Other signals
      var i_ports = this.getInputPorts().data.length;
      for (var index = 0; index < i_ports; index++) {
        if(index > 0){
          this.getInputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }
      var o_ports = this.getOutputPorts().data.length;
      for (var index = 0; index < o_ports; index++) {
        if(index > 0){
          this.getOutputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

      // get the skill description from the backend.
      this.description = null;
      
      var _this= this;
      this.currentTimer=0;
      this.state = 5; // STOPPED
      this.last_en_value = 0;
      this.err_msg = "";
      this.skill_current_state = "Ready";

      this.initial_result_trigger_value = 0;
      this.last_result_trigger_value = 0;

      this.monitor_rt_call_results = null;
      this.start_call_results = null;
      this.get_results_call_results = null;

      for (var index = 0; index < this.getInputPorts().length -1 ; index++) {
        this.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
      for (var index = 0; index < this.getOutputPorts().length -1; index++) {
        this.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
    },
    
    calculate:function(){
        var self = this;
        // STATE MACHINE
        switch (this.state) {
          // case 0: // STOPPED
          //   this.getOutputPort(0).setValue(false);
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
          //   }
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);               
          //   }
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.layerAttr("Skill_State", {text: 'State: not connected'});
          //   if(this.getInputPort(0).getValue()){
          //       this.state = 10;
          //   }
          //   break;
          // case 10: // Get The skill description
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#FF3C00"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
          //   application_log.info("[" + self.NAME + "] Getting skill description.");
          //   skillproxy.getSkillDescription(this.NAME).then(function (desc) {
          //       if (desc.skill_descp){
          //           self.description = desc.skill_descp;
          //       }
          //       if(self.description){
          //         // Make transition
          //         self.state = 11;
          //       }else{
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Could not fetch the skill description";
          //         application_log.error("[" + self.NAME + "] Could not fetch the skill description.");
          //       }
          //   });
          //   this.state = 100;                       
          //   break;
          // case 100: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 11: // Connect to the skill
          //   this.layerAttr("Skill_State", {text: 'State: Connecting'});
          //   this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
          //   application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
          //   skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {
          //       if(resp_con.err){
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Error while connecting to the skill!";
          //         application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
          //       }else{
          //         self.layerAttr("Skill_State", {text: 'State: Connected'});
          //         application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
          //         socket.on("opcua_serverstatus", function(msg){
          //           // console.log("####### Serverstatus");
          //         });
                  
          //         socket.on("SkillStatesChanged", function(data){
          //           // console.log("####### StatesChanged");
          //           // Filter the event for the state changes related to this skill.
          //           var _changed_states = [];
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       var candidates = skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) { return item.id === el.state.value});
          //                       // filter with the nodeId
          //                       if (candidates.length == 0) {
          //                           candidates =skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) {
          //                               var src = el.state.value;
          //                               var target = item.nid;
          //                               var rslt = ("" + src).indexOf(target);
          //                               return rslt >= 0;
          //                           });
          //                       }
          //                       if (candidates.length > 0) {
          //                           _changed_states.push(candidates[0].id);
          //                       }
          //                   }
          //               }
          //           }
          //           self.skill_current_state = _changed_states;
          //         });

          //         socket.on("ResultTriggerChanged", function(data){
          //           // console.log("####### ResultTriggerChanged");
          //           // Filter the event for the state changes related to this skill.
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       self.last_result_trigger_value = el.value.value;
          //                   }
          //               }
          //           }
          //         });
                  
          //         // Make transition
          //         if (self.description.skillModel.StateMachine){
          //           self.state = 12; // Call the skill directly
          //         }else{
          //           self.state = 130; // monitor result trigger before calling the skill
          //         }                  
          //       }
          //   }); 
          //   self.state = 110;               
          //   break;
          // case 110: // Wait for result of connect skill
          //   this.currentTimer=0;
          //   break;
          // case 130: // Subscribe to result trigger before calling the skill
          //   self.layerAttr("Skill_State", {text: 'State: Subscribing to result trigger.'});
          //   application_log.info("[" + self.NAME + "] Subscribing to result trigger.");
          //   skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.Invokation.ResultTrigger).then(function (resp_rt) {
          //     self.monitor_rt_call_results = resp_rt;
          //     if(resp_rt.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while monitoring result trigger!";
          //       application_log.error("[" + self.NAME + "] Error while monitoring result trigger: " + JSON.stringify(resp_rt.err));
          //     }else{
          //       if(resp_rt.results){
          //         self.initial_result_trigger_value = resp_rt.results.value.value;
          //       }else{
          //         self.initial_result_trigger_value = 0;
          //       }
          //       // Make transition to call the skill
          //       self.state = 12;
          //       application_log.info("[" + self.NAME + "] successfully monitoring the result trigger." );
          //     }
          //   });
          //   self.state = 135;
          //   break;
          // case 135: // Wait for call 
          //   break;
          // case 12: // Call the skill (Model with state machine)
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Starting'});
          //   application_log.info("[" + self.NAME + "] starting the skill." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.Start.parameters.inputArguments || [];
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0
          //     });
          //   }

          //   // Call the skill
          //   skillproxy.startSkill(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_start) {
          //     self.start_call_results = resp_start;
          //     if(resp_start.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while starting the skill!";
          //       application_log.error("[" + self.NAME + "] Error while starting the skill: " + JSON.stringify(resp_start.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _outputs = resp_start.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 2;
          //       self.layerAttr("Skill_State", {text: 'State: Executing'});
          //       application_log.info("[" + self.NAME + "] successfully executing the skill. Waiting for the skill to complete..." );
          //     }
          //   });

          //   this.state = 120;               
          //   break;
          // case 120: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 2: // Wait for the  skill to be done
          //   self.layerAttr("Skill_State", {text: 'State: Executing'});
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('completed')){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }else{
          //     if(self.last_result_trigger_value > self.initial_result_trigger_value){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }            
          //   break;
          // case 3: // Call Get results
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting results'});
          //   application_log.info("[" + self.NAME + "] fetching the skill execution results..." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.GetResult.parameters.inputArguments || [];
          //   var _offset = (this.description.skillModel.Invokation.Start.parameters.inputArguments || []).length;
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index + _offset) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1 + _offset).getValue()?this.getInputPort(index + 1 + _offset).getValue():0
          //     });
          //   }

          //   // Call the emthod
          //   skillproxy.getResultsOfSkillCall(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_getResults) {
          //     self.get_results_call_results = resp_getResults;
          //     if(resp_getResults.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while fetching the results of the skill!";
          //       application_log.error("[" + self.NAME + "] Error while fetching the results of the skill: " + JSON.stringify(resp_getResults.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _offset = (self.description.skillModel.Invokation.Start.parameters.outputArguments || []).length;
          //       var _outputs = resp_getResults.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index + _offset) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 310;
          //       application_log.info("[" + self.NAME + "] results fetched sucessfully." );
          //     }
          //   });

          //   // Wait
          //   this.state = 300;
          //   break;
          // case 300: // Wait call getResults
          //   break;
          // case 310: // Wait until skill is ready again
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('skill_ready')){
          //       // Make transition
          //       this.state = 4;
          //       this.layerAttr("Skill_State", {text: 'State: Done'});
          //       application_log.info("[" + self.NAME + "] skill execusion is done." );
          //     }
          //   }else{
          //     this.state = 4;
          //     this.layerAttr("Skill_State", {text: 'State: Done'});
          //     application_log.info("[" + self.NAME + "] skill execusion is done." );
          //   }            
          //   break;
          // case 4: // Set the done signal
          //   this.getOutputPort(0).setValue(true);

          //   this.layerAttr("Circle_done",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   if(! this.getInputPort(0).getValue()){
          //       this.state = 5;
          //   }
          //   break;
          // case 5: // Reinitialize
          //   this.getOutputPort(0).setValue(false);
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);                
          //   }
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.state = 0;
          //   this.layerAttr("Skill_State", {text: 'State: Ready'});
          //   break;
          case 6: // Error
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("Skill_State", {text: 'State: Error'});
            this.layerAttr("circle",{fill:"#FFB19A"});
        }
        this.last_en_value = this.getOutputPort(0).getValue();
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);                
        }
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        //application_log.info("[" + self.NAME + "] skill execusion started." );
        application_log.error("[" + self.NAME + "] MTP-Service is not implemented." );
        this.state = 6; // ERROR
        this.last_en_value = 0;
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        application_log.info("[" + self.NAME + "] MTP-service execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);              
        }

        this.state = 6; // ERROR
        this.last_en_value = 0;
        
        socket.off("opcua_serverstatus", function(msg){
          // console.log("####### Serverstatus");
        });
        
        socket.off("SkillStatesChanged", function(msg){
          // console.log("####### StatesChanged");
        });
    },
    
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
var MTP_192168210_4840_ProductionService_Standby = CircuitFigure.extend({

   NAME: "MTP_192168210_4840_ProductionService_Standby",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:209,height:221},attr), setter, getter);
     var port;
     // Port_en
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_en");
     port.setMaxFanOut(20);
     // Port_done
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 32.35294117647059));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_done");
     port.setMaxFanOut(20);
     // Port_IN_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 43.21266968325792));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_0");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 209;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L209,0 L209,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.741887499999393,6Q4.741887499999393,0 10.741887499999393, 0L198.7418874999994,0Q204.7418874999994,0 204.7418874999994, 6L204.7418874999994,215Q204.7418874999994,221 198.7418874999994, 221L10.741887499999393,221Q4.741887499999393,221 4.741887499999393, 215L4.741887499999393,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'…e_Standby (V0)');
       shape.attr({"x":62.45282499999939,"y":13,"text-anchor":"start","text":"…e_Standby (V0)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Name");
       
       // Circle_en
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_en");
       
       // Label_en
       shape = this.canvas.paper.text(0,0,'En');
       shape.attr({"x":11.898637499999495,"y":71.5,"text-anchor":"start","text":"En","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_en");
       
       // Circle_done
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_done");
       
       // Label_done
       shape = this.canvas.paper.text(0,0,'Done');
       shape.attr({"x":170.75,"y":71.5,"text-anchor":"start","text":"Done","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_done");
       
       // Circle_IN_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_0");
       
       // Label_IN_0
       shape = this.canvas.paper.text(0,0,'StandbySpeed');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"StandbySpeed","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'192.168.2.10:4840');
       shape.attr({"x":48.5,"y":41.5,"text-anchor":"start","text":"192.168.2.10:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Not Connected');
       shape.attr({"x":48.5,"y":60.5,"text-anchor":"start","text":"State: Not Connected","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: undefined');
       shape.attr({"x":48.5,"y":77.5,"text-anchor":"start","text":"NodeID: undefined","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Jupiter Bakakeu
 *
 *
 */
MTP_192168210_4840_ProductionService_Standby = MTP_192168210_4840_ProductionService_Standby.extend({

    init: function(attr, setter, getter){
      this._super(attr, setter, getter);

      this.attr({resizeable:false});

      // Input control signal types
      this.getOutputPort(0).attr({
        semanticGroup:"signal"
      });
      this.getInputPort(0).attr({
          semanticGroup:"signal"
      });

      // Other signals
      var i_ports = this.getInputPorts().data.length;
      for (var index = 0; index < i_ports; index++) {
        if(index > 0){
          this.getInputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }
      var o_ports = this.getOutputPorts().data.length;
      for (var index = 0; index < o_ports; index++) {
        if(index > 0){
          this.getOutputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

      // get the skill description from the backend.
      this.description = null;
      
      var _this= this;
      this.currentTimer=0;
      this.state = 5; // STOPPED
      this.last_en_value = 0;
      this.err_msg = "";
      this.skill_current_state = "Ready";

      this.initial_result_trigger_value = 0;
      this.last_result_trigger_value = 0;

      this.monitor_rt_call_results = null;
      this.start_call_results = null;
      this.get_results_call_results = null;

      for (var index = 0; index < this.getInputPorts().length -1 ; index++) {
        this.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
      for (var index = 0; index < this.getOutputPorts().length -1; index++) {
        this.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
    },
    
    calculate:function(){
        var self = this;
        // STATE MACHINE
        switch (this.state) {
          // case 0: // STOPPED
          //   this.getOutputPort(0).setValue(false);
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
          //   }
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);               
          //   }
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.layerAttr("Skill_State", {text: 'State: not connected'});
          //   if(this.getInputPort(0).getValue()){
          //       this.state = 10;
          //   }
          //   break;
          // case 10: // Get The skill description
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#FF3C00"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
          //   application_log.info("[" + self.NAME + "] Getting skill description.");
          //   skillproxy.getSkillDescription(this.NAME).then(function (desc) {
          //       if (desc.skill_descp){
          //           self.description = desc.skill_descp;
          //       }
          //       if(self.description){
          //         // Make transition
          //         self.state = 11;
          //       }else{
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Could not fetch the skill description";
          //         application_log.error("[" + self.NAME + "] Could not fetch the skill description.");
          //       }
          //   });
          //   this.state = 100;                       
          //   break;
          // case 100: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 11: // Connect to the skill
          //   this.layerAttr("Skill_State", {text: 'State: Connecting'});
          //   this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
          //   application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
          //   skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {
          //       if(resp_con.err){
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Error while connecting to the skill!";
          //         application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
          //       }else{
          //         self.layerAttr("Skill_State", {text: 'State: Connected'});
          //         application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
          //         socket.on("opcua_serverstatus", function(msg){
          //           // console.log("####### Serverstatus");
          //         });
                  
          //         socket.on("SkillStatesChanged", function(data){
          //           // console.log("####### StatesChanged");
          //           // Filter the event for the state changes related to this skill.
          //           var _changed_states = [];
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       var candidates = skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) { return item.id === el.state.value});
          //                       // filter with the nodeId
          //                       if (candidates.length == 0) {
          //                           candidates =skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) {
          //                               var src = el.state.value;
          //                               var target = item.nid;
          //                               var rslt = ("" + src).indexOf(target);
          //                               return rslt >= 0;
          //                           });
          //                       }
          //                       if (candidates.length > 0) {
          //                           _changed_states.push(candidates[0].id);
          //                       }
          //                   }
          //               }
          //           }
          //           self.skill_current_state = _changed_states;
          //         });

          //         socket.on("ResultTriggerChanged", function(data){
          //           // console.log("####### ResultTriggerChanged");
          //           // Filter the event for the state changes related to this skill.
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       self.last_result_trigger_value = el.value.value;
          //                   }
          //               }
          //           }
          //         });
                  
          //         // Make transition
          //         if (self.description.skillModel.StateMachine){
          //           self.state = 12; // Call the skill directly
          //         }else{
          //           self.state = 130; // monitor result trigger before calling the skill
          //         }                  
          //       }
          //   }); 
          //   self.state = 110;               
          //   break;
          // case 110: // Wait for result of connect skill
          //   this.currentTimer=0;
          //   break;
          // case 130: // Subscribe to result trigger before calling the skill
          //   self.layerAttr("Skill_State", {text: 'State: Subscribing to result trigger.'});
          //   application_log.info("[" + self.NAME + "] Subscribing to result trigger.");
          //   skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.Invokation.ResultTrigger).then(function (resp_rt) {
          //     self.monitor_rt_call_results = resp_rt;
          //     if(resp_rt.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while monitoring result trigger!";
          //       application_log.error("[" + self.NAME + "] Error while monitoring result trigger: " + JSON.stringify(resp_rt.err));
          //     }else{
          //       if(resp_rt.results){
          //         self.initial_result_trigger_value = resp_rt.results.value.value;
          //       }else{
          //         self.initial_result_trigger_value = 0;
          //       }
          //       // Make transition to call the skill
          //       self.state = 12;
          //       application_log.info("[" + self.NAME + "] successfully monitoring the result trigger." );
          //     }
          //   });
          //   self.state = 135;
          //   break;
          // case 135: // Wait for call 
          //   break;
          // case 12: // Call the skill (Model with state machine)
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Starting'});
          //   application_log.info("[" + self.NAME + "] starting the skill." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.Start.parameters.inputArguments || [];
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0
          //     });
          //   }

          //   // Call the skill
          //   skillproxy.startSkill(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_start) {
          //     self.start_call_results = resp_start;
          //     if(resp_start.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while starting the skill!";
          //       application_log.error("[" + self.NAME + "] Error while starting the skill: " + JSON.stringify(resp_start.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _outputs = resp_start.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 2;
          //       self.layerAttr("Skill_State", {text: 'State: Executing'});
          //       application_log.info("[" + self.NAME + "] successfully executing the skill. Waiting for the skill to complete..." );
          //     }
          //   });

          //   this.state = 120;               
          //   break;
          // case 120: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 2: // Wait for the  skill to be done
          //   self.layerAttr("Skill_State", {text: 'State: Executing'});
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('completed')){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }else{
          //     if(self.last_result_trigger_value > self.initial_result_trigger_value){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }            
          //   break;
          // case 3: // Call Get results
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting results'});
          //   application_log.info("[" + self.NAME + "] fetching the skill execution results..." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.GetResult.parameters.inputArguments || [];
          //   var _offset = (this.description.skillModel.Invokation.Start.parameters.inputArguments || []).length;
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index + _offset) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1 + _offset).getValue()?this.getInputPort(index + 1 + _offset).getValue():0
          //     });
          //   }

          //   // Call the emthod
          //   skillproxy.getResultsOfSkillCall(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_getResults) {
          //     self.get_results_call_results = resp_getResults;
          //     if(resp_getResults.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while fetching the results of the skill!";
          //       application_log.error("[" + self.NAME + "] Error while fetching the results of the skill: " + JSON.stringify(resp_getResults.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _offset = (self.description.skillModel.Invokation.Start.parameters.outputArguments || []).length;
          //       var _outputs = resp_getResults.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index + _offset) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 310;
          //       application_log.info("[" + self.NAME + "] results fetched sucessfully." );
          //     }
          //   });

          //   // Wait
          //   this.state = 300;
          //   break;
          // case 300: // Wait call getResults
          //   break;
          // case 310: // Wait until skill is ready again
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('skill_ready')){
          //       // Make transition
          //       this.state = 4;
          //       this.layerAttr("Skill_State", {text: 'State: Done'});
          //       application_log.info("[" + self.NAME + "] skill execusion is done." );
          //     }
          //   }else{
          //     this.state = 4;
          //     this.layerAttr("Skill_State", {text: 'State: Done'});
          //     application_log.info("[" + self.NAME + "] skill execusion is done." );
          //   }            
          //   break;
          // case 4: // Set the done signal
          //   this.getOutputPort(0).setValue(true);

          //   this.layerAttr("Circle_done",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   if(! this.getInputPort(0).getValue()){
          //       this.state = 5;
          //   }
          //   break;
          // case 5: // Reinitialize
          //   this.getOutputPort(0).setValue(false);
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);                
          //   }
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.state = 0;
          //   this.layerAttr("Skill_State", {text: 'State: Ready'});
          //   break;
          case 6: // Error
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("Skill_State", {text: 'State: Error'});
            this.layerAttr("circle",{fill:"#FFB19A"});
        }
        this.last_en_value = this.getOutputPort(0).getValue();
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);                
        }
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        //application_log.info("[" + self.NAME + "] skill execusion started." );
        application_log.error("[" + self.NAME + "] MTP-Service is not implemented." );
        this.state = 6; // ERROR
        this.last_en_value = 0;
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        application_log.info("[" + self.NAME + "] MTP-service execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);              
        }

        this.state = 6; // ERROR
        this.last_en_value = 0;
        
        socket.off("opcua_serverstatus", function(msg){
          // console.log("####### Serverstatus");
        });
        
        socket.off("SkillStatesChanged", function(msg){
          // console.log("####### StatesChanged");
        });
    },
    
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
var MTP_192168210_4840_ProductionService_Water = CircuitFigure.extend({

   NAME: "MTP_192168210_4840_ProductionService_Water",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:209,height:221},attr), setter, getter);
     var port;
     // Port_en
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_en");
     port.setMaxFanOut(20);
     // Port_done
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 32.35294117647059));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_done");
     port.setMaxFanOut(20);
     // Port_IN_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 43.21266968325792));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_0");
     port.setMaxFanOut(20);
     // Port_IN_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 49.09502262443439));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_1");
     port.setMaxFanOut(20);
     // Port_IN_2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6315789473684212, 54.97737556561086));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_2");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 209;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L209,0 L209,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.741887499999393,6Q4.741887499999393,0 10.741887499999393, 0L198.7418874999994,0Q204.7418874999994,0 204.7418874999994, 6L204.7418874999994,215Q204.7418874999994,221 198.7418874999994, 221L10.741887499999393,221Q4.741887499999393,221 4.741887499999393, 215L4.741887499999393,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'…ice_Water (V0)');
       shape.attr({"x":62.45282499999939,"y":13,"text-anchor":"start","text":"…ice_Water (V0)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Name");
       
       // Circle_en
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_en");
       
       // Label_en
       shape = this.canvas.paper.text(0,0,'En');
       shape.attr({"x":11.898637499999495,"y":71.5,"text-anchor":"start","text":"En","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_en");
       
       // Circle_done
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#1C9BAB","dasharray":null,"opacity":1});
       shape.data("name","Circle_done");
       
       // Label_done
       shape = this.canvas.paper.text(0,0,'Done');
       shape.attr({"x":170.75,"y":71.5,"text-anchor":"start","text":"Done","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_done");
       
       // Circle_IN_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_0");
       
       // Label_IN_0
       shape = this.canvas.paper.text(0,0,'WaterSpeed');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"WaterSpeed","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // Circle_IN_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_1");
       
       // Label_IN_1
       shape = this.canvas.paper.text(0,0,'WaterFlow');
       shape.attr({"x":13.5,"y":108.1171875,"text-anchor":"start","text":"WaterFlow","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_1");
       
       // Circle_IN_2
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":121.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_2");
       
       // Label_IN_2
       shape = this.canvas.paper.text(0,0,'WaterDischargePressure');
       shape.attr({"x":13.5,"y":121.1171875,"text-anchor":"start","text":"WaterDischargePressure","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_2");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'192.168.2.10:4840');
       shape.attr({"x":48.5,"y":41.5,"text-anchor":"start","text":"192.168.2.10:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Not Connected');
       shape.attr({"x":48.5,"y":60.5,"text-anchor":"start","text":"State: Not Connected","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: undefined');
       shape.attr({"x":48.5,"y":77.5,"text-anchor":"start","text":"NodeID: undefined","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Jupiter Bakakeu
 *
 *
 */
MTP_192168210_4840_ProductionService_Water = MTP_192168210_4840_ProductionService_Water.extend({

    init: function(attr, setter, getter){
      this._super(attr, setter, getter);

      this.attr({resizeable:false});

      // Input control signal types
      this.getOutputPort(0).attr({
        semanticGroup:"signal"
      });
      this.getInputPort(0).attr({
          semanticGroup:"signal"
      });

      // Other signals
      var i_ports = this.getInputPorts().data.length;
      for (var index = 0; index < i_ports; index++) {
        if(index > 0){
          this.getInputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }
      var o_ports = this.getOutputPorts().data.length;
      for (var index = 0; index < o_ports; index++) {
        if(index > 0){
          this.getOutputPort(index).attr({
            semanticGroup:"data"
          });
        }        
      }

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

      // get the skill description from the backend.
      this.description = null;
      
      var _this= this;
      this.currentTimer=0;
      this.state = 5; // STOPPED
      this.last_en_value = 0;
      this.err_msg = "";
      this.skill_current_state = "Ready";

      this.initial_result_trigger_value = 0;
      this.last_result_trigger_value = 0;

      this.monitor_rt_call_results = null;
      this.start_call_results = null;
      this.get_results_call_results = null;

      for (var index = 0; index < this.getInputPorts().length -1 ; index++) {
        this.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
      for (var index = 0; index < this.getOutputPorts().length -1; index++) {
        this.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});              
      }
    },
    
    calculate:function(){
        var self = this;
        // STATE MACHINE
        switch (this.state) {
          // case 0: // STOPPED
          //   this.getOutputPort(0).setValue(false);
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
          //   }
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);               
          //   }
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.layerAttr("Skill_State", {text: 'State: not connected'});
          //   if(this.getInputPort(0).getValue()){
          //       this.state = 10;
          //   }
          //   break;
          // case 10: // Get The skill description
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#FF3C00"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
          //   application_log.info("[" + self.NAME + "] Getting skill description.");
          //   skillproxy.getSkillDescription(this.NAME).then(function (desc) {
          //       if (desc.skill_descp){
          //           self.description = desc.skill_descp;
          //       }
          //       if(self.description){
          //         // Make transition
          //         self.state = 11;
          //       }else{
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Could not fetch the skill description";
          //         application_log.error("[" + self.NAME + "] Could not fetch the skill description.");
          //       }
          //   });
          //   this.state = 100;                       
          //   break;
          // case 100: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 11: // Connect to the skill
          //   this.layerAttr("Skill_State", {text: 'State: Connecting'});
          //   this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
          //   application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
          //   skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {
          //       if(resp_con.err){
          //         // Make transition to err
          //         self.state = 6;
          //         self.err_msg = "Error while connecting to the skill!";
          //         application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
          //       }else{
          //         self.layerAttr("Skill_State", {text: 'State: Connected'});
          //         application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
          //         socket.on("opcua_serverstatus", function(msg){
          //           // console.log("####### Serverstatus");
          //         });
                  
          //         socket.on("SkillStatesChanged", function(data){
          //           // console.log("####### StatesChanged");
          //           // Filter the event for the state changes related to this skill.
          //           var _changed_states = [];
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       var candidates = skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) { return item.id === el.state.value});
          //                       // filter with the nodeId
          //                       if (candidates.length == 0) {
          //                           candidates =skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) {
          //                               var src = el.state.value;
          //                               var target = item.nid;
          //                               var rslt = ("" + src).indexOf(target);
          //                               return rslt >= 0;
          //                           });
          //                       }
          //                       if (candidates.length > 0) {
          //                           _changed_states.push(candidates[0].id);
          //                       }
          //                   }
          //               }
          //           }
          //           self.skill_current_state = _changed_states;
          //         });

          //         socket.on("ResultTriggerChanged", function(data){
          //           // console.log("####### ResultTriggerChanged");
          //           // Filter the event for the state changes related to this skill.
          //           for (var prop in data) {
          //               if (Object.prototype.hasOwnProperty.call(data, prop)) {
          //                   var el = data[prop];
          //                   if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
          //                       self.last_result_trigger_value = el.value.value;
          //                   }
          //               }
          //           }
          //         });
                  
          //         // Make transition
          //         if (self.description.skillModel.StateMachine){
          //           self.state = 12; // Call the skill directly
          //         }else{
          //           self.state = 130; // monitor result trigger before calling the skill
          //         }                  
          //       }
          //   }); 
          //   self.state = 110;               
          //   break;
          // case 110: // Wait for result of connect skill
          //   this.currentTimer=0;
          //   break;
          // case 130: // Subscribe to result trigger before calling the skill
          //   self.layerAttr("Skill_State", {text: 'State: Subscribing to result trigger.'});
          //   application_log.info("[" + self.NAME + "] Subscribing to result trigger.");
          //   skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.Invokation.ResultTrigger).then(function (resp_rt) {
          //     self.monitor_rt_call_results = resp_rt;
          //     if(resp_rt.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while monitoring result trigger!";
          //       application_log.error("[" + self.NAME + "] Error while monitoring result trigger: " + JSON.stringify(resp_rt.err));
          //     }else{
          //       if(resp_rt.results){
          //         self.initial_result_trigger_value = resp_rt.results.value.value;
          //       }else{
          //         self.initial_result_trigger_value = 0;
          //       }
          //       // Make transition to call the skill
          //       self.state = 12;
          //       application_log.info("[" + self.NAME + "] successfully monitoring the result trigger." );
          //     }
          //   });
          //   self.state = 135;
          //   break;
          // case 135: // Wait for call 
          //   break;
          // case 12: // Call the skill (Model with state machine)
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Starting'});
          //   application_log.info("[" + self.NAME + "] starting the skill." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.Start.parameters.inputArguments || [];
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0
          //     });
          //   }

          //   // Call the skill
          //   skillproxy.startSkill(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_start) {
          //     self.start_call_results = resp_start;
          //     if(resp_start.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while starting the skill!";
          //       application_log.error("[" + self.NAME + "] Error while starting the skill: " + JSON.stringify(resp_start.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _outputs = resp_start.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 2;
          //       self.layerAttr("Skill_State", {text: 'State: Executing'});
          //       application_log.info("[" + self.NAME + "] successfully executing the skill. Waiting for the skill to complete..." );
          //     }
          //   });

          //   this.state = 120;               
          //   break;
          // case 120: // Wait for the callback
          //   this.currentTimer=0;
          //   break;
          // case 2: // Wait for the  skill to be done
          //   self.layerAttr("Skill_State", {text: 'State: Executing'});
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('completed')){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }else{
          //     if(self.last_result_trigger_value > self.initial_result_trigger_value){
          //       // Make transition
          //       this.state = 3;
          //       this.layerAttr("Skill_State", {text: 'State: Completed'});
          //       application_log.info("[" + self.NAME + "] skill execution completed." );
          //     }
          //   }            
          //   break;
          // case 3: // Call Get results
          //   this.layerAttr("Circle_en",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#33DE09"});
          //   this.layerAttr("led_connected",{fill:"#33DE09"});
          //   this.layerAttr("circle",{fill:"#f0f0f0"});
          //   this.layerAttr("Skill_State", {text: 'State: Getting results'});
          //   application_log.info("[" + self.NAME + "] fetching the skill execution results..." );
          //   // sample the input values
          //   var _params = [];
          //   var _inputs = this.description.skillModel.Invokation.GetResult.parameters.inputArguments || [];
          //   var _offset = (this.description.skillModel.Invokation.Start.parameters.inputArguments || []).length;
          //   for (var index = 0; index < _inputs.length; index++) {              
          //     self.layerAttr("Circle_IN_" + (index + _offset) ,{fill:"#faa50a"});
          //     var el = _inputs[index];
          //     _params.push({
          //         dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
          //         arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
          //         value: this.getInputPort(index + 1 + _offset).getValue()?this.getInputPort(index + 1 + _offset).getValue():0
          //     });
          //   }

          //   // Call the emthod
          //   skillproxy.getResultsOfSkillCall(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_getResults) {
          //     self.get_results_call_results = resp_getResults;
          //     if(resp_getResults.err){
          //       // Make transition to err
          //       self.state = 6;
          //       self.err_msg = "Error while fetching the results of the skill!";
          //       application_log.error("[" + self.NAME + "] Error while fetching the results of the skill: " + JSON.stringify(resp_getResults.err));
          //     }else{
          //       // Set Synchronous Output
          //       var _offset = (self.description.skillModel.Invokation.Start.parameters.outputArguments || []).length;
          //       var _outputs = resp_getResults.results.outputArguments;
          //       for (var index = 0; index < _outputs.length; index++) {
          //         self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value);
          //         self.layerAttr("Circle_OUT_" + (index + _offset) ,{fill:"#faa50a"});
          //       }
          //       // Make transition
          //       self.state = 310;
          //       application_log.info("[" + self.NAME + "] results fetched sucessfully." );
          //     }
          //   });

          //   // Wait
          //   this.state = 300;
          //   break;
          // case 300: // Wait call getResults
          //   break;
          // case 310: // Wait until skill is ready again
          //   if (self.description.skillModel.StateMachine){              
          //     if(self.skill_current_state.includes('skill_ready')){
          //       // Make transition
          //       this.state = 4;
          //       this.layerAttr("Skill_State", {text: 'State: Done'});
          //       application_log.info("[" + self.NAME + "] skill execusion is done." );
          //     }
          //   }else{
          //     this.state = 4;
          //     this.layerAttr("Skill_State", {text: 'State: Done'});
          //     application_log.info("[" + self.NAME + "] skill execusion is done." );
          //   }            
          //   break;
          // case 4: // Set the done signal
          //   this.getOutputPort(0).setValue(true);

          //   this.layerAttr("Circle_done",{fill:"#faa50a"});
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   if(! this.getInputPort(0).getValue()){
          //       this.state = 5;
          //   }
          //   break;
          // case 5: // Reinitialize
          //   this.getOutputPort(0).setValue(false);
          //   for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          //     self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          //     self.getOutputPort(index).setValue(0);                
          //   }
          //   this.layerAttr("Circle_en",{fill:"#f0f0f0"});
          //   this.layerAttr("Circle_done",{fill:"#f0f0f0"});
          //   this.currentTimer=0;
          //   this.layerAttr("led_power",{fill:"#FF3C00"});
          //   this.layerAttr("led_connected",{fill:"#f0f0f0"});
          //   this.layerAttr("circle",{fill:"#ffffff"});
          //   this.state = 0;
          //   this.layerAttr("Skill_State", {text: 'State: Ready'});
          //   break;
          case 6: // Error
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("Skill_State", {text: 'State: Error'});
            this.layerAttr("circle",{fill:"#FFB19A"});
        }
        this.last_en_value = this.getOutputPort(0).getValue();
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);                
        }
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        //application_log.info("[" + self.NAME + "] skill execusion started." );
        application_log.error("[" + self.NAME + "] MTP-Service is not implemented." );
        this.state = 6; // ERROR
        this.last_en_value = 0;
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
        var self = this;
        this.currentTimer=0;
        this.layerAttr("led_power",{fill:"#FF3C00"});
        this.layerAttr("led_connected",{fill:"#f0f0f0"});
        this.layerAttr("Circle_en",{fill:"#f0f0f0"});
        this.layerAttr("Circle_done",{fill:"#f0f0f0"});
        this.layerAttr("circle",{fill:"#ffffff"});
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        application_log.info("[" + self.NAME + "] MTP-service execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);              
        }

        this.state = 6; // ERROR
        this.last_en_value = 0;
        
        socket.off("opcua_serverstatus", function(msg){
          // console.log("####### Serverstatus");
        });
        
        socket.off("SkillStatesChanged", function(msg){
          // console.log("####### StatesChanged");
        });
    },
    
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
            if( !(_this.constSignalValue === undefined || _this.constSignalValue === null)){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " + event.value + ": " + JSON.stringify(_this.constSignalValue)});
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
            _this.layerAttr("label", {text: "(Const) " + dataId + ": " + JSON.stringify(_this.constSignalValue)});
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
            if( !(dataValue === undefined || dataValue === null)){
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
            if( !(_this.constSignalValue === undefined || _this.constSignalValue === null)){
                return _this.constSignalValue;
            }else{
                /*
                if(context.signalPorts && context.signalPorts[dataId]){
                    if(context.signalPorts[dataId] instanceof draw2d.Port){
                        return context.signalPorts[dataId].getValue();
                    }
                    else {
                        return 0;
                    }
                }else {
                    return 0;
                }*/
                return 0;            
            }                
        };

        // first check if any object already create the signal context
        if(!context.signalPorts){
            context.signalPorts = { };
        }
        
        // check if my signal port is set         
        if(!(dataId in context.signalPorts)){
            context.signalPorts[dataId] = _this.getOutputPort(0);
        }

        // Set the label
        var _val = _this.getOutputPort(0).getValue();
        if( !(_val === undefined || _val === null)){
            if( !(_this.constSignalValue === undefined || _this.constSignalValue === null)){
                // Update the label with the value
                _this.layerAttr("label", {text: "(Const) " +dataId + ": " + JSON.stringify(_val)});
                _this.adjustWidth();
            }else{
                // Update the label with the value
                _this.layerAttr("label", {text: dataId + ": " + JSON.stringify(_val)});
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

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:69,height:22},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-1.8794202898459553, 48.86363636363637));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 69;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L69,0 L69,22 L0,22");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // outline
       shape = this.canvas.paper.path('M0 9.932800000005955L13.10158237711039 0.75L69 0.75L69 20.75L11.482077748871234 20.75Z');
       shape.attr({"stroke":"#41AAAA","stroke-width":1,"fill":"none","dasharray":null,"opacity":1});
       shape.data("name","outline");
       
       // label
       shape = this.canvas.paper.text(0,0,'Data_ID');
       shape.attr({"x":13.182800000005955,"y":11,"text-anchor":"start","text":"Data_ID","font-family":"\"Arial\"","font-size":12,"stroke":"#41AAAA","fill":"#41AAAA","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
                _this.layerAttr("label", {text: dataId + ": " + JSON.stringify(_this.signalPort.getValue())});
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


