/**
 * This is a nodejs program using puppeteer
 *
 */

var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs');
var atob = require('atob');
var file = process.argv[2];
var shape2CodeDir = process.argv[3];
var shapeDir = process.argv[4];

function fileToPackage(file) {
    return file.replace(shapeDir, "").replace(".shape", "");
}

function shape2CodePath(file) {
    return shape2CodeDir + file;
}

function concatFiles(dirname) {
    var indexFile = dirname + "index.js";
    var jsonFile = dirname + "index.json";
    var content = "";
    var list = [];
    try { fs.unlinkSync(indexFile); } catch (exc) {}
    try { fs.unlinkSync(jsonFile); } catch (exc) {}

    var filenames = fs.readdirSync(dirname);
    filenames.forEach(function(filename) {
        if (/\.(js)$/.test(filename)) {
            var name = filename.replace(".js", "");
            var tags = name.split("_");
            list.push({
                name: name,
                tags: tags,
                filePath: name + ".shape"
            });
            content += (fs.readFileSync(dirname + filename, 'utf-8') + "\n\n\n")
        }
    });
    fs.writeFileSync(jsonFile, JSON.stringify(list, undefined, 2));
    fs.writeFileSync(indexFile, content);
}

function waitFor($config) {
    $config._start = $config._start || new Date();

    if ($config.timeout && new Date - $config._start > $config.timeout) {
        if ($config.error) $config.error();
        if ($config.debug) console.log('timedout ' + (new Date - $config._start) + 'ms');
        return;
    }

    if ($config.check()) {
        if ($config.debug) console.log('success ' + (new Date - $config._start) + 'ms');
        return $config.success();
    }

    setTimeout(waitFor, $config.interval || 0, $config);
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 900 });
    page.on('console', msg => {
        //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
        for (let i = 0; i < msg.args.length; ++i)
          console.log(`${i}: ${msg.args[i]}`);
    });

    page.on('error', error => {
        console.error(error);
        /*
        var msgStack = ['ERROR: ' + error.message];  
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }  
        console.error(msgStack.join('\n'));
        */
    });

    await page.goto('http://localhost:7400/designer').then(async function(response){
            // fulfillment
            console.log('Status: ' + response.status());
            if (response.ok()) {
                console.log("Processing: " + file);
                var json = JSON.parse(fs.readFileSync(file));
                if (json.draw2d) {
                    json = json.draw2d;
                }
                json = JSON.stringify(json, undefined, 2);
                var pkg = fileToPackage(file);
                
                var eval_results = await page.evaluate((_json, _pkg) => {
                    var json = _json;
                    var pkg= _pkg;                    
                    //app.fileNew();                                   
                    
                    var code = null;
                    var img  = null;

                    var reader = new draw2d.io.json.Reader();
                    reader.unmarshal(app.view,json);
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
                    
                    return {
                        jsCode:code,
                        customCode: customCode,
                        markdown: markdown,
                        img: img
                    };
                }, json, pkg);

                var pngFilePath = file.replace(".shape", ".png");
                var jsFilePath = file.replace(".shape", ".js");
                var customFilePath = file.replace(".shape", ".custom");
                var markdownFilePath = file.replace(".shape", ".md");

                // replace the generated "testShape" with the real figure name
                //
                var jsCode = eval_results.jsCode.replace(/testShape/g, pkg);
                var customCode = eval_results.customCode.replace(/testShape/g, pkg);
                var markdown = eval_results.markdown;
                var img = eval_results.img;

                fs.writeFileSync(jsFilePath, jsCode);
                fs.writeFileSync(customFilePath, customCode);
                fs.writeFileSync(markdownFilePath, markdown);
                fs.writeFileSync(pngFilePath, Buffer.from(img,"base64"));

                concatFiles(shapeDir);
            }else{
                console.log("Puppeteer could not open the URL sucessfully. Status code: " + response.status());
                await browser.close();
            }        
       }, 
       function(reason) {
        // rejection
        console.log('Error lunching the browser: ' + reason.toString());
     });

    await browser.close();
})();