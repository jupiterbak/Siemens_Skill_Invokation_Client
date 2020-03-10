// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var AssemblyModule01_localhost_4840_InsertSkill = CircuitFigure.extend({

   NAME: "AssemblyModule01_localhost_4840_InsertSkill",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:209.5,height:221},attr), setter, getter);
     var port;
     // Port_en
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.386634844868735, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_en");
     port.setMaxFanOut(20);
     // Port_done
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.37470167064438, 32.35294117647059));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_done");
     port.setMaxFanOut(20);
     // Port_IN_0
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 43.21266968325792));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_0");
     port.setMaxFanOut(20);
     // Port_IN_1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 49.09502262443439));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_1");
     port.setMaxFanOut(20);
     // Port_IN_2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 54.97737556561086));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_2");
     port.setMaxFanOut(20);
     // Port_IN_3
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 60.85972850678733));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_3");
     port.setMaxFanOut(20);
     // Port_IN_4
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 66.7420814479638));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_4");
     port.setMaxFanOut(20);
     // Port_IN_5
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 72.62443438914028));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_5");
     port.setMaxFanOut(20);
     // Port_IN_6
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.6252983293556085, 78.50678733031674));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_IN_6");
     port.setMaxFanOut(20);
     // Port_OUT_0
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.61336515513126, 43.21266968325792));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_OUT_0");
     port.setMaxFanOut(20);
     // Port_OUT_1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.61336515513126, 49.09502262443439));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_OUT_1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 209.5;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L209.5,0 L209.5,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.741887499999393,6Q4.741887499999393,0 10.741887499999393, 0L198.7418874999994,0Q204.7418874999994,0 204.7418874999994, 6L204.7418874999994,215Q204.7418874999994,221 198.7418874999994, 221L10.741887499999393,221Q4.741887499999393,221 4.741887499999393, 215L4.741887499999393,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'InsertSkill');
       shape.attr({"x":62.45282499999939,"y":13.5,"text-anchor":"start","text":"InsertSkill","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       shape = this.canvas.paper.text(0,0,'Position');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"Position","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // Circle_IN_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_1");
       
       // Label_IN_1
       shape = this.canvas.paper.text(0,0,'BuildingBlockTypeId');
       shape.attr({"x":13.5,"y":108.1171875,"text-anchor":"start","text":"BuildingBlockTypeId","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_1");
       
       // Circle_IN_2
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":121.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_2");
       
       // Label_IN_2
       shape = this.canvas.paper.text(0,0,'Orientation');
       shape.attr({"x":13.5,"y":121.1171875,"text-anchor":"start","text":"Orientation","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_2");
       
       // Circle_IN_3
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":134.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_3");
       
       // Label_IN_3
       shape = this.canvas.paper.text(0,0,'RFID');
       shape.attr({"x":13.5,"y":134.1171875,"text-anchor":"start","text":"RFID","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_3");
       
       // Circle_IN_4
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":147.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_4");
       
       // Label_IN_4
       shape = this.canvas.paper.text(0,0,'CurrentConfiguration_BuildingBlockTypeId');
       shape.attr({"x":13.5,"y":147.1171875,"text-anchor":"start","text":"CurrentConfiguration_BuildingBlockTypeId","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_4");
       
       // Circle_IN_5
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":160.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_5");
       
       // Label_IN_5
       shape = this.canvas.paper.text(0,0,'CurrentConfiguration_Orientation');
       shape.attr({"x":13.5,"y":160.1171875,"text-anchor":"start","text":"CurrentConfiguration_Orientation","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_5");
       
       // Circle_IN_6
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":173.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_6");
       
       // Label_IN_6
       shape = this.canvas.paper.text(0,0,'RFID');
       shape.attr({"x":13.5,"y":173.1171875,"text-anchor":"start","text":"RFID","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_6");
       
       // Circle_OUT_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_OUT_0");
       
       // Label_OUT_0
       shape = this.canvas.paper.text(0,0,'ErrorId');
       shape.attr({"x":146.5,"y":95.1171875,"text-anchor":"start","text":"ErrorId","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_OUT_0");
       
       // Circle_OUT_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_OUT_1");
       
       // Label_OUT_1
       shape = this.canvas.paper.text(0,0,'ErrorId');
       shape.attr({"x":146.5,"y":108.1171875,"text-anchor":"start","text":"ErrorId","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_OUT_1");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'localhost:4840');
       shape.attr({"x":48.5,"y":42,"text-anchor":"start","text":"localhost:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Stopped');
       shape.attr({"x":48.5,"y":61,"text-anchor":"start","text":"State: Stopped","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: ns=4;i=1027');
       shape.attr({"x":48.5,"y":78,"text-anchor":"start","text":"NodeID: ns=4;i=1027","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

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
AssemblyModule01_localhost_4840_InsertSkill = AssemblyModule01_localhost_4840_InsertSkill.extend({

   init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         this.attr({resizeable:false});
         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
         
         var _this= this;
         this.c_started=false;
         this.currentTimer=0;
    },
    
    calculate:function(){
        if(this.getInputPort(0).getValue()){
            if(this.c_started===false){
                this.currentTimer = (this.currentTimer + 1)% 300;
                if(this.currentTimer === 0){
                    this.c_started=true;
                }
            }else{
                this.layerAttr("Circle_done",{fill:"#faa50a"});
                this.getOutputPort(0).setValue(true);
            }
            this.layerAttr("Circle_en",{fill:"#faa50a"});
        }
        else{
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.getOutputPort(0).setValue(false);
            this.c_started=false;
            this.currentTimer=0;
        }
    },

    propagate: function(index, port){
        if(!port.getConnections().isEmpty()){
            var con = port.getConnections().first();
            var other = con.getSource()===port?con.getTarget():con.getSource()
            if(other instanceof draw2d.InputPort){
                
            }
            else {
                hardware.arduino.set(index,!!other.getValue())
            }
        }
    },
    
   /**
     *  Called if the simulation mode is starting
     **/
    onStart:function(){
        this.c_started=false;
        this.currentTimer=0;
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop:function(){
    },
    
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }
});