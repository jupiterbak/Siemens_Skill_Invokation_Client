var json=[
  {
    "type": "shape_designer.figure.PolyRect",
    "id": "3f3cebb6-442a-5a78-be8e-ee14a564a9bc",
    "x": 7900.241887499999,
    "y": 7889.5,
    "width": 200,
    "height": 159,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\r\n * Jupiter Bakakeu\r\n *\r\n *\r\n */\r\ntestShape = testShape.extend({\r\n\r\n    init: function(attr, setter, getter){\r\n      this._super(attr, setter, getter);\r\n\r\n      this.attr({resizeable:false});\r\n      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\r\n\r\n      // get the skill description from the backend.\r\n      this.description = null;       \r\n      \r\n      var _this= this;\r\n      this.currentTimer=0;\r\n      this.state = 5; // STOPPED\r\n      this.last_en_value = 0;\r\n      this.err_msg = \"\";\r\n      this.skill_current_state = \"Ready\";\r\n\r\n      this.initial_result_trigger_value = 0;\r\n      this.last_result_trigger_value = 0;\r\n\r\n      this.monitor_rt_call_results = null;\r\n      this.start_call_results = null;\r\n      this.get_results_call_results = null;\r\n\r\n      for (var index = 0; index < this.getInputPorts().length -1 ; index++) {\r\n        this.layerAttr(\"Circle_IN_\" + (index + 1) ,{fill:\"#f0f0f0\"});              \r\n      }\r\n      for (var index = 0; index < this.getOutputPorts().length -1; index++) {\r\n        this.layerAttr(\"Circle_OUT_\" + (index + 1) ,{fill:\"#f0f0f0\"});              \r\n      }\r\n    },\r\n    \r\n    calculate:function(){\r\n        var self = this;\r\n        // STATE MACHINE\r\n        switch (this.state) {\r\n          case 0: // STOPPED\r\n            this.getOutputPort(0).setValue(false);\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            for (var index = 0; index < this.getInputPorts().length - 1; index++) {\r\n              self.layerAttr(\"Circle_IN_\" + (index + 1) ,{fill:\"#f0f0f0\"});              \r\n            }\r\n            for (var index = 0; index < this.getOutputPorts().length - 1; index++) {\r\n              self.layerAttr(\"Circle_OUT_\" + (index + 1) ,{fill:\"#f0f0f0\"});\r\n              self.getOutputPort(index).setValue(0);               \r\n            }\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            this.layerAttr(\"Skill_State\", {text: 'State: not connected'});\r\n            if(this.getInputPort(0).getValue()){\r\n                this.state = 10;\r\n            }\r\n            break;\r\n          case 10: // Get The skill description\r\n            this.layerAttr(\"Circle_en\",{fill:\"#faa50a\"});\r\n            this.layerAttr(\"led_power\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"circle\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Getting descr.'});\r\n            skillproxy.getSkillDescription(this.NAME).then(function (desc) {\r\n                if (desc.skill_descp){\r\n                    self.description = desc.skill_descp;\r\n                }\r\n                if(self.description){\r\n                  // Make transition\r\n                  self.state = 11;\r\n                }else{\r\n                  // Make transition to err\r\n                  self.state = 6;\r\n                  self.err_msg = \"Could not fetch the skill description\";\r\n                }\r\n            });\r\n            this.state = 100;                       \r\n            break;\r\n          case 100: // Wait for the callback\r\n            this.currentTimer=0;\r\n            break;\r\n          case 11: // Connect to the skill\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Connecting'});\r\n            this.layerAttr(\"led_connected\",{fill:\"#ffb300\"}); // Orange\r\n            skillproxy.connectSkill(self.description.ip, self.description.port).then(function (resp_con) {\r\n                if(resp_con.err){\r\n                  // Make transition to err\r\n                  self.state = 6;\r\n                  self.err_msg = \"Error while connecting to the skill!\";\r\n                }else{\r\n                  self.layerAttr(\"Skill_State\", {text: 'State: Connected'});\r\n                  \r\n                  socket.on(\"opcua_serverstatus\", function(msg){\r\n                    // console.log(\"####### Serverstatus\");\r\n                  });\r\n\r\n                  socket.on(\"ResultTriggerChanged\", function(data){\r\n                    console.log(\"####### ResultTriggerChanged\");\r\n                    // Filter the event for the state changes related to this skill.\r\n                    for (var prop in data) {\r\n                        if (Object.prototype.hasOwnProperty.call(data, prop)) {\r\n                            var el = data[prop];\r\n                            if (el.ip === self.description.ip && el.port === self.description.port && el.skill === self.description.skill.name) {\r\n                                self.last_result_trigger_value = el.value.value;\r\n                            }\r\n                        }\r\n                    }\r\n                  });\r\n                  \r\n                  // Make transition\r\n                  if (self.description.skillModel.xRequestProvided && self.description.skillModel.xResultAcknowledge){\r\n                    self.state = 111; // Call the skill directly\r\n                  }                 \r\n                }\r\n            }); \r\n            self.state = 110;               \r\n            break;\r\n          case 110: // Wait for result of connect skill\r\n            this.currentTimer=0;\r\n            break;\r\n          case 111: // Write xRequestProvided flag\r\n            self.layerAttr(\"Skill_State\", {text: 'State: Set xRequestProvided.'});\r\n            skillproxy.writeRequestTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.xRequestProvided, true).then(function (resp_rq) {\r\n              \r\n              if(resp_rq.err){\r\n                // Make transition to err\r\n                self.state = 6;\r\n                self.err_msg = \"Error while monitoring result trigger!\";\r\n              }else{\r\n                \r\n                // Make transition to subscribe to the result trigger\r\n                self.state = 120;\r\n              }\r\n            });\r\n            self.state = 115;\r\n            break;\r\n          case 115: // Wait for write results\r\n            break;\r\n          case 120: // Subscribe to result trigger before calling the skill\r\n            self.layerAttr(\"Skill_State\", {text: 'State: Subscribing to result trigger.'});\r\n            skillproxy.monitorSkillResultsTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.xRequestProvided).then(function (resp_rt) {\r\n              self.monitor_rt_call_results = resp_rt;\r\n              if(resp_rt.err){\r\n                // Make transition to err\r\n                self.state = 6;\r\n                self.err_msg = \"Error while monitoring result trigger!\";\r\n              }else{\r\n                if(resp_rt.results){\r\n                  self.initial_result_trigger_value = resp_rt.results.value.value;\r\n                }else{\r\n                  self.initial_result_trigger_value = 0;\r\n                }\r\n                // Make transition to call the skill\r\n                self.state = 13;\r\n              }\r\n            });\r\n            self.state = 125;\r\n            break;\r\n          case 125: // Wait for call \r\n            break;\r\n          case 13: // Call the skill (Model with state machine)\r\n            this.layerAttr(\"Circle_en\",{fill:\"#faa50a\"});\r\n            this.layerAttr(\"led_power\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"circle\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Starting'});\r\n            \r\n            // sample the input values\r\n            var _params = [];\r\n            var _name = this.description.skill.name;\r\n            var _inputs = this.description.skillModel[_name + \"_DB\"].parameters.inputArguments || [];\r\n            for (var index = 0; index < _inputs.length; index++) {              \r\n              self.layerAttr(\"Circle_IN_\" + (index) ,{fill:\"#faa50a\"});\r\n              var el = _inputs[index];\r\n              _params.push({\r\n                  dataType: el.dataType, // Null: 0, Boolean: 1, SByte: 2, // signed Byte = Int8 Byte : 3, // unsigned Byte = UInt8 Int16: 4, UInt16: 5, Int32: 6, UInt32: 7, Int64: 8, UInt64: 9, Float: 10, Double: 11, String: 12, DateTime: 13, Guid: 14, ByteString: 15, XmlElement: 16, NodeId: 17, ExpandedNodeId: 18, StatusCode: 19, QualifiedName: 20, LocalizedText: 21, ExtensionObject: 22, DataValue: 23, Variant: 24, DiagnosticInfo: 25\r\n                  arrayType: el.valueRank, //Scalar: 0x00, Array: 0x01, Matrix: 0x02\r\n                  value: this.getInputPort(index + 1).getValue()?this.getInputPort(index + 1).getValue():0\r\n              });\r\n            }\r\n\r\n            // Call the skill\r\n            skillproxy.callSkill(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel[_name + \"_DB\"], _params).then(function (resp_call) {\r\n              self.start_call_results = resp_call;\r\n              if(resp_call.err){\r\n                // Make transition to err\r\n                self.state = 6;\r\n                self.err_msg = \"Error while starting the skill!\";\r\n              }else{\r\n                // Set Synchronous Output\r\n                var _outputs = resp_call.results.outputArguments;\r\n                for (var index = 0; index < _outputs.length; index++) {\r\n                  self.getOutputPort(index + 1).setValue(_outputs[index].value);\r\n                  self.layerAttr(\"Circle_OUT_\" + (index) ,{fill:\"#faa50a\"});\r\n                }\r\n                // Make transition\r\n                self.state = 2;\r\n                self.layerAttr(\"Skill_State\", {text: 'State: Executing'});\r\n              }\r\n            });\r\n\r\n            this.state = 130;               \r\n            break;\r\n          case 130: // Wait for the callback\r\n            this.currentTimer=0;\r\n            break;\r\n          case 2: // Wait for the  skill to be done\r\n            self.layerAttr(\"Skill_State\", {text: 'State: Executing'});            \r\n            if(self.initial_result_trigger_value === true && self.last_result_trigger_value === false){\r\n              // Make transition\r\n              this.state = 3;\r\n              this.layerAttr(\"Skill_State\", {text: 'State: Completed'});\r\n            }                      \r\n            break;\r\n          case 3: // Read the results\r\n            this.layerAttr(\"Circle_en\",{fill:\"#faa50a\"});\r\n            this.layerAttr(\"led_power\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"circle\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Getting results'});\r\n\r\n            // sample the outputs parameters\r\n            var _offset = (self.start_call_results.results.outputArguments || []).length;\r\n\r\n            var _param_nodeids = [];\r\n\r\n            \r\n            for (var _i = _offset; _i < self.description.parameters.outputs.length; _i++) {\r\n              var _param_o = self.description.parameters.outputs[_i];\r\n              _param_nodeids.push(_param_o.nodeId);\r\n              console.log(\"test\");\r\n            }\r\n            \r\n\r\n            // Call the emthod\r\n            skillproxy.readResultVariables(self.description.ip, self.description.port, self.description.skill.name, _param_nodeids).then(function (resp_getResults) {\r\n              self.get_results_call_results = resp_getResults;\r\n              if(resp_getResults.err){\r\n                // Make transition to err\r\n                self.state = 6;\r\n                self.err_msg = \"Error while fetching the results of the skill!\";\r\n              }else{\r\n                // Set Synchronous Output\r\n                var _outputs = resp_getResults.results;\r\n                for (var index = 0; index < _outputs.length; index++) {\r\n                  self.getOutputPort(index + 1 + _offset).setValue(_outputs[index].value.value);\r\n                  self.layerAttr(\"Circle_OUT_\" + (index + _offset) ,{fill:\"#faa50a\"});\r\n                }\r\n                // Make transition\r\n                self.state = 310;\r\n              }\r\n            });\r\n\r\n            // Wait\r\n            this.state = 300;\r\n            break;\r\n          case 300: // Wait call getResults\r\n            break;\r\n          case 310: // Write xResultAcknowledge\r\n            self.layerAttr(\"Skill_State\", {text: 'State: Set xRequestProvided.'});\r\n            skillproxy.writeRequestTrigger(self.description.ip, self.description.port, self.description.skill.name, self.description.skillModel.xResultAcknowledge, true).then(function (resp_rq) {\r\n              if(resp_rq.err){\r\n                // Make transition to err\r\n                self.state = 6;\r\n                self.err_msg = \"Error while monitoring result trigger!\";\r\n              }else{\r\n                self.layerAttr(\"Skill_State\", {text: 'State: Done'});\r\n                // Make transition\r\n                self.state = 4;\r\n              }\r\n            });\r\n            self.state = 315;\r\n            break;\r\n          case 315: // Wait for the write results\r\n            break;\r\n          case 4: // Set the done signal\r\n            this.getOutputPort(0).setValue(true);\r\n\r\n            this.layerAttr(\"Circle_done\",{fill:\"#faa50a\"});\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            if(! this.getInputPort(0).getValue()){\r\n                this.state = 5;\r\n            }\r\n            break;\r\n          case 5: // Reinitialize\r\n            this.getOutputPort(0).setValue(false);\r\n            for (var index = 0; index < this.getOutputPorts().length - 1; index++) {\r\n              self.layerAttr(\"Circle_OUT_\" + (index + 1) ,{fill:\"#f0f0f0\"});\r\n              self.getOutputPort(index).setValue(0);                \r\n            }\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            this.state = 0;\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Ready'});\r\n            break;\r\n          case 6: // Error\r\n            this.getOutputPort(0).setValue(false);\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"Skill_State\", {text: 'State: Error'});\r\n        }\r\n        this.last_en_value = this.getOutputPort(0).getValue();\r\n    },\r\n    \r\n   /**\r\n     *  Called if the simulation mode is starting\r\n     **/\r\n    onStart:function(){\r\n        var self = this;\r\n        this.currentTimer=0;\r\n        this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n        this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n        for (var index = 0; index < this.getInputPorts().length - 1; index++) {\r\n          self.layerAttr(\"Circle_IN_\" + (index + 1) ,{fill:\"#f0f0f0\"});              \r\n        }\r\n        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {\r\n          self.layerAttr(\"Circle_OUT_\" + (index + 1) ,{fill:\"#f0f0f0\"});\r\n          self.getOutputPort(index).setValue(0);                \r\n        }\r\n        this.layerAttr(\"Skill_State\", {text: 'State: not connected'});\r\n        this.state = 5; // STOPPED\r\n        this.last_en_value = 0;\r\n    },\r\n\r\n    /**\r\n     *  Called if the simulation mode is stopping\r\n     **/\r\n    onStop:function(){\r\n        var self = this;\r\n        this.currentTimer=0;\r\n        this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n        this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n        this.layerAttr(\"Skill_State\", {text: 'State: not connected'});\r\n        for (var index = 0; index < this.getInputPorts().length - 1; index++) {\r\n          self.layerAttr(\"Circle_IN_\" + (index + 1) ,{fill:\"#f0f0f0\"});              \r\n        }\r\n        for (var index = 0; index < this.getOutputPorts().length - 1; index++) {\r\n          self.layerAttr(\"Circle_OUT_\" + (index + 1) ,{fill:\"#f0f0f0\"});\r\n          self.getOutputPort(index).setValue(0);              \r\n        }\r\n\r\n        this.state = 5; // STOPPED\r\n        this.last_en_value = 0;\r\n        \r\n        socket.off(\"opcua_serverstatus\", function(msg){\r\n          console.log(\"####### Serverstatus\");\r\n        });\r\n        \r\n        socket.off(\"SkillStatesChanged\", function(msg){\r\n          console.log(\"####### StatesChanged\");\r\n        });\r\n    },\r\n    \r\n    getRequiredHardware: function(){\r\n      return {\r\n        raspi: false,\r\n        arduino: false\r\n      };\r\n    }\r\n});",
      "name": "circle",
      "markdown": "#Skill Template"
    },
    "cssClass": "shape_designer_figure_PolyRect",
    "ports": [],
    "bgColor": "#FFFFFF",
    "color": "#303030",
    "stroke": 1,
    "radius": 6,
    "dasharray": null,
    "vertices": [
      {
        "x": 7900.241887499999,
        "y": 7889.5
      },
      {
        "x": 8100.241887499999,
        "y": 7889.5
      },
      {
        "x": 8100.241887499999,
        "y": 8110.5
      },
      {
        "x": 7900.241887499999,
        "y": 8110.5
      }
    ],
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.RadiusFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "8e9303cc-561f-5fd2-4f77-1ad9200f3402",
    "x": 7953.952824999999,
    "y": 7890,
    "width": 56.25,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Name"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "Skill_Add (V2)",
    "outlineStroke": 0,
    "outlineColor": "#FF0000",
    "fontSize": 16,
    "fontColor": "#00979D",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      },
      {
        "name": "shape_designer.filter.OutlineStrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "1ae0818b-2abe-9c51-551a-4988295d83c5",
    "x": 7895.5,
    "y": 7956,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_en"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "17109eb2-7d96-9976-b9bb-4fb1478419c5",
    "x": 7895.5,
    "y": 7956,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_en",
      "type": "Input",
      "direction": 3,
      "fanout": 20
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "d7c16052-5fba-38c3-4f20-69197b70ed45",
    "x": 7903.3986374999995,
    "y": 7950.3828125,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_en"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "En",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 10,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "137262e2-9efb-29f7-fb7e-6d30dd4a3c33",
    "x": 8094.5,
    "y": 7956,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_done"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "1013f7b7-e2df-9606-b851-aaee6bb4c283",
    "x": 8094.5,
    "y": 7956,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_done",
      "type": "Output",
      "direction": 1,
      "fanout": 20
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "bd488022-da32-54e3-ac76-02ffcbb3c24b",
    "x": 8062.25,
    "y": 7950.3828125,
    "width": 60,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_done"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "Done",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 10,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "ef404b16-c201-4465-b67d-17460c0efbc3",
    "x": 7896,
    "y": 7980,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_0"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#F2F2F2",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "a0d0c938-11df-4d09-bfff-5de97747ec96",
    "x": 7905,
    "y": 7974,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_0"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "value1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 8,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "e00205fb-7ddb-42c4-9610-e5721b96e910",
    "x": 7896,
    "y": 7980,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_0",
      "type": "Input",
      "direction": 3
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "ef1fe866-a4ae-4814-b941-2d1ca4227f67",
    "x": 7896,
    "y": 7993,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_1"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#F2F2F2",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "803e33b1-dc0d-4819-88bc-051b6d039b17",
    "x": 7905,
    "y": 7987,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_1"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "value2",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 8,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "bc40f0a1-1fb5-47b6-a5f1-abdd2ecc1248",
    "x": 7896,
    "y": 7993,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_1",
      "type": "Input",
      "direction": 3
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "f83e6640-2769-4dce-a151-7610b8d0e5ba",
    "x": 8095,
    "y": 7980,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_OUT_0"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#F2F2F2",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "7f47d0d1-a378-4d70-a5d6-c06220d24155",
    "x": 8038,
    "y": 7974,
    "width": 60,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_OUT_0"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "ErrorId",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 8,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "b6e2fd3e-d884-429c-8a4b-c7d33e48fccc",
    "x": 8095,
    "y": 7980,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_OUT_0",
      "type": "Output",
      "direction": 1
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "6b679cab-f287-4dee-bec9-ab53b1ec241f",
    "x": 8095,
    "y": 7993,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_OUT_1"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#F2F2F2",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "108d8fd5-276c-4557-b850-0cbe05b99427",
    "x": 8038,
    "y": 7987,
    "width": 60,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_OUT_1"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "ErrorId",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 8,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "5e2331cf-9850-4ecc-acee-8c0fbac387cb",
    "x": 8095,
    "y": 7993,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_OUT_1",
      "type": "Output",
      "direction": 1
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "5226815a-a756-49c2-afae-07d807c7f8d2",
    "x": 8095,
    "y": 8006,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_OUT_2"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#F2F2F2",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "c8c22b83-1f69-4a8d-9d62-b080909cf819",
    "x": 8038,
    "y": 8000,
    "width": 60,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_OUT_2"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "valueOut",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 8,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "9c1a795b-3dc2-455a-b857-107851b66ffe",
    "x": 8095,
    "y": 8006,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_OUT_2",
      "type": "Output",
      "direction": 1
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#1C9BAB",
    "color": "#1B1B1B",
    "stroke": 1,
    "dasharray": null,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FanoutFilter"
      },
      {
        "name": "shape_designer.filter.PortDirectionFilter"
      },
      {
        "name": "shape_designer.filter.PortTypeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "9ecebbd2-a09b-ae1b-142c-0c81b6bf3ece",
    "x": 7923.523937499999,
    "y": 7894.909500000001,
    "width": 12.180999999998676,
    "height": 12.180999999998676,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "led_connected"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#FF3C00",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "ce456901-1d35-ac42-3365-852cd6b83986",
    "x": 7906.706575,
    "y": 7894.909500000001,
    "width": 12.180999999998676,
    "height": 12.180999999998676,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "led_power"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#33DE09",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "blur": 0,
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.SizeFilter"
      },
      {
        "name": "shape_designer.filter.FillColorFilter"
      },
      {
        "name": "shape_designer.filter.StrokeFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "77985263-0a58-9fe1-8204-be956e54d7cf",
    "x": 7940,
    "y": 7920,
    "width": 108.5625,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Skill_IP"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "localhost:4844",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "dbec1a1b-a1f0-5b2e-d012-f0037ce9916f",
    "x": 7940,
    "y": 7939,
    "width": 108.5625,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Skill_State"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "State: Not Connected",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "f1f06fb1-4c6d-59cc-81f7-5cba2cf66a2c",
    "x": 7940,
    "y": 7956,
    "width": 108.5625,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Skill_NodeID"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "NodeID: ns=3;s=Sk…",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "LabelInplaceEditor",
    "filters": [
      {
        "name": "shape_designer.filter.PositionFilter"
      },
      {
        "name": "shape_designer.filter.FontSizeFilter"
      },
      {
        "name": "shape_designer.filter.FontColorFilter"
      }
    ]
  }
];
var pkg='Module01_localhost_4844_Skill_Add';
app.fileNew();

var reader = new draw2d.io.json.Reader();
reader.unmarshal(app.view,json);

var code = null;
var img  = null;
var customCode=app.getConfiguration("code");
var markdown = app.getConfiguration("markdown");
markdown = markdown?markdown:"";
var writer = new shape_designer.FigureWriter();
try {
    writer.marshal(app.view, pkg, function (js) {
        code = js;
        try {
            eval(js);
        }
        catch (exc) {
            console.log("Error in shape code. \nRemove error and try it again:\n\n>>    " + exc);
            throw exc;
        }
        var splash = $(
            '<div class="overlay-scale">' +
            '<div id="test_canvas">' +
            '</div>' +
            '<div>');

        // fadeTo MUSS leider sein. Man kann mit raphael keine paper.text elemente einfügen
        // wenn das canvas nicht sichtbar ist. In diesen Fall mach ich das Canvas "leicht" sichtbar und raphael ist
        // zufrieden.
        $("body").append(splash);
        var canvas = new draw2d.Canvas("test_canvas");
        var test = eval("new "+pkg+"()");
        canvas.add(test, 400, 160);
        canvas.commonPorts.each(function (i, p) {
            p.setVisible(false);
        });

        canvas.getBoundingBox = function () {
            var xCoords = [];
            var yCoords = [];
            this.getFigures().each(function (i, f) {
                var b = f.getBoundingBox();
                xCoords.push(b.x, b.x + b.w);
                yCoords.push(b.y, b.y + b.h);
            });
            var minX = Math.min.apply(Math, xCoords);
            var minY = Math.min.apply(Math, yCoords);
            var width = Math.max(10, Math.max.apply(Math, xCoords) - minX);
            var height = Math.max(10, Math.max.apply(Math, yCoords) - minY);

            return new draw2d.geo.Rectangle(minX, minY, width, height);
        };

        new draw2d.io.png.Writer().marshal(canvas, function (imageDataUrl, base64) {
            img = base64;
            splash.remove();
        }, canvas.getBoundingBox().scale(10, 10));
    });
}
catch(e){
    console.log(e);
    code="";
    img="";
}


