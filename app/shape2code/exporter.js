var json=[
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "23e1591b-1ccc-930d-7bb3-fea4d6f0707b",
    "x": 7985,
    "y": 7985,
    "width": 30,
    "height": 30,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\n * Generated Code for the Draw2D touch HTML5 lib.\n * File will be generated if you save the *.shape file.\n *\n * by 'Draw2D Shape Designer'\n *\n * Custom JS code to tweak the standard behaviour of the generated\n * shape. add your custom code and event handler here.\n *\n * Looks disconcerting - extending my own class. But this is a good method to\n * merge basic code and override them with custom methods.\n */\ntestShape = testShape.extend({\n\n    init: function(attr, setter, getter){\n        this._super(attr, setter, getter);\n        this.attr({resizeable:false});\n        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());\n         // your special code here\n    },\n\n    /**\n     *  Called by the simulator for every calculation\n     *  loop\n     *  @required\n     **/\n    calculate:function()\n    {\n        this.getOutputPort(0).setValue(true);\n        this.layerAttr(\"Circle_\", { fill: \"#faa50a\" });\n        \n    },\n\n\n    /**\n     *  Called if the simulation mode is starting\n     *  @required\n     **/\n    onStart:function()\n    {\n        this.getOutputPort(0).setValue(false);\n        this.layerAttr(\"Circle_\", { fill: \"#303030\" });\n    },\n\n    /**\n     *  Called if the simulation mode is stopping\n     *  @required\n     **/\n    onStop:function()\n    {\n        this.getOutputPort(0).setValue(false);\n        this.layerAttr(\"Circle_\", { fill: \"#303030\" });\n    },\n\n    /**\n     * Get the simulator a hint which kind of hardware the shapes requires or supports\n     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost\n     * and your are running a circuit which needs this kind of hardware...\n     **/\n    getRequiredHardware: function(){\n      return {\n        raspi: false,\n        arduino: false\n      }\n    }\n\n});",
      "name": "Circle",
      "markdown": "# T-FlipFlop\n\n## Description\n\nThe D FlipFLop is widely used. It is also known as a \n*toggle*  flip-flop.\n\nA T flip-flop is a device which swaps or **toggles** state \nevery time it is triggered if the T input is asserted, \notherwise it holds the current output.\n\n\nThe toggle flip-flop is also a frequency divider."
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#303030",
    "color": "#1B1B1B",
    "stroke": 0,
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
      }
    ]
  },
  {
    "type": "shape_designer.figure.PolyCircle",
    "id": "6564a81a-b89f-5e40-4f67-77280b2e29bf",
    "x": 7990,
    "y": 7989.83222784,
    "width": 20,
    "height": 20,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "baseClass": "draw2d.SetFigure",
      "code": "/**\n * Generated Code for the Draw2D touch HTML5 lib.\n * File will be generated if you save the *.shape file.\n *\n * by 'Draw2D Shape Designer'\n *\n * Custom JS code to tweak the standard behaviour of the generated\n * shape. add your custom code and event handler here.\n *\n * Looks disconcerting - extending my own class. But this is a good method to\n * merge basic code and override them with custom methods.\n */\ntestShape = testShape.extend({\n\n    init: function(attr, setter, getter){\n         this._super(attr, setter, getter);\n\n         // your special code here\n    },\n\n    /**\n     *  Called by the simulator for every calculation\n     *  loop\n     *  @required\n     **/\n    calculate:function()\n    {\n        this.getOutputPort(0).setValue(true);\n        this.layerAttr(\"Circle_\", { fill: \"#faa50a\" });\n    },\n\n\n    /**\n     *  Called if the simulation mode is starting\n     *  @required\n     **/\n    onStart:function()\n    {\n    },\n\n    /**\n     *  Called if the simulation mode is stopping\n     *  @required\n     **/\n    onStop:function()\n    {\n    },\n\n    /**\n     * Get the simulator a hint which kind of hardware the shapes requires or supports\n     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost\n     * and your are running a circuit which needs this kind of hardware...\n     **/\n    getRequiredHardware: function(){\n      return {\n        raspi: false,\n        arduino: false\n      }\n    }\n\n});",
      "name": "Circle_"
    },
    "cssClass": "shape_designer_figure_PolyCircle",
    "ports": [],
    "bgColor": "#303030",
    "color": "#1B1B1B",
    "stroke": 0,
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
      }
    ]
  },
  {
    "type": "shape_designer.figure.ExtPort",
    "id": "be07df8d-47d7-5e42-bb1a-576c53d9ddf5",
    "x": 8011,
    "y": 7994.83222784,
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
    "bgColor": "#37B1DE",
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
      }
    ]
  }
];
var pkg='START';
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


