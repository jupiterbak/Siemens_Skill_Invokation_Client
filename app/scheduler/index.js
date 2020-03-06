// Load the http module to create an http server.
var env  = require('jsdom').env;
var fs   = require('fs');
var vm   = require("vm");


// first argument can be html string, filename, or url
env("<html></html>", function (errors, window) {

    var $ = require('jquery')(window);
    global["navigator"]= { platform :"node.js"};
    global["window"]=window;
    global["document"]={};
    global["debug"]={error:console.log, warn:console.log};
    global["Raphael"]={fn:{},el:{}};
    global["$"] = $;

    vm.runInThisContext(fs.readFileSync("./server/patched_Class.js"));
    vm.runInThisContext(fs.readFileSync("./server/draw2d.js"));

    global["DecoratedInputPort"]=draw2d.InputPort;
    global["ConnectionRouter"]=draw2d.layout.connection.DirectRouter;

    // load all shapes into the current environment
    //
    vm.runInThisContext(fs.readFileSync("./server/shapes.js"));


    // draw2d is loaded and you can now read some documents into a HeadlessCanvas
    //
    var json   =  JSON.parse(fs.readFileSync("./server/FullAdderTest.circuit"));
    var canvas = new draw2d.HeadlessCanvas();
    var reader = new draw2d.io.json.Reader();
    reader.unmarshal(canvas,json);


    var immediateId;

    function loop(){
        // call the "calculate" method if given to calculate the output-port values
        //
        canvas.getFigures().each(function(i,figure){
            figure.calculate();
        });

        // transport the value from outputPort to inputPort
        //
        canvas.getLines().each(function(i,line){
            var outPort = line.getSource();
            var inPort  = line.getTarget();
            inPort.setValue(outPort.getValue());
        });
        immediateId = setImmediate(loop);
    }
    loop();
});
