var json=[
  {
    "type": "shape_designer.figure.PolyRect",
    "id": "3f3cebb6-442a-5a78-be8e-ee14a564a9bc",
    "x": 7900.241887499999,
    "y": 7889.5,
    "width": 200,
    "height": 211,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\r\n * by 'Draw2D Shape Designer'\r\n *\r\n * Custom JS code to tweak the standard behaviour of the generated\r\n * shape. add your custome code and event handler here.\r\n *\r\n *\r\n */\r\ntestShape = testShape.extend({\r\n\r\n   init: function(attr, setter, getter){\r\n         this._super(attr, setter, getter);\r\n\r\n         this.attr({resizeable:false});\r\n         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\r\n         \r\n         var _this= this;\r\n         this.currentTimer=0;\r\n         this.state = 5; // STOPPED\r\n         this.last_en_value = 0;\r\n    },\r\n    \r\n    calculate:function(){\r\n        // STATE MACHINE\r\n        switch (this.state) {\r\n          case 0: // STOPPED\r\n            this.getOutputPort(0).setValue(false);\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            if(this.getInputPort(0).getValue()){\r\n                this.state = 1;\r\n            }\r\n            break;\r\n          case 1: // Call skill start\r\n            this.layerAttr(\"Circle_en\",{fill:\"#faa50a\"});\r\n            this.layerAttr(\"led_power\",{fill:\"#33DE09\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#f0f0f0\"});\r\n            // TODO: Call Start method with the parameters\r\n            this.currentTimer=0;\r\n            \r\n            // Make transition\r\n            this.state = 2;\r\n            break;\r\n          case 2: // Wait for the  skill to be done\r\n            this.currentTimer = (this.currentTimer + 1)% 300;\r\n            if(this.currentTimer === 0){\r\n                this.state = 3;\r\n            }\r\n            break;\r\n          case 3: // Call Get results\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"Circle_done\",{fill:\"#faa50a\"});\r\n            this.getOutputPort(0).setValue(true);\r\n            this.state = 4;\r\n            break;\r\n          case 4: // Set the outputs\r\n            this.layerAttr(\"Circle_done\",{fill:\"#faa50a\"});\r\n            this.getOutputPort(0).setValue(true);\r\n            \r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            if(! this.getInputPort(0).getValue()){\r\n                this.state = 5;\r\n            }\r\n            break;\r\n          case 5: // Reinitialize\r\n            this.getOutputPort(0).setValue(false);\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n            this.state = 0;\r\n            break;\r\n          case 6: // Error\r\n            this.getOutputPort(0).setValue(false);\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.currentTimer=0;\r\n            this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n            this.layerAttr(\"led_connected\",{fill:\"#FF3C00\"});\r\n        }\r\n        this.last_en_value = this.getOutputPort(0).getValue();\r\n    },\r\n    \r\n   /**\r\n     *  Called if the simulation mode is starting\r\n     **/\r\n    onStart:function(){\r\n        this.currentTimer=0;\r\n        this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n        this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n        this.state = 5; // STOPPED\r\n        this.last_en_value = 0;\r\n    },\r\n\r\n    /**\r\n     *  Called if the simulation mode is stopping\r\n     **/\r\n    onStop:function(){\r\n        this.currentTimer=0;\r\n        this.layerAttr(\"led_power\",{fill:\"#FF3C00\"});\r\n        this.layerAttr(\"led_connected\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n        this.layerAttr(\"circle\",{fill:\"#ffffff\"});\r\n        this.state = 5; // STOPPED\r\n        this.last_en_value = 0;\r\n    },\r\n    \r\n    getRequiredHardware: function(){\r\n      return {\r\n        raspi: false,\r\n        arduino: false\r\n      }\r\n    }\r\n});",
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
    "text": "InsertSkill",
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
    "id": "dc0ad46e-2660-4d63-a29f-6dbfd7157288",
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
    "id": "0213daef-a9f2-481f-b095-13f7dd491749",
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
    "text": "Position",
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
    "id": "6b43a918-9d5c-44be-a06f-42c2e6259fab",
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
    "id": "505e4233-c2d6-4a6b-85eb-f5318d1ca2cd",
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
    "id": "9d1fa65a-cf8b-4eff-8435-536b580f376b",
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
    "text": "BuildingBlockTypeId",
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
    "id": "ae1dc660-d1ac-442f-9614-13e1a0a5881b",
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
    "id": "64caa288-c6ee-4ff3-b09c-e3018e358f70",
    "x": 7896,
    "y": 8006,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_2"
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
    "id": "0a4a9bbf-044a-46b6-aa80-c7fe46f89c09",
    "x": 7905,
    "y": 8000,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_2"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "Orientation",
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
    "id": "3559fd2d-2979-417b-a24b-8587af160ac7",
    "x": 7896,
    "y": 8006,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_2",
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
    "id": "b6feee87-c294-4d03-bcf4-c32d01030c3e",
    "x": 7896,
    "y": 8019,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_3"
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
    "id": "145493ec-e6a0-4720-bc6d-e25584413e21",
    "x": 7905,
    "y": 8013,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_3"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "RFID",
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
    "id": "6ffd2a2e-a481-45d5-b8c5-e3cdfc606e1c",
    "x": 7896,
    "y": 8019,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_3",
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
    "id": "c47cb457-9624-4dca-b6c0-271665e31eb9",
    "x": 7896,
    "y": 8032,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_4"
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
    "id": "d6de34b4-c913-491b-aedc-d53231a8b008",
    "x": 7905,
    "y": 8026,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_4"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "CurrentConfiguration_BuildingBlockTypeId",
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
    "id": "58f8af98-28e9-4def-8e7d-81c9baca0946",
    "x": 7896,
    "y": 8032,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_4",
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
    "id": "a94a4d1b-4062-4346-987d-4b27ae8a61ad",
    "x": 7896,
    "y": 8045,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_5"
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
    "id": "de525273-ffb1-45fb-9bd2-998c61c017b8",
    "x": 7905,
    "y": 8039,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_5"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "CurrentConfiguration_Orientation",
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
    "id": "552de953-5129-450e-b59a-2d6d56cdbb31",
    "x": 7896,
    "y": 8045,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_5",
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
    "id": "fdaa1f3f-78d9-407b-bdb2-df20216ce0fe",
    "x": 7896,
    "y": 8058,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Circle_IN_6"
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
    "id": "86f89e47-78ca-44a3-b527-9e1bc1a7f2dc",
    "x": 7905,
    "y": 8052,
    "width": 100,
    "height": 21.234375,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label_IN_6"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "RFID",
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
    "id": "baf8edab-35e0-45e1-8999-fa7c79605381",
    "x": 7896,
    "y": 8058,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port_IN_6",
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
    "id": "51588c3c-0c90-42ae-8ac8-5d5fd694a184",
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
    "id": "b3a39121-5517-4d68-875c-fb0b50bf0677",
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
    "id": "89708ae4-28b0-4763-9a7f-43ca82cfc035",
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
    "id": "d74a31f0-2efa-4f16-9b12-19b130b7f0ea",
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
    "id": "bfbc723b-d566-4081-a55f-22d38c19c0c8",
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
    "id": "50e7c479-ae79-4b3f-8e46-81ffb8db8895",
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
    "id": "9ecebbd2-a09b-ae1b-142c-0c81b6bf3ece",
    "x": 7923.523937499999,
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
      "name": "led_connected"
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
    "text": "localhost:4842",
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
    "text": "State: Stopped",
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
    "text": "NodeID: ns=4;i=1027",
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
var pkg='Module01_localhost_4842_InsertSkill';
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


