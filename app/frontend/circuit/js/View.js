/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Jupiter Bakakeu
 */
import ProbeWindow from "./ProbeWindow";
import ConnectionRouter from "./ConnectionRouter";
import DropInterceptorPolicy from "./DropInterceptorPolicy";
import EditEditPolicy from "./EditEditPolicy";
import ProbeFigure from "./figures/ProbeFigure";
import conf from "./Configuration";
import Connection from "./figures/Connection";
import SimulationEditPolicy from "./SimulationEditPolicy";
import MarkdownDialog from "./dialog/MarkdownDialog";
import WebUSBHelpDialog from "./dialog/WebUSBHelpDialog";

import hardware from "./hardware";

import imgConnectionStatusNeutral from "../images/status_index.svg";
import imgConnectionStatusTrue from "../images/status_index_true.svg";
import imgConnectionStatusFalse from "../images/status_index_false.svg";

require("bootstrap-toggle/css/bootstrap-toggle.min.css");
require("bootstrap-toggle/js/bootstrap-toggle.min");

export default draw2d.Canvas.extend({

    init: function(id) {
        let _this = this;

        this._super(id, 6000, 6000);

        this.probeWindow = new ProbeWindow(this);
        this.log = application_log;

        // Orchestration graph
        this.orchestration_graph = {
            nodes:{},
            transitions:{}
        };

        // global context where objects can store data during different simulation steps.
        // OTHER object can read them. Useful for signal handover
        this.simulationContext = {};

        this.simulate = false;
        this.animationFrameFunc = this._calculate.bind(this);

        this.timerBase = 50; // ms calculate every 10ms all elements

        this.setScrollArea("#draw2dCanvasWrapper");

        // register this class as event listener for the canvas
        // CommandStack. This is required to update the state of
        // the Undo/Redo Buttons.
        //
        this.getCommandStack().addEventListener(this);

        let router = new ConnectionRouter();
        router.abortRoutingOnFirstVertexNode = false;
        let createConnection = this.createConnection = function(sourcePort, targetPort) {
            let c = new Connection({
                color: "#000000",
                router: router,
                stroke: 1.5,
                radius: 2
            });
            // NOTE: Jupiter - Try to include Spline pattern for connections
            // c.setRouter(new draw2d.layout.connection.SplineConnectionRouter());
            if (sourcePort) {
                c.setSource(sourcePort);
                c.setTarget(targetPort);
            }
            c.on("connect", (emitter, event)=>{
                emitter.attr("stroke", event.port.getSemanticGroup()==="data"?4:1.5);
            });
            return c;
        };

        this.installEditPolicy(new DropInterceptorPolicy());

        // install a Connection create policy which matches to a "circuit like"
        // connections
        //
        this.connectionPolicy = new draw2d.policy.connection.ComposedConnectionCreatePolicy(
            [
                // create a connection via Drag&Drop of ports
                //
                new draw2d.policy.connection.DragConnectionCreatePolicy({
                    createConnection: createConnection
                }),
                // or via click and point
                //
                new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
                    createConnection: createConnection
                })
            ]);
        this.installEditPolicy(this.connectionPolicy);

        // show the ports of the elements only if the mouse cursor is close to the shape.
        // NOTE: Change CoronaDecorationPolicy --> DecorationPolicy
        this.coronaFeedback = new draw2d.policy.canvas.DecorationPolicy({diameterToBeVisible: 50});
        this.installEditPolicy(this.coronaFeedback);

        // nice grid decoration for the canvas paint area
        //
        this.grid = new draw2d.policy.canvas.ShowGridEditPolicy(20);
        this.installEditPolicy(_this.grid);
        $('#canvas_config_grid').on('change', () => {
            if ($('#canvas_config_grid').prop('checked')) {
                this.installEditPolicy(_this.grid);
            }
            else {
                this.uninstallEditPolicy(_this.grid);
            }
        });

        // add some SnapTo policy for better shape/figure alignment
        //
        this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy());
        this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy());
        this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy());

        this.installEditPolicy(new EditEditPolicy());

        // Enable Copy&Paste for figures
        //
        Mousetrap.bindGlobal(['ctrl+c', 'command+c'], () => {
            // ctrl+c and ctrl+v works just for normal figures and not connections
            //
            this.getSelection().each( (i, figure)=>{
                if (figure instanceof CircuitFigure) {
                    _this.clippboardFigure = figure.clone({excludePorts: true});
                    _this.clippboardFigure.translate(5, 5);
                    return false;
                }
            })
            return false
        })
        Mousetrap.bindGlobal(['ctrl+v', 'command+v'], () => {
            if (this.clippboardFigure !== null) {
                let cloneToAdd = this.clippboardFigure.clone({excludePorts: true});
                let command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition());
                this.getCommandStack().execute(command);
                this.setCurrentSelection(cloneToAdd);
            }
            return false;
        });
        Mousetrap.bindGlobal(['left'], function(event) {
            let diff = _this.getZoom() < 0.5 ? 0.5 : 1;
            _this.getSelection().each(function(i, f) {
                f.translate(-diff, 0);
            })
            return false;
        });
        Mousetrap.bindGlobal(['up'], function(event) {
            let diff = _this.getZoom() < 0.5 ? 0.5 : 1;
            _this.getSelection().each(function(i, f) {
                f.translate(0, -diff);
            });
            return false;
        });
        Mousetrap.bindGlobal(['right'], function(event) {
            let diff = _this.getZoom() < 0.5 ? 0.5 : 1;
            _this.getSelection().each(function(i, f) {
                f.translate(diff, 0);
            });
            return false;
        });
        Mousetrap.bindGlobal(['down'], function(event) {
            let diff = _this.getZoom() < 0.5 ? 0.5 : 1;
            _this.getSelection().each(function(i, f) {
                f.translate(0, diff);
            });
            return false;
        });


        let setZoom = (newZoom) => {
            let bb = this.getBoundingBox().getCenter();
            let c = $("#draw2dCanvasWrapper");
            this.setZoom(newZoom);
            this.scrollTo((bb.y / newZoom - c.height() / 2), (bb.x / newZoom - c.width() / 2));
        };

        //  ZoomIn Button and the callbacks
        //
        $("#canvas_zoom_in").on("click", () => {
            setZoom(this.getZoom() * 1.2);
        });

        // OneToOne Button
        //
        $("#canvas_zoom_normal").on("click", () => setZoom(1.0));

        //ZoomOut Button and the callback
        //
        $("#canvas_zoom_out").on("click", () => setZoom(_this.getZoom() * 0.8));

        $("#statusWebUSB .help-link").on("click", () => new WebUSBHelpDialog().show())

        hardware.arduino.on("disconnect", this.hardwareChanged.bind(this));
        hardware.arduino.on("connect", this.hardwareChanged.bind(this));
        hardware.raspi.on("disconnect", this.hardwareChanged.bind(this));
        hardware.raspi.on("connect", this.hardwareChanged.bind(this));


        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        let isHTTPS = location.protocol === 'https:';
        if (isChrome && isHTTPS) {
            $('#statusWebUSB').on("click", () => {
                if (hardware.arduino.connected) {
                    hardware.arduino.disconnect();
                } else {
                    hardware.arduino.connect();
                }
            });
        } else {
            $('#statusWebUSB').addClass("disabled");
        }


        this.deleteSelectionCallback = function() {
            let selection = _this.getSelection();
            _this.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            selection.each(function(index, figure) {

                    // Don't delete the conection if the source or target node part of the
                    // selection. In this case the nodes deletes all connections by itself.
                    //
                    if (figure instanceof draw2d.Connection) {
                        if (selection.contains(figure.getSource().getRoot()) || selection.contains(figure.getTarget().getRoot())) {
                            return;
                        }
                    }

                    let cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                    if (cmd !== null) {
                        _this.getCommandStack().execute(cmd);
                    }
                })
                // execute all single commands at once.
            _this.getCommandStack().commitTransaction();
        };

        $(".toolbar").delegate("#editDelete:not(.disabled)", "click", this.deleteSelectionCallback);
        Mousetrap.bindGlobal(['del', 'backspace'], this.deleteSelectionCallback);


        $(".toolbar").delegate("#editUndo:not(.disabled)", "click", function() {
            _this.getCommandStack().undo();
        });
        Mousetrap.bindGlobal(['ctrl+z', 'command+z'], () => {
            _this.getCommandStack().undo();
            return false;
        });

        $(".toolbar").delegate("#editRedo:not(.disabled)", "click", function() {
            _this.getCommandStack().redo();
        });
        Mousetrap.bindGlobal(['ctrl+y', 'command+y'], () => {
            _this.getCommandStack().redo();
            return false;
        });

        $("#simulationStartStop").on("click", function() {
            _this.simulationToggle();
        });


        // Register a Selection listener for the state handling
        // of the Delete Button
        //
        this.on("select", function(emitter, event) {
            $("#editDelete").removeClass("disabled");
        });
        this.on("unselect", function(emitter, event) {
            $("#editDelete").addClass("disabled");
        });

        this.on("contextmenu", function(emitter, event) {
            let figure = _this.getBestFigure(event.x, event.y)

            // a connection provides its own context menu
            //
            if (figure instanceof draw2d.Connection) {
                return
            }
            if (figure instanceof ProbeFigure) {
                return
            }

            if (figure !== null) {
                let x = event.x
                let y = event.y
                let items = {}

                if (figure instanceof CircuitFigure) {
                    // Try to get the skill description if there is one.
                    let obj_descr = $.ajax({
                        url: conf.backend.skill.getDescription,
                        type: "GET",
                        async: false,
                        xhrFields: {
                          withCredentials: true
                        },                        
                        data: {
                          skill_name: figure.NAME,
                        }
                      }).responseJSON;

                    let pathToMD = conf.shapes.url + figure.NAME + ".md"
                    items = {
                        "label": { name: "Attach Label", icon: "x ion-ios-pricetag-outline" },
                        "delete": { name: "Delete", icon: "x ion-ios-close-outline" },
                        "sep1": "---------"
                    }

                    if(! obj_descr.err){
                        let _obj = JSON.parse(obj_descr.skill_descp);
                        items["monitor"] = { name: "Monitor Skill", icon: "x ion-ios-compose-outline", url: conf.monitor.url + "?skill=" + _obj.skill.name + "&ip=" + _obj.ip + "&port=" + _obj.port};
                        items["sep2"] = "---------";

                    }
                    items["help"] = { name: "Info", icon: "x ion-ios-information-outline" , url: pathToMD };
                    
                } else if (figure instanceof draw2d.shape.basic.Label) {
                  items = {
                    "delete": {name: "Delete", icon: "x ion-ios-close-outline"}
                  }
                } else if (figure instanceof draw2d.Port) {
                  return
                } else {
                  items = {
                    "label": {name: "Attach Label", icon: "x ion-ios-pricetag-outline"},
                    "help": {name: "Description", icon: "x ion-ios-information-outline"},
                    "sep1": "---------",
                    "delete": {name: "Delete", icon: "x ion-ios-close-outline"}
                  }
                }

                $.contextMenu({
                    selector: 'body',
                    events: {
                        hide: function() {
                            $.contextMenu('destroy')
                        }
                    },
                    callback: $.proxy(function(key, options) {
                        switch (key) {
                            case "label":
                                let text = prompt("Label")
                                if (text) {
                                    let label = new draw2d.shape.basic.Label({text: text, stroke: 0, x: -20, y: -40})
                                    let locator = new draw2d.layout.locator.SmartDraggableLocator()
                                    label.installEditor(new LabelInplaceEditor())
                                    figure.add(label, locator)
                                    Object.defineProperty(figure, "canvas", {configurable: false, writable: false})
                                }
                                break
                            case "monitor":
                                window.open(options.items.monitor.url, "skill")
                                break
                            case "help":
                                $.get(options.items.help.url, function(content) {
                                    new MarkdownDialog().show(content)
                                })
                                break
                            case "delete":
                                let cmd = new draw2d.command.CommandDelete(figure)
                                _this.getCommandStack().execute(cmd)
                                break
                            default:
                                break
                        }

                    }, this),
                    x: x,
                    y: y,
                    items: items
                })
            }
        });

        // hide the figure configuration dialog if the user clicks inside the canvas
        //
        this.on("click", function() {
            $("#figureConfigDialog").hide();
        });

        socket.on("shape:generated", msg => {
            $.getScript(conf.shapes.url + msg.jsPath + "?timestamp=" + new Date().getTime(),
                this.reloadFromCache.bind(this)
            );
        });

        this.slider = $('#simulationBaseTimer')
            .slider({
                id: "simulationBaseTimerSlider"
            })
            .on("slide", function(event) {
                // min = 50     => 100ms
                // norm= 100    => 10ms ticks
                // max = 500    =>  2ms ticks
                //
                // To map between the different intervals
                // [A, B] --> [a, b]
                // use this formula
                // (val - A)*(b-a)/(B-A) + a

                if (event.value < 100) {
                    _this.timerBase = parseInt(100 - ((event.value - 50) * (100 - 10) / (100 - 50) + 10))
                } else {
                    _this.timerBase = parseInt(11 - ((event.value - 100) * (10 - 2) / (500 - 100) + 2))
                }
            });
        
            this.connectionStatusChanged();
    },

    isSimulationRunning: function() {
        return this.simulate;
    },


    getTimerBase: function () {
        return this.timerBase;
      },
    
      setTimerBase: function (timerBase) {
        this.timerBase = timerBase
    
        if (this.timerBase > 10)
          this.slider.slider("setValue", -((timerBase - 100) * ((100 - 50) + 10)) / (100 - 10) + 50)
        else
          this.slider.slider("setValue", (((-(timerBase - 11) - 2) * (500 - 100)) / (10 - 2)) + 100)
      },

    /**
     * @method
     * Clear the canvas and stop the simulation. Be ready for the next clean circuit
     * load. Start from the beginning
     */
    clear: function() {
        this.simulationStop();

        this._super();

        this.centerDocument();
    },

    /**
     * Disable snapTo GRID if we have select more than one element
     * @param figure
     * @param pos
     */
    snapToHelper: function(figure, pos) {
        if (this.getSelection().getSize() > 1) {
            return pos;
        }
        return this._super(figure, pos);
    },

    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey) {
        let type = $(droppedDomNode).data("shape")
        let file = $(droppedDomNode).data("file")
        let figure = new draw2d.shape.basic.Label({
            text: `Unable to load shape '${type}'`,
            color: "#ff0000"
        })
        try {
            figure = eval("new " + type + "();") ;// jshint ignore:line

            // required to calculate the filepath for markdown/js/shape
            //
            figure.attr("userData.file", file);
        }
        catch(exc){
            console.log(exc);
        }

        // create a command for the undo/redo support
        let command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
    },

    simulationToggle: function() {
        if (this.simulate === true) {
            this.simulationStop();
        } else {
            this.simulationStart();
        }
    },

    simulationStart: function() {
        let self = this;
        this.log.info('[Scheduler] Simulation startet');

        if (this.simulate === true) {
            return // silently
        }


        this.simulate = true

        this.installEditPolicy(new SimulationEditPolicy())
        this.uninstallEditPolicy(this.connectionPolicy)
        // this.uninstallEditPolicy(this.coronaFeedback)
        // this.commonPorts.each(function(i, p) {
        //     p.setVisible(false)
        // })
        this.simulationContext = {}
        // reset the connection colors
        this.getLines().each(function(i, line) {
            line.setColor(conf.color.low);
        })

        this.getFigures().each( (index, shape) => {
            shape.onStart(self.simulationContext)
          })
        this._calculate()

        $("#simulationStartStop").addClass("pause")
        $("#simulationStartStop").removeClass("play")
        // $(".editBase").fadeOut("slow", () => {
        //     $(".simulationBase").fadeIn("slow")
        // })
        $("#paletteElementsOverlay").fadeIn("fast")
        $("#paletteElementsOverlay").height($("#paletteElements").height())
        this.slider.slider("setValue", 100)
    },

    simulationStop: function() {
        this._calculate()
        this.simulate = false
        // this.commonPorts.each(function(i, p) {
        //     p.setVisible(true)
        // })
        this.installEditPolicy(new EditEditPolicy())
        this.installEditPolicy(this.connectionPolicy)
        // this.installEditPolicy(this.coronaFeedback)

        this.getFigures().each( (index, shape) =>{
            shape.onStop(this.simulationContext)
          })
        this.simulationContext = {}

        // NOTE: Jupiter
        // change the line colors to black again
        this.getLines().each(function(i, line) {
            line.setColor("#000000");
        });

        $("#simulationStartStop").addClass("play")
        $("#simulationStartStop").removeClass("pause")
        // $(".simulationBase").fadeOut("slow", () => {
        //     $(".editBase").fadeIn("slow")
        // })
        $("#paletteElementsOverlay").fadeOut("fast")
        this.log.info('[Scheduler] Simulation stopped.');
    },

    _calculate: function() {
        // call the "calculate" method if given to calculate the output-port values
        //
        var self = this;
        this.getFigures().each(function(i, figure) {
            figure.calculate(self.simulationContext)
        })

        // transport the value from outputPort to inputPort
        //
        this.getLines().each(function(i, line) {
            let outPort = line.getSource()
            let inPort = line.getTarget()
            inPort.setValue(outPort.getValue())
            line.setColor(outPort.getValue() ? conf.color.high : conf.color.low)
        })

        if (this.simulate === true) {
            //     setImmediate(this.animationFrameFunc);
            setTimeout(this.animationFrameFunc, this.timerBase)
        }

        this.probeWindow.tick(this.timerBase);
    },

    /**
     * @method
     * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
     * can be used to identify the type of event which has occurred.
     *
     * @template
     *
     * @param {draw2d.command.CommandStackEvent} event
     **/
    stackChanged: function(event) {
        if (event.isPreChangeEvent()) {
            return // silently
        }

        $("#editUndo").addClass("disabled")
        $("#editRedo").addClass("disabled")

        if (event.getStack().canUndo()) {
            $("#editUndo").removeClass("disabled")
        }

        if (event.getStack().canRedo()) {
            $("#editRedo").removeClass("disabled")
        }

        this.hardwareChanged();
        this.connectionStatusChanged();
    },

    hardwareChanged: function() {
        // check if a new element is added which requires or provides special hardware
        // support. In this case we can update the UI with some status indicator
        //
        // NOTE: Jupiter Remove Aduino support
        /*
        let elements = this.getFigures().clone().asArray()
        elements = elements.filter(element => element.getRequiredHardware)
        let arduinoRequired = elements.reduce((sum, cur) => sum || cur.getRequiredHardware().arduino, false)
        let raspiRequired = elements.reduce((sum, cur) => sum || cur.getRequiredHardware().raspi, false)
        let raspiConnected = hardware.raspi.connected
        let arduinoConnected = hardware.arduino.connected

        // Det the status of top button for the pulldown menu.
        //
        if (arduinoRequired === false && raspiRequired === false) {
            $("#editConnections").attr("src", imgConnectionStatusNeutral)
        } else {
            let error =
                (raspiRequired === true && raspiConnected === false) ||
                (arduinoRequired === true && arduinoConnected === false)
            $("#editConnections").attr("src", error ? imgConnectionStatusFalse : imgConnectionStatusTrue)
        }

        // set the status indicator for the arduino webusb connections
        //
        if (arduinoConnected) {
            $("#statusWebUSB").removeClass("error")
        } else {
            $("#statusWebUSB").addClass("error")
        }

        // set the status indicator for the arduino webusb connections
        //
        if (raspiConnected) {
            $("#statusRaspi").removeClass("error")
        } else {
            $("#statusRaspi").addClass("error")
        }
        */
    },

    connectionStatusChanged: function() {
        // check if a connection to the skill monitoring is avialable
        // In this case we can update the UI with some status indicator
        //
        var self = this;
        // Set connection status to normal first
        $("#editConnections").attr("src", imgConnectionStatusNeutral)

        // set the status depending to the results of the backend call
        skillproxy.checkBackendSkill().then(function (resp_call) {
            $("#editConnections").attr("src", resp_call.err ? imgConnectionStatusFalse : imgConnectionStatusTrue);
            if(resp_call.err){
                self.log.error('[View] Backend not connected: ' + resp_call.err);
            }          
        });
    },

    getBoundingBox: function() {
        let xCoords = []
        let yCoords = []
        this.getFigures().each(function(i, f) {
            let b = f.getBoundingBox()
            xCoords.push(b.x, b.x + b.w)
            yCoords.push(b.y, b.y + b.h)
        })
        this.getLines().each(function (i, f) {
            let b = f.getBoundingBox()
            xCoords.push(b.x, b.x + b.w)
            yCoords.push(b.y, b.y + b.h)
          })
        let minX = Math.min.apply(Math, xCoords)
        let minY = Math.min.apply(Math, yCoords)
        let width = Math.max(100, Math.max.apply(Math, xCoords) - minX)
        let height = Math.max(100, Math.max.apply(Math, yCoords) - minY)

        return new draw2d.geo.Rectangle(minX, minY, width, height)
    },

    reloadFromCache: function() {
        new draw2d.io.json.Writer().marshal(this, json => {
            draw2d.Canvas.prototype.clear.call(this)
            new draw2d.io.json.Reader().unmarshal(this, json)
        })
    },

    centerDocument: function() {
        this.setZoom(1.0)
        let c = $("#draw2dCanvasWrapper")
        if (this.getFigures().getSize() > 0) {
            // get the bounding box of the document and translate the complete document
            // into the center of the canvas. Scroll to the top left corner after them
            //
            let bb = this.getBoundingBox()
            this.scrollTo(bb.y - c.height() / 2 + bb.h / 2, bb.x - c.width() / 2 + bb.w / 2)
        } else {
            let bb = {
                x: this.getWidth() / 2,
                y: this.getHeight() / 2
            }
            this.scrollTo(bb.y - c.height() / 2, bb.x - c.width() / 2)
        }
    },

    /**
     * @method
     * Transforms a document coordinate to canvas coordinate.
     *
     * @param {Number} x the x coordinate relative to the window
     * @param {Number} y the y coordinate relative to the window
     *
     * @returns {draw2d.geo.Point} The coordinate in relation to the canvas [0,0] position
     */
    fromDocumentToCanvasCoordinate: function(x, y) {
        return new draw2d.geo.Point(
            (x - this.getAbsoluteX()) * this.zoomFactor,
            (y - this.getAbsoluteY()) * this.zoomFactor)
    },

    /**
     * @method
     * Transforms a canvas coordinate to document coordinate.
     *
     * @param {Number} x the x coordinate in the canvas
     * @param {Number} y the y coordinate in the canvas
     *
     * @returns {draw2d.geo.Point} the coordinate in relation to the document [0,0] position
     */
    fromCanvasToDocumentCoordinate: function(x, y) {
        return new draw2d.geo.Point(
            ((x * (1 / this.zoomFactor)) + this.getAbsoluteX()),
            ((y * (1 / this.zoomFactor)) + this.getAbsoluteY()))
    },
    
    /**
     * @method
     * Ger the orchestration sequence as a graph.
     *
     * @returns a JSON object specify the orchestration graph
     */
    getOrchestrationGraph: function() {
        var self = this;
        // Reinitialize the graph
        self.orchestration_graph = {
            nodes:{},
            transitions:{}
        };

        // Get all 'START' Nodes
        var start_nodes = self.getStartNodes();
        start_nodes.forEach(function(node, i) {
            self.folowNode(node);
        });

        return self.orchestration_graph;
    },

    folowNode: function(node, _callback) {
        var self = this;

        // Add Node to graph nodes
        self.orchestration_graph.nodes[node.id] = {
            id:node.id,
            name:node.NAME,
        }
        
        // Complete with the graph description
        // skillproxy.getSkillDescription(node.NAME).then(function (desc) {
        //     if (desc.skill_descp){
        //         self.orchestration_graph.nodes[node.id]['formulas'] = [node.NAME];                
        //     }else{
        //         self.orchestration_graph.nodes[node.id]['formulas'] = [];
        //     }
        // });

        // Filter all transitions of type 'signals'
        let transitions = node.getOutputPorts().data.filter(_trans => _trans.getSemanticGroup()==="signal")
        .map(function callback(_o_port) {
            return _o_port.connections.data;
        }).reduce(function callback(acc, cur) {
            acc = acc || [];
            return acc.concat(cur);
        },[]);

        // Get all transitions that haven been added
        let new_transitions = transitions.filter(function(_e_trans, i) {
            return !(self.orchestration_graph.transitions[_e_trans.id])
        });

        // Add the new transitions
        new_transitions.forEach(function(_n_trans, i) {
            var _t = _n_trans.getTarget()
            var _r = _t.getRoot();

            self.orchestration_graph.transitions[_n_trans.id] = {
                id:_n_trans.getId(),
                source: {
                    id: node.getId(),
                    name: node.NAME
                },
                target:{
                    id:_r.id,
                    name:_r.NAME
                }
            }
            if(!(self.orchestration_graph.nodes[_r.id])){
                self.folowNode(_r);
            }            
        });
    },

    /**
     * @method
     * Filter all the figures to get the 'START' nodes.
     *
     * @returns Array of 'START' nodes figures
     */
    getStartNodes: function() {
        var self = this;
        return this.getFigures().data.filter(function(figure, i) {
            return figure.NAME === 'START';
        });      
    }
})