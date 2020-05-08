// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var Skill = CircuitFigure.extend({

   NAME: "Skill",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:208.51462500000162,height:221},attr), setter, getter);
     var port;
     // port_d2
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 32.35294117647059));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d2");
     port.setMaxFanOut(20);
     // port_d3
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 38.18065610859727));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d3");
     port.setMaxFanOut(20);
     // port_d4
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 44.11764705882353));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d4");
     port.setMaxFanOut(20);
     // port_d5
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 50));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d5");
     port.setMaxFanOut(20);
     // port_d6
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 56.30036199094921));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d6");
     port.setMaxFanOut(20);
     // port_d7
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 61.76470588235294));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d7");
     port.setMaxFanOut(20);
     // port_d8
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 67.6470588235294));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d8");
     port.setMaxFanOut(20);
     // port_d9
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 73.52941176470588));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d9");
     port.setMaxFanOut(20);
     // port_d10
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 79.41176470588235));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d10");
     port.setMaxFanOut(20);
     // port_d11
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 85.23947963800903));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d11");
     port.setMaxFanOut(20);
     // port_d12
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(2.397913335815155, 91.17647058823529));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d12");
     port.setMaxFanOut(20);
     // port_d13
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(97.60208666418484, 91.17647058823529));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("port_d13");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 208.51462500000162;
      this.originalHeight= 221;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L208.51462500000162,0 L208.51462500000162,221 L0,221");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // circle
       shape = this.canvas.paper.path('M4.499200000000201,6Q4.499200000000201,0 10.4992000000002, 0L198.4992000000002,0Q204.4992000000002,0 204.4992000000002, 6L204.4992000000002,215Q204.4992000000002,221 198.4992000000002, 221L10.4992000000002,221Q4.499200000000201,221 4.499200000000201, 215L4.499200000000201,6');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","circle");
       
       // Name
       shape = this.canvas.paper.text(0,0,'Skill Name');
       shape.attr({"x":62.2101375000002,"y":38,"text-anchor":"start","text":"Skill Name","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Name");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":84.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":97.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":110.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":123.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":136.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":149.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":162.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":175.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":188.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":203.51462500000162,"cy":201.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":201.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":188.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":175.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":162.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":149.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":136.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":124.42379999999775,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":110.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":97.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":84.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5,"cy":71.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D12');
       shape.attr({"x":11.5,"y":202.1171875,"text-anchor":"start","text":"D12","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D10');
       shape.attr({"x":12,"y":175.79081250000036,"text-anchor":"start","text":"D10","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D9');
       shape.attr({"x":11.663762500000303,"y":162.5,"text-anchor":"start","text":"D9","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D8');
       shape.attr({"x":12,"y":149.83881250000104,"text-anchor":"start","text":"D8","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D7');
       shape.attr({"x":12,"y":136.86281250000138,"text-anchor":"start","text":"D7","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D6');
       shape.attr({"x":12,"y":124.6171875,"text-anchor":"start","text":"D6","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D5');
       shape.attr({"x":12,"y":111.1171875,"text-anchor":"start","text":"D5","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D4');
       shape.attr({"x":12,"y":98.1199875000002,"text-anchor":"start","text":"D4","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D3');
       shape.attr({"x":12,"y":85.02048749999994,"text-anchor":"start","text":"D3","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D2');
       shape.attr({"x":12,"y":72.04448750000029,"text-anchor":"start","text":"D2","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D11');
       shape.attr({"x":12,"y":188.734375,"text-anchor":"start","text":"D11","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'D13');
       shape.attr({"x":174.90659999999843,"y":201.5,"text-anchor":"start","text":"D13","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":33.87174999999934,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.054387500000303,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'000.000.000.000:4840');
       shape.attr({"x":47.8195125000002,"y":70.62924999999996,"text-anchor":"start","text":"000.000.000.000:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Stopped');
       shape.attr({"x":49.8195125000002,"y":90.09049999999934,"text-anchor":"start","text":"State: Stopped","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: ns=4;i=1090');
       shape.attr({"x":49.8195125000002,"y":108,"text-anchor":"start","text":"NodeID: ns=4;i=1090","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
Skill = Skill.extend({

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
           this.layerAttr("led_power",{fill:"#33DE09"});
           this.layerAttr("led_connected",{fill:"#f0f0f0"});
       }
       else{
           this.layerAttr("Circle_en",{fill:"#f0f0f0"});
           this.layerAttr("Circle_done",{fill:"#f0f0f0"});
           this.getOutputPort(0).setValue(false);
           this.c_started=false;
           this.currentTimer=0;
           this.layerAttr("led_power",{fill:"#FF3C00"});
           this.layerAttr("led_connected",{fill:"#f0f0f0"});
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
       this.layerAttr("led_power",{fill:"#f0f0f0"});
       this.layerAttr("led_connected",{fill:"#f0f0f0"});
   },

   /**
    *  Called if the simulation mode is stopping
    **/
   onStop:function(){
       this.layerAttr("led_power",{fill:"#f0f0f0"});
       this.layerAttr("led_connected",{fill:"#f0f0f0"});
   },
   
   getRequiredHardware: function(){
     return {
       raspi: false,
       arduino: false
     }
   }
    
});