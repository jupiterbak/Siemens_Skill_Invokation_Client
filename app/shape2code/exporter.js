var json=[
  {
    "type": "shape_designer.figure.PolyRect",
    "id": "c55dd135-15db-7c71-5efa-f6761c073e66",
    "x": 7984.59375,
    "y": 7980,
    "width": 30,
    "height": 40,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\n * by 'Draw2D Shape Designer'\n *\n * Custom JS code to tweak the standard behaviour of the generated\n * shape. add your custome code and event handler here.\n *\n *\n */\ntestShape = testShape.extend({\n\n    init: function(attr, setter, getter){\n        this._super(attr, setter, getter);\n\n        this.attr({resizeable:false});\n        this.getInputPort(0).attr({\n            semanticGroup:\"signal\"\n        });\n        this.getOutputPort(0).attr({\n            semanticGroup:\"signal\"\n        });\n        this.getInputPort(1).attr({\n            semanticGroup:\"signal\"\n        });\n        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\n\n    },\n    \n    calculate:function()\n    {\n        var i1 = this.getInputPort(0);\n        var i2 = this.getInputPort(1);\n        var o1 = this.getOutputPort(0);\n        \n        o1.setValue(i1.getValue() || i2.getValue());\n    },\n\n    getParameterSettings: function()\n    {\n        return [\n        {\n            name:\"dataId\",\n            label:\"Data Id\",\n            property:{\n                type: \"string\"\n            }\n        },\n        {\n            name:\"dataValue\",\n            label:\"(Optional) Data Value\",\n            property:{\n                type: \"int\"\n            }\n        }];\n    }\n});",
      "name": "Rectangle",
      "markdown": "# OR Gate\n\n## Description\nThe `OR gate` is a digital logic gate that implements logical \ndisjunction - it behaves according to the truth table to the\n \n \n\n**Therefore, A `High` output results if one or both the \ninputs to the gate are `High`**\n\n## Logic table\n\n| INPUT 1   | INPUT   |  OUTPUT    |\n|:---------:|:-------:|:----------:|\n| Low       | Low     |  Low       |\n| `High`      | Low     |  `High`       |\n| Low       | `High`    |  `High`       |\n| `High`      | `High`    |  `High`    |\n\n"
    },
    "cssClass": "shape_designer_figure_PolyRect",
    "ports": [],
    "bgColor": "#FFFFFF",
    "color": "#303030",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "vertices": [
      {
        "x": 7984.59375,
        "y": 7980
      },
      {
        "x": 8014.59375,
        "y": 7980
      },
      {
        "x": 8014.59375,
        "y": 8020
      },
      {
        "x": 7984.59375,
        "y": 8020
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
    "type": "shape_designer.figure.ExtPort",
    "id": "592a8604-e0a9-8913-445d-621078e5ae97",
    "x": 7978.59375,
    "y": 7984,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "input01",
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
    "type": "shape_designer.figure.ExtPort",
    "id": "5fc48f01-fecb-0d5f-ed4f-81a4bc26ae63",
    "x": 7978.59375,
    "y": 8006.5,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "input02",
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
    "type": "shape_designer.figure.ExtPort",
    "id": "7c8a6215-ce17-6a10-c85b-b97fd0de466c",
    "x": 8015.59375,
    "y": 7995,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "output",
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
    "type": "shape_designer.figure.ExtLabel",
    "id": "0a4705bb-c6fd-7a26-332f-6972e8683949",
    "x": 7984.59375,
    "y": 7984.5,
    "width": 30.350000381469727,
    "height": 23,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Label"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": ">1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 20,
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
var pkg='OR';
console.log('App -->' + app);
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


