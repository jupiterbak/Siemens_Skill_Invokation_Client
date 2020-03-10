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
      "code": "/**\r\n * by 'Draw2D Shape Designer'\r\n *\r\n * Custom JS code to tweak the standard behaviour of the generated\r\n * shape. add your custome code and event handler here.\r\n *\r\n *\r\n */\r\ntestShape = testShape.extend({\r\n\r\n   init: function(attr, setter, getter){\r\n         this._super(attr, setter, getter);\r\n\r\n         this.attr({resizeable:false});\r\n         this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\r\n         \r\n         var _this= this;\r\n         this.c_started=false;\r\n         this.currentTimer=0;\r\n    },\r\n    \r\n    calculate:function(){\r\n        if(this.getInputPort(0).getValue()){\r\n            if(this.c_started===false){\r\n                this.currentTimer = (this.currentTimer + 1)% 300;\r\n                if(this.currentTimer === 0){\r\n                    this.c_started=true;\r\n                }\r\n            }else{\r\n                this.layerAttr(\"Circle_done\",{fill:\"#faa50a\"});\r\n                this.getOutputPort(0).setValue(true);\r\n            }\r\n            this.layerAttr(\"Circle_en\",{fill:\"#faa50a\"});\r\n        }\r\n        else{\r\n            this.layerAttr(\"Circle_en\",{fill:\"#f0f0f0\"});\r\n            this.layerAttr(\"Circle_done\",{fill:\"#f0f0f0\"});\r\n            this.getOutputPort(0).setValue(false);\r\n            this.c_started=false;\r\n            this.currentTimer=0;\r\n        }\r\n    },\r\n\r\n    propagate: function(index, port){\r\n        if(!port.getConnections().isEmpty()){\r\n            var con = port.getConnections().first();\r\n            var other = con.getSource()===port?con.getTarget():con.getSource()\r\n            if(other instanceof draw2d.InputPort){\r\n                \r\n            }\r\n            else {\r\n                hardware.arduino.set(index,!!other.getValue())\r\n            }\r\n        }\r\n    },\r\n    \r\n   /**\r\n     *  Called if the simulation mode is starting\r\n     **/\r\n    onStart:function(){\r\n        this.c_started=false;\r\n        this.currentTimer=0;\r\n    },\r\n\r\n    /**\r\n     *  Called if the simulation mode is stopping\r\n     **/\r\n    onStop:function(){\r\n    },\r\n    \r\n    getRequiredHardware: function(){\r\n      return {\r\n        raspi: false,\r\n        arduino: false\r\n      }\r\n    }\r\n});",
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
    "id": "5980a74d-df09-4966-93b6-ae9664ac7336",
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
    "id": "5d2e79c4-dc8b-470c-8c58-61888a6f58e6",
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
    "id": "bf7e8b8c-6d87-4b05-b513-25d1a447d85b",
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
    "id": "c2ba33ea-2638-491c-96c2-15330a695bce",
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
    "id": "392a97d3-9798-4ca6-a684-e2d1441e3d2b",
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
    "id": "55e61c32-6528-4eab-92ad-98af1f368d4f",
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
    "id": "79475019-77b2-4a0b-ae2e-4811a810060a",
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
    "id": "ecfb0446-3a28-4acb-8f3c-2104d75db762",
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
    "id": "81bb95f3-9a55-4b1a-9d3f-e106bd32b20b",
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
    "id": "f9740e58-30f9-4db5-bf9d-c1e20afaa09a",
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
    "id": "df18b70b-25c6-46d2-ad46-515ea21cc58e",
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
    "id": "28e6f091-50f9-43f0-b904-87086ac0d269",
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
    "id": "7ae33297-12e9-4e3f-a8f2-7542230bc64b",
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
    "id": "5444a15d-9615-42fc-ad3c-0959f83e248d",
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
    "id": "5b90a93a-32e1-4990-90cd-7cc57fc74c97",
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
    "id": "9b17aa4f-b8af-49df-a17b-ab8496e85b1b",
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
    "id": "f4802898-f9ae-4499-8707-7c202d9be7a6",
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
    "id": "afb0f034-9d99-454b-bbee-1b3b74998563",
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
    "id": "37d75604-370b-4d00-8a12-8210f45c590a",
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
    "id": "75676dee-d7ba-4e5e-ac94-c2c5f9a15f16",
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
    "id": "00eff413-589c-474a-b041-33b4fbf2d9ca",
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
    "id": "3a138e63-4d06-41b1-8ece-a88da3616fa1",
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
    "id": "bd2ce008-d400-4c7e-a74f-d8ad66974209",
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
    "id": "004bd364-55b4-4b4c-a1f0-907e53b83eb8",
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
    "id": "d873fbf3-0029-4eb5-9355-7fbe062f78ce",
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
    "id": "a4551f0c-d75c-4f01-aee1-300930a1321d",
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
    "id": "f8f2c7c7-11be-4098-9df5-7f785b07e6ef",
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
    "text": "localhost:4840",
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
var pkg='AssenblyModule01_localhost_4840_InsertSkill';
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


