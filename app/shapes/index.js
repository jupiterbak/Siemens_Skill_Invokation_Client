// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var End = CircuitFigure.extend({

    NAME: "End",

    init: function(attr, setter, getter) {
        var _this = this;

        this._super($.extend({ stroke: 0, bgColor: null, width: 50, height: 50 }, attr), setter, getter);
        var port;
        // Port
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(10, 54));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port");
        port.setMaxFanOut(20);
    },

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 50;
        this.originalHeight = 50;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L50,0 L50,50 L0,50");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // Circle_Innen
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 25, "ry": 25, "cx": 25, "cy": 25, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_Innen");

        // Circle_Out
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 20, "ry": 20, "cx": 25, "cy": 25, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_Out");


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
End = End.extend({

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        this.attr({ resizeable: false });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    calculate: function() {
        if (this.getInputPort(0).getValue()) {
            this.layerAttr("Circle_Innen", { fill: "#C21B7A" });
            this.layerAttr("Circle_Out", { fill: "#C21B7A" });
        } else {
            this.layerAttr("Circle_Out", { fill: "#f0f0f0" });
            this.layerAttr("Circle_Innen", { fill: "#f0f0f0" });
        }
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop: function() {
        this.layerAttr("Circle_Out", { fill: "#f0f0f0" });
        this.layerAttr("Circle_Innen", { fill: "#f0f0f0" });
    },
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var localhost_4840_InsertSkill = CircuitFigure.extend({

    NAME: "localhost_4840_InsertSkill",

    init: function(attr, setter, getter) {
        var _this = this;

        this._super($.extend({ stroke: 0, bgColor: null, width: 209, height: 221 }, attr), setter, getter);
        var port;
        // Port_IN_0
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 43.21266968325792));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_0");
        port.setMaxFanOut(20);
        // Port_IN_1
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 49.09502262443439));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_1");
        port.setMaxFanOut(20);
        // Port_IN_2
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 54.97737556561086));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_2");
        port.setMaxFanOut(20);
        // Port_IN_3
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 60.85972850678733));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_3");
        port.setMaxFanOut(20);
        // Port_IN_4
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 66.7420814479638));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_4");
        port.setMaxFanOut(20);
        // Port_IN_5
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 72.62443438914028));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_5");
        port.setMaxFanOut(20);
        // Port_IN_6
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(2.3923444976076556, 78.50678733031674));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_IN_6");
        port.setMaxFanOut(20);
        // Port_OUT_0
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 43.21266968325792));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_OUT_0");
        port.setMaxFanOut(20);
        // Port_OUT_1
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(97.60765550239235, 49.09502262443439));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#1C9BAB");
        port.setName("Port_OUT_1");
        port.setMaxFanOut(20);
    },

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 209;
        this.originalHeight = 221;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L209,0 L209,221 L0,221");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // circle
        shape = this.canvas.paper.path('M4.241887499999393,6Q4.241887499999393,0 10.241887499999393, 0L198.2418874999994,0Q204.2418874999994,0 204.2418874999994, 6L204.2418874999994,215Q204.2418874999994,221 198.2418874999994, 221L10.241887499999393,221Q4.241887499999393,221 4.241887499999393, 215L4.241887499999393,6');
        shape.attr({ "stroke": "#303030", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "circle");

        // Name
        shape = this.canvas.paper.text(0, 0, 'InsertSkill');
        shape.attr({ "x": 61.95282499999939, "y": 13.5, "text-anchor": "start", "text": "InsertSkill", "font-family": "\"Arial\"", "font-size": 16, "stroke": "#FF0000", "fill": "#00979D", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Name");

        // Circle_IN_0
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 95.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_0");

        // Label_IN_0
        shape = this.canvas.paper.text(0, 0, 'Position');
        shape.attr({ "x": 13, "y": 95.1171875, "text-anchor": "start", "text": "Position", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_0");

        // Circle_IN_1
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 108.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_1");

        // Label_IN_1
        shape = this.canvas.paper.text(0, 0, 'BuildingBlockTypeId');
        shape.attr({ "x": 13, "y": 108.1171875, "text-anchor": "start", "text": "BuildingBlockTypeId", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_1");

        // Circle_IN_2
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 121.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_2");

        // Label_IN_2
        shape = this.canvas.paper.text(0, 0, 'Orientation');
        shape.attr({ "x": 13, "y": 121.1171875, "text-anchor": "start", "text": "Orientation", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_2");

        // Circle_IN_3
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 134.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_3");

        // Label_IN_3
        shape = this.canvas.paper.text(0, 0, 'RFID');
        shape.attr({ "x": 13, "y": 134.1171875, "text-anchor": "start", "text": "RFID", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_3");

        // Circle_IN_4
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 147.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_4");

        // Label_IN_4
        shape = this.canvas.paper.text(0, 0, 'CurrentConfiguration_BuildingBlockTypeId');
        shape.attr({ "x": 13, "y": 147.1171875, "text-anchor": "start", "text": "CurrentConfiguration_BuildingBlockTypeId", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_4");

        // Circle_IN_5
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 160.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_5");

        // Label_IN_5
        shape = this.canvas.paper.text(0, 0, 'CurrentConfiguration_Orientation');
        shape.attr({ "x": 13, "y": 160.1171875, "text-anchor": "start", "text": "CurrentConfiguration_Orientation", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_5");

        // Circle_IN_6
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 173.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_IN_6");

        // Label_IN_6
        shape = this.canvas.paper.text(0, 0, 'RFID');
        shape.attr({ "x": 13, "y": 173.1171875, "text-anchor": "start", "text": "RFID", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_IN_6");

        // Circle_OUT_0
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 204, "cy": 95.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_OUT_0");

        // Label_OUT_0
        shape = this.canvas.paper.text(0, 0, 'ErrorId');
        shape.attr({ "x": 146, "y": 95.1171875, "text-anchor": "start", "text": "ErrorId", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_OUT_0");

        // Circle_OUT_1
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 204, "cy": 108.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_OUT_1");

        // Label_OUT_1
        shape = this.canvas.paper.text(0, 0, 'ErrorId');
        shape.attr({ "x": 146, "y": 108.1171875, "text-anchor": "start", "text": "ErrorId", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_OUT_1");

        // led_power
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 6.090499999999338, "ry": 6.090499999999338, "cx": 33.61443749999853, "cy": 11.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#FF3C00", "dasharray": null, "opacity": 1 });
        shape.data("name", "led_power");

        // led_connected
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 6.090499999999338, "ry": 6.090499999999338, "cx": 16.797074999999495, "cy": 11.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#33DE09", "dasharray": null, "opacity": 1 });
        shape.data("name", "led_connected");

        // Skill_IP
        shape = this.canvas.paper.text(0, 0, 'localhost:4840');
        shape.attr({ "x": 48, "y": 42, "text-anchor": "start", "text": "localhost:4840", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_IP");

        // Skill_State
        shape = this.canvas.paper.text(0, 0, 'State: Stopped');
        shape.attr({ "x": 48, "y": 61, "text-anchor": "start", "text": "State: Stopped", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_State");

        // Skill_NodeID
        shape = this.canvas.paper.text(0, 0, 'NodeID: ns=4;i=1027');
        shape.attr({ "x": 48, "y": 78, "text-anchor": "start", "text": "NodeID: ns=4;i=1027", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_NodeID");


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
localhost_4840_InsertSkill = localhost_4840_InsertSkill.extend({

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        this.attr({ resizeable: false });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        var _this = this;
        this.onChangeCallback = function(emitter, event) {

        }

        this.onConnectedCallback = function(emitter, event) {

        }
    },

    calculate: function() {},

    propagate: function(index, port) {
        if (!port.getConnections().isEmpty()) {
            var con = port.getConnections().first();
            var other = con.getSource() === port ? con.getTarget() : con.getSource()
            if (other instanceof draw2d.InputPort) {

            } else {
                hardware.arduino.set(index, !!other.getValue())
            }
        }
    },

    /**
     *  Called if the simulation mode is starting
     **/
    onStart: function() {},

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop: function() {},

    setCanvas: function(canvas) {
        // deregister old listerener ...if exists
        if (this.canvas !== null) {
            hardware.arduino.off("connect", this.onConnectedCallback);
            hardware.arduino.off("disconnect", this.onConnectedCallback);
        }

        this._super(canvas);


    },

    getRequiredHardware: function() {
        return {
            raspi: false,
            arduino: true
        }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var Skill = CircuitFigure.extend({

    NAME: "Skill",

    init: function(attr, setter, getter) {
        var _this = this;

        this._super($.extend({ stroke: 0, bgColor: null, width: 208.51462500000162, height: 221 }, attr), setter, getter);
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

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 208.51462500000162;
        this.originalHeight = 221;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L208.51462500000162,0 L208.51462500000162,221 L0,221");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // circle
        shape = this.canvas.paper.path('M4.499200000000201,6Q4.499200000000201,0 10.4992000000002, 0L198.4992000000002,0Q204.4992000000002,0 204.4992000000002, 6L204.4992000000002,215Q204.4992000000002,221 198.4992000000002, 221L10.4992000000002,221Q4.499200000000201,221 4.499200000000201, 215L4.499200000000201,6');
        shape.attr({ "stroke": "#303030", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "circle");

        // Name
        shape = this.canvas.paper.text(0, 0, 'Skill Name');
        shape.attr({ "x": 62.2101375000002, "y": 38, "text-anchor": "start", "text": "Skill Name", "font-family": "\"Arial\"", "font-size": 16, "stroke": "#FF0000", "fill": "#00979D", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Name");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 71.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 84.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 97.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 110.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 123.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 136.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 149.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 162.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 175.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 188.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 203.51462500000162, "cy": 201.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 201.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 188.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 175.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 162.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 149.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 136.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 124.42379999999775, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 110.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 97.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 84.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 5, "ry": 5, "cx": 5, "cy": 71.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#F2F2F2", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D12');
        shape.attr({ "x": 11.5, "y": 202.1171875, "text-anchor": "start", "text": "D12", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D10');
        shape.attr({ "x": 12, "y": 175.79081250000036, "text-anchor": "start", "text": "D10", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D9');
        shape.attr({ "x": 11.663762500000303, "y": 162.5, "text-anchor": "start", "text": "D9", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D8');
        shape.attr({ "x": 12, "y": 149.83881250000104, "text-anchor": "start", "text": "D8", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D7');
        shape.attr({ "x": 12, "y": 136.86281250000138, "text-anchor": "start", "text": "D7", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D6');
        shape.attr({ "x": 12, "y": 124.6171875, "text-anchor": "start", "text": "D6", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D5');
        shape.attr({ "x": 12, "y": 111.1171875, "text-anchor": "start", "text": "D5", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D4');
        shape.attr({ "x": 12, "y": 98.1199875000002, "text-anchor": "start", "text": "D4", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D3');
        shape.attr({ "x": 12, "y": 85.02048749999994, "text-anchor": "start", "text": "D3", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D2');
        shape.attr({ "x": 12, "y": 72.04448750000029, "text-anchor": "start", "text": "D2", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D11');
        shape.attr({ "x": 12, "y": 188.734375, "text-anchor": "start", "text": "D11", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // Label
        shape = this.canvas.paper.text(0, 0, 'D13');
        shape.attr({ "x": 174.90659999999843, "y": 201.5, "text-anchor": "start", "text": "D13", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label");

        // led_power
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 6.090499999999338, "ry": 6.090499999999338, "cx": 33.87174999999934, "cy": 11.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#FF3C00", "dasharray": null, "opacity": 1 });
        shape.data("name", "led_power");

        // led_connected
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 6.090499999999338, "ry": 6.090499999999338, "cx": 17.054387500000303, "cy": 11.5, "stroke": "#1B1B1B", "stroke-width": 1, "fill": "#33DE09", "dasharray": null, "opacity": 1 });
        shape.data("name", "led_connected");

        // Skill_IP
        shape = this.canvas.paper.text(0, 0, '000.000.000.000:4840');
        shape.attr({ "x": 47.8195125000002, "y": 70.62924999999996, "text-anchor": "start", "text": "000.000.000.000:4840", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_IP");

        // Skill_State
        shape = this.canvas.paper.text(0, 0, 'State: Stopped');
        shape.attr({ "x": 49.8195125000002, "y": 90.09049999999934, "text-anchor": "start", "text": "State: Stopped", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_State");

        // Skill_NodeID
        shape = this.canvas.paper.text(0, 0, 'NodeID: ns=4;i=1090');
        shape.attr({ "x": 49.8195125000002, "y": 108, "text-anchor": "start", "text": "NodeID: ns=4;i=1090", "font-family": "\"Arial\"", "font-size": 12, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Skill_NodeID");


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

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        this.attr({ resizeable: false });
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        var _this = this;
        this.onChangeCallback = function(emitter, event) {
            if (event.value) {
                _this.layerAttr("led_d13", { fill: "#33DE09" });
            } else {
                _this.layerAttr("led_d13", { fill: "#f0f0f0" });
            }
        }

        this.onConnectedCallback = function(emitter, event) {
            if (hardware.arduino.connected) {
                _this.layerAttr("led_power", { fill: "#FF3C00" });
            } else {
                _this.layerAttr("led_power", { fill: "#f0f0f0" });
            }
        }
    },

    calculate: function() {
        this.propagate(2, this.getPort("port_d2"));
        this.propagate(3, this.getPort("port_d3"));
        this.propagate(4, this.getPort("port_d4"));
        this.propagate(5, this.getPort("port_d5"));
        this.propagate(6, this.getPort("port_d6"));
        this.propagate(7, this.getPort("port_d7"));
        this.propagate(8, this.getPort("port_d8"));
        this.propagate(9, this.getPort("port_d9"));
        this.propagate(10, this.getPort("port_d10"));
        this.propagate(11, this.getPort("port_d11"));
        this.propagate(12, this.getPort("port_d12"));
        this.propagate(13, this.getPort("port_d13"));
    },

    propagate: function(index, port) {
        if (!port.getConnections().isEmpty()) {
            var con = port.getConnections().first();
            var other = con.getSource() === port ? con.getTarget() : con.getSource()
            if (other instanceof draw2d.InputPort) {

            } else {
                hardware.arduino.set(index, !!other.getValue())
            }
        }
    },

    /**
     *  Called if the simulation mode is starting
     **/
    onStart: function() {
        this.getPort("port_d13").on("change:value", this.onChangeCallback);
    },

    /**
     *  Called if the simulation mode is stopping
     **/
    onStop: function() {
        this.getPort("port_d13").off("change:value", this.onChangeCallback);
    },

    setCanvas: function(canvas) {
        // deregister old listerener ...if exists
        if (this.canvas !== null) {
            hardware.arduino.off("connect", this.onConnectedCallback);
            hardware.arduino.off("disconnect", this.onConnectedCallback);
        }

        this._super(canvas);

        // register new listener...if requried
        if (this.canvas !== null) {
            hardware.arduino.on("connect", this.onConnectedCallback);
            hardware.arduino.on("disconnect", this.onConnectedCallback);

            this.onConnectedCallback();
            if (this.getPort("port_d13").getValue() && !this.getPort("port_d13").getConnections().isEmpty()) {
                this.onChangeCallback(this, { value: true })
            } else {
                this.onChangeCallback(this, { value: false })
            }
        }
    },

    getRequiredHardware: function() {
        return {
            raspi: false,
            arduino: true
        }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var START = CircuitFigure.extend({

    NAME: "START",

    init: function(attr, setter, getter) {
        var _this = this;

        this._super($.extend({ stroke: 0, bgColor: null, width: 30, height: 30 }, attr), setter, getter);
        var port;
        // Port
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(103.33333333333334, 49.44075946666696));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port");
        port.setMaxFanOut(20);
    },

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 30;
        this.originalHeight = 30;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();
        var shape = null;
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L30,0 L30,30 L0,30");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 15, "ry": 15, "cx": 15, "cy": 15, "stroke": "none", "stroke-width": 0, "fill": "#000000", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle");

        // Circle_
        shape = this.canvas.paper.ellipse();
        shape.attr({ "rx": 10, "ry": 10, "cx": 15, "cy": 15, "stroke": "none", "stroke-width": 0, "fill": "#000000", "dasharray": null, "opacity": 1 });
        shape.data("name", "Circle_");


        return this.canvas.paper.setFinish();
    }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
START = START.extend({

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate: function() {
        this.getOutputPort(0).setValue(true);
        this.layerAttr("Circle_", { fill: "#C21B7A" });
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart: function() {},

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop: function() {},

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function() {
        return {
            raspi: false,
            arduino: false
        }
    }

});