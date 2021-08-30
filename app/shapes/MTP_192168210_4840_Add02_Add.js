// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var MTP_192168210_4840_Add02_Add = CircuitFigure.extend({

   NAME: "MTP_192168210_4840_Add02_Add",

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
     port = this.addPort(new DecoratedLabeledOutputPort(), new draw2d.layout.locator.XYRelPortLocator(97.37470167064438, 32.35294117647059));
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
     // Port_OUT_0
     port = this.addPort(new DecoratedLabeledOutputPort(), new draw2d.layout.locator.XYRelPortLocator(97.61336515513126, 43.21266968325792));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#1C9BAB");
     port.setName("Port_OUT_0");
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
       shape = this.canvas.paper.text(0,0,'Add02_Add (V0)');
       shape.attr({"x":62.45282499999939,"y":13,"text-anchor":"start","text":"Add02_Add (V0)","font-family":"\"Arial\"","font-size":16,"stroke":"#FF0000","fill":"#00979D","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
       shape = this.canvas.paper.text(0,0,'IN2');
       shape.attr({"x":13.5,"y":95.1171875,"text-anchor":"start","text":"IN2","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_0");
       
       // Circle_IN_1
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":5.5,"cy":108.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_IN_1");
       
       // Label_IN_1
       shape = this.canvas.paper.text(0,0,'IN1');
       shape.attr({"x":13.5,"y":108.1171875,"text-anchor":"start","text":"IN1","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_IN_1");
       
       // Circle_OUT_0
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":5,"ry":5,"cx":204.5,"cy":95.5,"stroke":"#1B1B1B","stroke-width":1,"fill":"#F2F2F2","dasharray":null,"opacity":1});
       shape.data("name","Circle_OUT_0");
       
       // Label_OUT_0
       shape = this.canvas.paper.text(0,0,'OUT');
       shape.attr({"x":146.5,"y":95.1171875,"text-anchor":"start","text":"OUT","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label_OUT_0");
       
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
MTP_192168210_4840_Add02_Add = MTP_192168210_4840_Add02_Add.extend({

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
      for (var i = 0; i < o_ports; i++) {
        if(i > 0){
          this.getOutputPort(i).attr({
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
      this.service_current_state =null;
      this.service_current_procedure = null;
      this.service_procedure_req = null;
      this.service_command_en = null;

      this._params_nodes = [];
      this._params_values = [];

      this.initial_result_trigger_value = 0;
      this.last_result_trigger_value = 0;

      this.monitor_rt_call_results = null;
      this.start_call_results = null;
      this.get_results_call_results = null;

      for (var j = 0; j < this.getInputPorts().length -1 ; j++) {
        this.layerAttr("Circle_IN_" + (j + 1) ,{fill:"#f0f0f0"});              
      }
      for (var k = 0; k < this.getOutputPorts().length -1; k++) {
        this.layerAttr("Circle_OUT_" + (k + 1) ,{fill:"#f0f0f0"});              
      }
    },
    
    calculate:function(){
        var self = this;
        // STATE MACHINE
        switch (this.state) {
          case 0: // Stopped. waiting for enable signal
            this.getOutputPort(0).setValue(false);
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            for (var index = 0; index < this.getInputPorts().length - 1; index++) {
              self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
            }
            for (var i = 0; i < this.getOutputPorts().length - 1; i++) {
              self.layerAttr("Circle_OUT_" + (i + 1) ,{fill:"#f0f0f0"});
              self.getOutputPort(i).setValue(0);               
            }
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#f0f0f0"});
            this.layerAttr("circle",{fill:"#ffffff"});
            this.layerAttr("Skill_State", {text: 'State: Stopped'});
            if(this.getInputPort(0).getValue()){
                this.state = 10;
            }
            break;
          case 10: // Get The service description
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#FF3C00"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: Getting descr.'});
            application_log.info("[" + self.NAME + "] Getting mtp description.");
            // asynchronous call
            mtpproxy.getMTPServiceDescription(this.NAME).then(function (desc) {
                if (desc.mtp_service_descp){
                    self.description = desc.mtp_service_descp;
                }
                if(self.description){
                  // Make transition
                  self.state = 11;
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Could not fetch the skill description";
                  application_log.error("[" + self.NAME + "] Could not fetch the mtp service description.");
                }
            });
            this.state = 100;                       
            break;
          case 100: // Wait for the callback
            this.currentTimer=0;
            break;
          case 11: // Connect to the mtp service
            this.layerAttr("Skill_State", {text: 'State: Connecting'});
            this.layerAttr("led_connected",{fill:"#ffb300"}); // Orange
            application_log.info("[" + self.NAME + "] connecting to the OPCUA server...");
            mtpproxy.connectMTPService(self.description.ip, self.description.port).then(function (resp_con) {
                if(resp_con.err){
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while connecting to the mtp service!";
                  application_log.error("[" + self.NAME + "] Error while connecting to the OPCUA server: " + JSON.stringify(resp_con.err));
                }else{
                  self.layerAttr("Skill_State", {text: 'State: Connected'});
                  application_log.info("[" + self.NAME + "] connected to the OPCUA server.");
                  socket.on("serverstatus", function(msg){
                    // console.log("####### Serverstatus");
                    application_log.debug(msg.msg);
                  });
                  self.state = 12; // monitor the service                 
                }
            }); 
            self.state = 110;               
            break;
          case 110: // Wait for result of connect skill
            this.currentTimer=0;
            break;
          case 12: // Monitor the service
            self.layerAttr("Skill_State", {text: 'State: Monitoring the service.'});
            application_log.info("[" + self.NAME + "] Monitoring the service.");
            // 1. Extract the opc ua nodes to monitor from the description
            // [ "opMode", "CurrentState", "CurrentStrategy"
            var node2Monitor = [];
            if(self.description.serviceModel && self.description.serviceModel.Interface){
              node2Monitor = [
                // "StateCur"
                {
                  "ns_url": self.description.serviceModel.Interface.StateCur.Namespace,
                  "nid":  self.description.serviceModel.Interface.StateCur.Identifier,
                },
                // "ProcedureCur"
                {
                  "ns_url": self.description.serviceModel.Interface.ProcedureCur.Namespace,
                  "nid":  self.description.serviceModel.Interface.ProcedureCur.Identifier,
                },
                // "ProcedureReq"
                {
                  "ns_url": self.description.serviceModel.Interface.ProcedureReq.Namespace,
                  "nid":  self.description.serviceModel.Interface.ProcedureReq.Identifier,
                },
                // "CommandEn"
                {
                  "ns_url": self.description.serviceModel.Interface.CommandEn.Namespace,
                  "nid":  self.description.serviceModel.Interface.CommandEn.Identifier,
                }
              ];

              // Monitor also all output values. Therefore, add all ouputs nodeIds
              var _outputs = this.description.parameters.outputs || [];
              for (var k = 0; k < _outputs.length; k++) {
                var _o_elem = _outputs[k];
                node2Monitor.push({
                  "ns_url": _o_elem.Interface.V.nodeId.Namespace,
                  "nid":  _o_elem.Interface.V.nodeId.Identifier,
                });
              }
            }

            // Adjust the websocket event filtering
            socket.on("monitorMTPServiceChanged", function (data) {
              if(data && data.length >= 1){
                var _cur_state_evt = data[0];
                if(("" + _cur_state_evt.skill) === self.skill.name){
                  if(data && data.length >= 4){                    
                    // Check if the event is intended for this service                    
                      self.service_current_state = data[0].value.value;
                      self.service_current_procedure = data[1].value.value;
                      self.service_procedure_req = data[2].value.value;
                      self.service_command_en = data[3].value.value;                                        
                  }
                  var _outputs_sio = this.description.parameters.outputs || [];
                  if(data && data.length >= 4 + _outputs_sio.length){
                    for (var k = 0; k < _outputs_sio.length; k++) {
                      self.getOutputPort(1 + k).setValue(data[k + 4].value.value || 0);
                    }
                  }
                }
              }
            });

            // monitoring starten
            mtpproxy.monitorService(self.description.ip, self.description.port, self.skill.name, node2Monitor).then(function (resp_moni) {
              if(resp_moni.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while monitoing to the mtp service!";
                application_log.error("[" + self.NAME + "] Error while monitoring to the MTP service.");
              }else{
                // Make transition to wait until the service is ready.
                self.state = 125;
                application_log.info("[" + self.NAME + "] successfully monitoring the service." );
              }
            });

            self.state = 120;
            break;           
          case 120: // Wait for service monitoring 
            break;
          case 125: // Wait until the service is ready
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            self.layerAttr("Skill_State", {text: 'State: ' + self.service_current_state});
            if(self.service_current_state === 16){ // MTP "Idle" state
              self.state = 13; // Write the request parameters to initiate the service call
              this.layerAttr("Skill_State", {text: 'State: Idle'});
            }
            break;
          case 13: // Write all request parameters
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            self.layerAttr("Skill_State", {text: 'State: Writing Params.'});
            application_log.info("[" + self.NAME + "] Writing the procedure parameter.");

            // 1. Extract the opc ua nodes to write the request parameters from the description
            // [ "opMode", "CurrentState", "CurrentStrategy"
            self._params_nodes = [];
            self._params_values = [];
            var _inputs = this.description.parameters.inputs || [];
            for (var i = 0; i < _inputs.length; i++) {              
              self.layerAttr("Circle_IN_" + (i) ,{fill:"#faa50a"});
              var el = _inputs[i];
              // Push the node VExt
              self._params_nodes.push({
                "ns_url": el.Interface.VExt.nodeId.Namespace,
                "nid":  el.Interface.VExt.nodeId.Identifier,
              });
              // Push the value of VExt
              self._params_values.push(this.getInputPort(i + 1).getValue()?this.getInputPort(i + 1).getValue():0);
              // Push the node Sync
              self._params_nodes.push({
                "ns_url": el.Interface.Sync.nodeId.Namespace,
                "nid":  el.Interface.Sync.nodeId.Identifier,
              });
              // Push the value of Sync
              self._params_values.push(true);              
            }

            // Start writing the request parameters
            mtpproxy.writeRequestParameters(self.description.ip, self.description.port, self.skill.name, self._params_nodes,self._params_values).then(function (resp_wr_param) {
              if(resp_wr_param.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while writing the request parameters to the mtp service!";
                application_log.error("[" + self.NAME + "] Error while monitoring to the MTP service.");
              }else{
                // Check if all variable have been written successfully
                var all_done = true;
                if(resp_wr_param.results){
                  for (var i = 0; i < resp_wr_param.results.length; i++) {
                    var _res = resp_wr_param.results[i];
                    if(_res.value !== 0){
                      all_done = false;
                    }
                  }
                }

                // If writting the parameters was not suceesfull
                if(all_done === true){
                  // Make transition to write the request parameters
                  self.state = 14;
                  application_log.info("[" + self.NAME + "] successfully wrote the service parameters." );
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while writing the request parameters to the mtp service!";
                  application_log.error("[" + self.NAME + "] Error while monitoring to the MTP service.");
                }                
              }
            });

            self.state = 130;
            break;
          case 130: // Wait write parameter
            break;
          case 14: // Check if the set points have been accepted by the service
            this.layerAttr("Circle_en",{fill:"#33DE09"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            self.layerAttr("Skill_State", {text: 'State: Reading Setpoints.'});
            application_log.info("[" + self.NAME + "] Reading the procedure parameter set points.");

            // 1. Extract the opc ua nodes to write the request parameters from the description
            // [ "opMode", "CurrentState", "CurrentStrategy"
            var _setpoints_nodes = []; 
                       
            var _setpoints_inputs = this.description.parameters.inputs || [];
            for (var l = 0; l < _setpoints_inputs.length; l++) {              
              self.layerAttr("Circle_IN_" + (l) ,{fill:"#faa50a"});
              var _setpoints_el = _setpoints_inputs[l];
              // Push the node VExt
              _setpoints_nodes.push({
                "ns_url": _setpoints_el.Interface.VOut.nodeId.Namespace,
                "nid":  _setpoints_el.Interface.VOut.nodeId.Identifier,
              });            
            }

            // Start writing the request parameters
            mtpproxy.readResultParameters(self.description.ip, self.description.port, self.skill.name, _setpoints_nodes).then(function (resp_read) {
              if(resp_read.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while reading the request parameters set points!";
                application_log.error("[" + self.NAME + "] Error while reading the request parameters set points.");
              }else{
                // Check if all variable have been read successfully
                // Check if the set points are equals to the parameter values
                var all_accepted = true;
                if(resp_read.results){
                  for (var i = 0; i < resp_read.results.length; i++) {
                    var _res = resp_read.results[i];
                    if((_res.statusCode.value !== 0) || (_res.value.value !== self._params_values[2*i]) ){
                      all_accepted = false;
                    }
                  }
                }

                // If all values have not been acepted, then goto error
                if(all_accepted === true){
                  // Make transition to call the service
                  self.state = 15;
                  application_log.info("[" + self.NAME + "] All the service parameters have been accepted." );
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error: The service parameter have not been accepted!";
                  application_log.error("[" + self.NAME + "] Error: The service parameter have not been accepted.");
                }                
              }
            });
            self.state = 140;
            break;
          case 140: // Wait for read request set points
            break;
          case 15: // Start the execution of the procedure
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: Starting'});
            application_log.info("[" + self.NAME + "] calling the service." );
            self.state = 151;
            break;
          case 151: // Check if execution is allowed
            // TODO: Check if command_en is allowed
            //if(self.service_command_en){
              self.state = 152;
            //}            
            break;
          case 152: // Write the procedure number to call
            var _call_prod_nodes = [];
            var _call_prod_values = [];
            if(self.description.serviceModel && self.description.serviceModel.Interface){
              _call_prod_nodes = [
                // "ProcedureExt"
                {
                  "ns_url": self.description.serviceModel.Interface.ProcedureExt.Namespace,
                  "nid":  self.description.serviceModel.Interface.ProcedureExt.Identifier,
                }];
                _call_prod_values = [self.description.skill.ProcedureID]; // Start cmd
            }

            // Start writting the procedure
            mtpproxy.writeRequestParameters(self.description.ip, self.description.port, self.skill.name, _call_prod_nodes,_call_prod_values).then(function (resp_proc_call) {
              if(resp_proc_call.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while writing the requested procedure number!";
                application_log.error("[" + self.NAME + "] Error while writing the requested procedure number.");
              }else{
                // Check if all variable have been written successfully
                var all_proc_done = true;
                if(resp_proc_call.results){
                  for (var i = 0; i < resp_proc_call.results.length; i++) {
                    var _res = resp_proc_call.results[i];
                    if(_res.value !== 0){
                      all_proc_done = false;
                    }
                  }
                }

                // If writting the parameters was not suceesfull
                if(all_proc_done === true){
                  // Make transition to wait until the procedure request is accepted
                  self.state = 153;
                  application_log.info("[" + self.NAME + "] successfully wrote the requested procedure number." ); 
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while writing the requested procedure number!";
                  application_log.error("[" + self.NAME + "] Error while writing the requested procedure number.");
                }                               
              }
            });
            self.state = 1520;
            break;
          case 1520: // Wait writting the procedure number
            break;
          case 153: // Wait until procedure request is accepted.
            if(( "" + self.service_procedure_req) === self.description.skill.ProcedureID ){
              self.state = 155;
            }
            break;
          case 155: // Write the command external
            var _call_nodes = [];
            var _call_values = [];
            if(self.description.serviceModel && self.description.serviceModel.Interface){
              _call_nodes = [
                // "CommandExt"
                {
                  "ns_url": self.description.serviceModel.Interface.CommandExt.Namespace,
                  "nid":  self.description.serviceModel.Interface.CommandExt.Identifier,
                }];
                _call_values = [4]; // Start cmd
            }

            // Start Executing the service by writing the "CommandExt" value
            mtpproxy.callService(self.description.ip, self.description.port, self.skill.name, _call_nodes,_call_values).then(function (resp_call) {
              if(resp_call.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while calling the mtp service!";
                application_log.error("[" + self.NAME + "] Error while calling the mtp service.");
              }else{
                // Check if all variable have been written successfully
                var all_done = true;
                if(resp_call.results){
                  for (var i = 0; i < resp_call.results.length; i++) {
                    var _res = resp_call.results[i];
                    if(_res.value !== 0){
                      all_done = false;
                    }
                  }
                }

                // If writting the parameters was not suceesfull
                if(all_done === true){
                  // Make transition to wait for the complete or completing state
                  if("" + self.description.skill.IsSelfCompleting === "True"){
                    self.state = 25; // Wait for complete
                  }else{
                    self.state = 21; // Wait for completing
                  }
                  
                  application_log.info("[" + self.NAME + "] successfully called the mtp service." ); 
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while calling the mtp service!";
                  application_log.error("[" + self.NAME + "] Error while calling the mtp service.");
                }                               
              }
            });  
            self.state = 1550;           
            break;
          case 1550: // Wait for the start execution callback
            this.currentTimer=new Date();
            break;
          case 21: // Wait completing 
            self.layerAttr("Skill_State", {text: 'State: Executing'});
            if(self.service_current_state === 65536 ){ // Completing
              self.state = 22; // request the complete state
              this.layerAttr("Skill_State", {text: 'State: Completing'});
              application_log.info("[" + self.NAME + "] mtp service execution is completing.");
            }
            break;
          case 22: // request the complete state
            var _call_compl_nodes = [];
            var _call_compl_values = [];
            if(self.description.serviceModel && self.description.serviceModel.Interface){
              _call_compl_nodes = [
                // "CommandExt"
                {
                  "ns_url": self.description.serviceModel.Interface.CommandExt.Namespace,
                  "nid":  self.description.serviceModel.Interface.CommandExt.Identifier,
                }];
                _call_compl_values = [1024]; // Cmd "Complete"
            }

            // Start Executing the cmd by writing the "CommandExt" value
            mtpproxy.callService(self.description.ip, self.description.port, self.skill.name, _call_compl_nodes,_call_compl_values).then(function (resp_compl_call) {
              if(resp_compl_call.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while requesting the 'Complete' state!";
                application_log.error("[" + self.NAME + "] Error while requesting the 'Complete' state.");
              }else{
                // Check if all variable have been written successfully
                var all_compl_done = true;
                if(resp_compl_call.results){
                  for (var i = 0; i < resp_compl_call.results.length; i++) {
                    var _res = resp_compl_call.results[i];
                    if(_res.value !== 0){
                      all_compl_done = false;
                    }
                  }
                }

                // If writting the parameters was not suceesfull
                if(all_compl_done === true){
                  // Make transition to wait for the complete state                  
                  self.state = 25; // Wait for completing            
                  application_log.info("[" + self.NAME + "] successfully crequested the 'Complete' state." ); 
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while requesting the 'Complete' state!";
                  application_log.error("[" + self.NAME + "] Error while requesting the 'Complete' state.");
                }                               
              }
            });  
            self.state = 220; 
            break;
          case 220: // Wait for CommandExt "Completing" request
            break;
          case 25: // Wait for "Complete" state
            if(self.service_current_state === 131072){ // Complete
              self.state = 3; // Stat resetting the service
              this.layerAttr("Skill_State", {text: 'State: Completed'});
              application_log.info("[" + self.NAME + "] mtp service execution completed. It took: "+ ((new Date().getTime()-self.currentTimer.getTime())/ 1000) + " s");
            }
            break;
          case 3: // reset the service
            this.layerAttr("Circle_en",{fill:"#faa50a"});
            this.layerAttr("led_power",{fill:"#33DE09"});
            this.layerAttr("led_connected",{fill:"#33DE09"});
            this.layerAttr("circle",{fill:"#f0f0f0"});
            this.layerAttr("Skill_State", {text: 'State: reseting'});
            application_log.info("[" + self.NAME + "] resetting the service." );

            var _reset_nodes = [];
            var _reset_values = [];
            if(self.description.serviceModel && self.description.serviceModel.Interface){
              _reset_nodes = [
                // "CommandExt"
                {
                  "ns_url": self.description.serviceModel.Interface.CommandExt.Namespace,
                  "nid":  self.description.serviceModel.Interface.CommandExt.Identifier,
                }];
                _reset_values = [2]; // reset
            }

            // Start resetting the service by writing the "CommandExt" value
            mtpproxy.callService(self.description.ip, self.description.port, self.skill.name, _reset_nodes,_reset_values).then(function (resp_call) {
              if(resp_call.err){
                // Make transition to err
                self.state = 6;
                self.err_msg = "Error while resetting the mtp service!";
                application_log.error("[" + self.NAME + "] Error while resetting the mtp service.");
              }else{
                // Check if all variable have been written successfully
                var all_done = true;
                if(resp_call.results){
                  for (var i = 0; i < resp_call.results.length; i++) {
                    var _res = resp_call.results[i];
                    if(_res.value !== 0){
                      all_done = false;
                    }
                  }
                }

                // If writting the parameters was not suceesfull
                if(all_done === true){
                  // Make transition to write the request parameters
                  self.state = 310;
                  application_log.info("[" + self.NAME + "] successfully resetting the mtp service." );
                }else{
                  // Make transition to err
                  self.state = 6;
                  self.err_msg = "Error while resetting the mtp service!";
                  application_log.error("[" + self.NAME + "] Error while resetting the mtp service.");
                }                
              }
            });
            this.state = 300;
            break;
          case 300: // Wait call for resseting
            break;
          case 310: // Wait until the service is ready again
            if(self.service_current_state === 16){ // Idle
              this.layerAttr("Skill_State", {text: 'State: Idle'});
              application_log.info("[" + self.NAME + "] service execusion is done. service is ready." );
              this.state = 4;
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
            this.getOutputPort(0).setValue(false); // Done signal
            for (var l = 0; l < this.getOutputPorts().length - 1; l++) {
              self.layerAttr("Circle_OUT_" + (l + 1) ,{fill:"#f0f0f0"});
              self.getOutputPort(l).setValue(0);                
            }
            this.layerAttr("Circle_en",{fill:"#f0f0f0"});
            this.layerAttr("Circle_done",{fill:"#f0f0f0"});
            this.currentTimer=0;
            this.layerAttr("led_power",{fill:"#FF3C00"});
            this.layerAttr("led_connected",{fill:"#f0f0f0"});
            this.layerAttr("circle",{fill:"#ffffff"});
            this.state = 0; // Stopped
            this.layerAttr("Skill_State", {text: 'State: Reinitialze'});
            break;
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
        for (var h = 0; h < this.getOutputPorts().length - 1; h++) {
          self.layerAttr("Circle_OUT_" + (h + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(h).setValue(0);                
        }
        this.layerAttr("Skill_State", {text: 'State: not connected'});
        application_log.info("[" + self.NAME + "] MTP-Service execusion started." );
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
        application_log.info("[" + self.NAME + "] MTP-service execusion stopped." );
        for (var index = 0; index < this.getInputPorts().length - 1; index++) {
          self.layerAttr("Circle_IN_" + (index + 1) ,{fill:"#f0f0f0"});              
        }
        for (var j = 0; j < this.getOutputPorts().length - 1; j++) {
          self.layerAttr("Circle_OUT_" + (j + 1) ,{fill:"#f0f0f0"});
          self.getOutputPort(j).setValue(0);              
        }

        this.state = 5; // STOPPED
        this.last_en_value = 0;
        
        socket.off("serverstatus", function(msg){
          // console.log("####### Serverstatus");
        });
        
        socket.off("monitorMTPServiceChanged", function(msg){
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