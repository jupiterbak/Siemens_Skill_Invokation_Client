// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var Module01_localhost_4840_InsertSkill = CircuitFigure.extend({

   NAME: "Module01_localhost_4840_InsertSkill",

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
       shape = this.canvas.paper.text(0,0,'InsertSkill (V3)');
       shape.attr({"x":62.45282499999939,"y":13.5,"text-anchor":"start","text":"InsertSkill (V3)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       
       // led_connected
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":34.11443749999853,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FF3C00","dasharray":null,"opacity":1});
       shape.data("name","led_connected");
       
       // led_power
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":6.090499999999338,"ry":6.090499999999338,"cx":17.297074999999495,"cy":11.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#33DE09","dasharray":null,"opacity":1});
       shape.data("name","led_power");
       
       // Skill_IP
       shape = this.canvas.paper.text(0,0,'localhost:4840');
       shape.attr({"x":48.5,"y":42,"text-anchor":"start","text":"localhost:4840","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_IP");
       
       // Skill_State
       shape = this.canvas.paper.text(0,0,'State: Not Connected');
       shape.attr({"x":48.5,"y":61,"text-anchor":"start","text":"State: Not Connected","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_State");
       
       // Skill_NodeID
       shape = this.canvas.paper.text(0,0,'NodeID: ns=4;i=10…');
       shape.attr({"x":48.5,"y":78,"text-anchor":"start","text":"NodeID: ns=4;i=10…","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Skill_NodeID");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Jupiter Bakakeu
 *
 *
 */
Module01_localhost_4840_InsertSkill = Module01_localhost_4840_InsertSkill.extend({

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
          case 0: // STOPPED
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            for (var index = 0; index < this.getInputPorts().length - 1; index++) {
              self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
            }
            for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
              self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
              self.getOutputPort(index).setValue(0);               
            }
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#f0f0f0"});
            this.layerAttr("circle",{fill:"#ffffff"});
            this.layerAttr("Skill_State", {text: 'State: not connected'});
            if(this.getInputPort(0).getValue()){
                this.state = 10;
            }
            break;
          case 10: // Get The skill description
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
            application_log.info("[" + self.NAME + "] Getting skill description.");
            skillproxy.getSkillDescription(this.NAME).then(function (desc) {
                if (desc.skill_descp){
                    self.description = desc.skill_descp;
                }
                if(self.description){
                  // Make transition
                  self.state = 11;
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Could not fetch the skill description";
                  application_log.error("[" + self.NAME + "] Could not fetch the skill description.");
                }
            });
            this.state = 100;                       
            break;
          case 100: // Wait for the callback
            this.currentTimer=0;
            break;
          case 11: // Connect to the skill
            this.layerAttr("Skill_State", {text: 'State: Connecting'});
            this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
            application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
            skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {
                if(resp_con.err){
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while connecting to the skill!";
                  application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
                }else{
                  self.layerAttr("Skill_State", {text: 'State: Connected'});
                  application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
                  socket.on("opcua_serverstatus", function(msg){
                    // console.log("####### Serverstatus");
                  });
                  
                  socket.on("SkillStatesChanged", function(data){
                    // console.log("####### StatesChanged");
                    // Filter the event for the state changes related to this skill.
                    var _changed_states = [];
                    for (var prop in data) {
                        if (Object.prototype.hasOwnProperty.call(data, prop)) {
                            var el = data[prop];
                            if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
                                var candidates = skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) { return item.id === el.state.value});
                                // filter with the nodeId
                                if (candidates.length == 0) {
                                    candidates =skillproxy.getSkillStateConfig().nodeDataArray.filter(function(item) {
                                        var src = el.state.value;
                                        var target = item.nid;
                                        var rslt = ("" + src).indexOf(target);
                                        return rslt >= 0;
                                    });
                                }
                                if (candidates.length > 0) {
                                    _changed_states.push(candidates[0].id);
                                }
                            }
                        }
                    }
                    self.skill_current_state = _changed_states;
                  });

                  socket.on("ResultTriggerChanged", function(data){
                    // console.log("####### ResultTriggerChanged");
                    // Filter the event for the state changes related to this skill.
                    for (var prop in data) {
                        if (Object.prototype.hasOwnProperty.call(data, prop)) {
                            var el = data[prop];
                            if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {
                                self.last_result_trigger_value = el.value.value;
                            }
                        }
                    }
                  });
                  
                  // Make transition
                  if (self.description.skillModel.StateMachine){
                    self.state = 12; // Call the skill directly
                  }else{
                    self.state = 130; // monitor result trigger before calling the skill
                  }                  
                }
            }); 
            self.state = 110;               
            break;
          case 110: // Wait for result of connect skill
            this.currentTimer=0;
            break;
          case 130: // Subscribe to result trigger before calling the skill
            self.layerAttr("Skill_State", {text: 'State: Subscribing to result trigger.'});
            application_log.info("[" + self.NAME + "] Subscribing to result trigger.");
            skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.Invokation.ResultTrigger).then(function (resp_rt) {
              self.monitor_rt_call_results = resp_rt;
              if(resp_rt.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while monitoring result trigger!";
                application_log.error("[" + self.NAME + "] Error while monitoring result trigger: " + JSON.stringify(resp_rt.err));
              }else{
                if(resp_rt.results){
                  self.initial_result_trigger_value = resp_rt.results.value.value;
                }else{
                  self.initial_result_trigger_value = 0;
                }
                // Make transition to call the skill
                self.state = 12;
                application_log.info("[" + self.NAME + "] successfully monitoring the result trigger." );
              }
            });
            self.state = 135;
            break;
          case 135: // Wait for call 
            break;
          case 12: // Call the skill (Model with state machine)
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: Starting'});
            application_log.info("[" + self.NAME + "] starting the skill." );
            // sample the input values
            var _params = [];
            var _inputs = this.description.skillModel.Invokation.Start.parameters.inputArguments || [];
            for (var index = 0; index < _inputs.length; index++) {              
              self.layerAttr("Circle_IN_" + (index) ,{fill:"#faa50a"});
              var el = _inputs[index];
              _params.push({
                  dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
                  arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
                  value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0
              });
            }

            // Call the skill
            skillproxy.startSkill(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_start) {
              self.start_call_results = resp_start;
              if(resp_start.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while starting the skill!";
                application_log.error("[" + self.NAME + "] Error while starting the skill: " + JSON.stringify(resp_start.err));
              }else{
                // Set Synchronous Output
                var _outputs = resp_start.results.outputArguments;
                for (var index = 0; index < _outputs.length; index++) {
                  self.getOutputPort(index + 1).setValue(_outputs[index].value);
                  self.layerAttr("Circle_OUT_" + (index) ,{fill:"#faa50a"});
                }
                // Make transition
                self.state = 2;
                self.layerAttr("Skill_State", {text: 'State: Executing'});
                application_log.info("[" + self.NAME + "] successfully executing the skill. Waiting for the skill to complete..." );
              }
            });

            this.state = 120;               
            break;
          case 120: // Wait for the callback
            this.currentTimer=0;
            break;
          case 2: // Wait for the  skill to be done
            self.layerAttr("Skill_State", {text: 'State: Executing'});
            if (self.description.skillModel.StateMachine){              
              if(self.skill_current_state.includes('completed')){
                // Make transition
                this.state = 3;
                this.layerAttr("Skill_State", {text: 'State: Completed'});
                application_log.info("[" + self.NAME + "] skill execution completed." );
              }
            }else{
              if(self.last_result_trigger_value > self.initial_result_trigger_value){
                // Make transition
                this.state = 3;
                this.layerAttr("Skill_State", {text: 'State: Completed'});
                application_log.info("[" + self.NAME + "] skill execution completed." );
              }
            }            
            break;
          case 3: // Call Get results
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: Getting results'});
            application_log.info("[" + self.NAME + "] fetching the skill execution results..." );
            // sample the input values
            var _params = [];
            var _inputs = this.description.skillModel.Invokation.GetResult.parameters.inputArguments || [];
            var _offset = (this.description.skillModel.Invokation.Start.parameters.inputArguments || []).length;
            for (var index = 0; index < _inputs.length; index++) {              
              self.layerAttr("Circle_IN_" + (index + _offset) ,{fill:"#faa50a"});
              var el = _inputs[index];
              _params.push({
                  dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25
                  arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02
                  value: this.getInputPort(index + 1 + _offset).getValue()?this.getInputPort(index + 1 + _offset).getValue():0
              });
            }

            // Call the emthod
            skillproxy.getResultsOfSkillCall(self.description.ip, self.description.port, self.description.skill.name, _params).then(function (resp_getResults) {
              self.get_results_call_results = resp_getResults;
              if(resp_getResults.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while fetching the results of the skill!";
                application_log.error("[" + self.NAME + "] Error while fetching the results of the skill: " + JSON.stringify(resp_getResults.err));
              }else{
                // Set Synchronous Output
                var _offset = (self.start_call_results.results.outputArguments || []).length;
                var _outputs = resp_getResults.results.outputArguments;
                for (var index = 0; index < _outputs.length; index++) {
                  self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value);
                  self.layerAttr("Circle_OUT_" + (index + _offset) ,{fill:"#faa50a"});
                }
                // Make transition
                self.state = 310;
                application_log.info("[" + self.NAME + "] results fetched sucessfully." );
              }
            });

            // Wait
            this.state = 300;
            break;
          case 300: // Wait call getResults
            break;
          case 310: // Wait until skill is ready again
            if (self.description.skillModel.StateMachine){              
              if(self.skill_current_state.includes('skill_ready')){
                // Make transition
                this.state = 4;
                this.layerAttr("Skill_State", {text: 'State: Done'});
                application_log.info("[" + self.NAME + "] skill execusion is done." );
              }
            }else{
              this.state = 4;
              this.layerAttr("Skill_State", {text: 'State: Done'});
              application_log.info("[" + self.NAME + "] skill execusion is done." );
            }            
            break;
          case 4: // Set the done signal
            this.getOutputPort(0).setValue(true);

            this.layerAttr("Circle_done",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#f0f0f0"});
            this.layerAttr("circle",{fill:"#ffffff"});
            if(! this.getInputPort(0).getValue()){
                this.state = 5;
            }
            break;
          case 5: // Reinitialize
            this.getOutputPort(0).setValue(false);
            for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
              self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
              self.getOutputPort(index).setValue(0);                
            }
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#f0f0f0"});
            this.layerAttr("circle",{fill:"#ffffff"});
            this.state = 0;
            this.layerAttr("Skill_State", {text: 'State: Ready'});
            break;
          case 6: // Error
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("Skill_State", {text: 'State: Error'});
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
        application_log.info("[" + self.NAME + "] skill execusion started." );
        this.state = 5; // STOPPED
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
        application_log.info("[" + self.NAME + "] skill execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {
          self.layerAttr("Circle_OUT_" + (index + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(index).setValue(0);              
        }

        this.state = 5; // STOPPED
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