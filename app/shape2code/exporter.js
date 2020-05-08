var json=[
  {
    "type": "shape_designer.figure.PolyRect",
    "id": "722d9720-c010-73b7-4026-b9e994a271b3",
    "x": 7980,
    "y": 7989,
    "width": 40,
    "height": 20,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\n * Generated Code for the Draw2D touch HTML5 lib.\n * File will be generated if you save the *.shape file.\n *\n * by 'Draw2D Shape Designer'\n *\n * Custom JS code to tweak the standard behaviour of the generated\n * shape. add your custom code and event handler here.\n *\n * Looks disconcerting - extending my own class. But this is a good method to\n * merge basic code and override them with custom methods.\n */\ntestShape = testShape.extend({\n\n    init: function(attr, setter, getter){\n         this._super(attr, setter, getter);\n\n         // your special code here\n        this.getOutputPort(0).setValue(true)\n        this.attr({resizeable:false});\n        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\n    },\n\n    /**\n     *  Called by the simulator for every calculation\n     *  loop\n     *  @required\n     **/\n    calculate:function()\n    {\n    },\n\n\n    /**\n     *  Called if the simulation mode is starting\n     *  @required\n     **/\n    onStart:function()\n    {\n    },\n\n    /**\n     *  Called if the simulation mode is stopping\n     *  @required\n     **/\n    onStop:function()\n    {\n    },\n\n    /**\n     * Get the simulator a hint which kind of hardware the shapes requires or supports\n     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost\n     * and your are running a circuit which needs this kind of hardware...\n     **/\n    getRequiredHardware: function(){\n      return {\n        raspi: false,\n        arduino: false\n      }\n    }\n\n});",
      "name": "outline",
      "markdown": "# 7 Segment Display\n\nA seven segment display is the most basic electronic display device\nthat can display digits from 0-9. \n\n\nThe most common configuration has an array of eight LEDs arranged \nin a special\npattern to display these digits. They are laid out as a squared-off \nfigure  8 . Every LED is assigned a name from `a` to `h` and is \nidentified by its name. Seven LEDs `a` to `g` are used to display \nthe numerals while eighth LED `h` is used to display the dot/decimal.\n  \n \n![](data:image/png;base64,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)\n",
      "type": "Output",
      "direction": 1
    },
    "cssClass": "shape_designer_figure_PolyRect",
    "ports": [],
    "bgColor": "#00BA00",
    "color": "#00BA00",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "vertices": [
      {
        "x": 7980,
        "y": 7989
      },
      {
        "x": 8011.338893978111,
        "y": 7989
      },
      {
        "x": 8020,
        "y": 7999
      },
      {
        "x": 8011.338893978111,
        "y": 8009
      },
      {
        "x": 7980,
        "y": 8009
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
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtLabel",
    "id": "2369ca87-43d5-837d-cc3e-448f9f9747e4",
    "x": 7980,
    "y": 7989,
    "width": 30.78125,
    "height": 21.25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "label"
    },
    "cssClass": "shape_designer_figure_ExtLabel",
    "ports": [],
    "bgColor": "#00BA00",
    "color": "#00BA00",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "text": "High",
    "outlineStroke": 0,
    "outlineColor": "#00BA00",
    "fontSize": 12,
    "fontColor": "#00BA00",
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
    "id": "fd38272c-22f5-46fb-3f8d-2d70036a8113",
    "x": 8016.0771,
    "y": 7994,
    "width": 10,
    "height": 10,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "name": "Port",
      "type": "Output",
      "direction": 1,
      "fanout": 20
    },
    "cssClass": "shape_designer_figure_ExtPort",
    "ports": [],
    "bgColor": "#00BA00",
    "color": "#00BA00",
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
      }
    ]
  }
];
var pkg='circuit_digital_signals_High';
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


