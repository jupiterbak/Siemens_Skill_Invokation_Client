import conf from "./Configuration"
import Hogan from "hogan.js";

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */

export default class Palette {
    /**
     * @constructor
     *
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    constructor() {
        let $grid = $("#paletteElements");
        var self = this;
        $.getJSON(conf.shapes.url + "index.json", function(data) {
            var _dataObj = self.arrayToObjectMap(data);
            console.log("_dataObj" + _dataObj);

            data.forEach(function(element) {
                element.basename = element.name.split("_").pop();
            });

            let tmpl = Hogan.compile($("#shapeTemplate").html());
            let html = tmpl.render({
                shapesUrl: conf.shapes.url,
                categories: Object.values(_dataObj)
            });

            $("#paletteElements").html(html);

            // Advanced filtering
            $('#filter').on('keyup change', function(event) {
                if (event.keyCode === 27) {
                    $('#filter').val("");
                }
                let val = this.value.toLowerCase();

                $(".pallette_item").each(function() {
                    var self = this;
                    let text = $.trim($(self).data("name")).toLowerCase();
                    if (text === "_request_") {
                        $(this).removeClass("hide");
                        return;
                    }
                    if (text.indexOf(val) !== -1) {
                        $(this).removeClass("hide");
                    } else {
                        $(this).addClass("hide");
                    }
                });
            });


            // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
            //
            $(".draw2d_droppable").draggable({
                appendTo: "body",
                helper: "clone",
                drag: function(event, ui) {
                    event = app.view._getEvent(event);
                    let pos = app.view.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                    app.view.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
                },
                stop: function(e, ui) {},
                start: function(e, ui) {
                    $(ui.helper).addClass("shadow");
                }
            });

            $('.draw2d_droppable')
                .on('mouseover', function() {
                    $(this).parent().addClass('glowBorder');
                })
                .on('mouseout', function() {
                    $(this).parent().removeClass('glowBorder');
                });

            // add the "+" to the palette
            //
            // let requestUrl =conf.issues.url+'?title=Request for shape&body='+encodeURIComponent("Please add the description of the shape you request.\nWe try to implement it as soon as possible...");
            // $("#paletteElements").append(
            //  '  <div data-name="_request_" class="mix col-md-6 pallette_item">'+
            //  '  <a href="'+requestUrl+'" target="_blank">'+
            //  '    <div class="request">'+
            //  '       <div class="icon ion-ios-plus-outline"></div>'+
            //  '       <div >Request a Shape</div>'+
            //  '   </div>'+
            //  '   </a>'+
            //  '  </div>');

            //    $("#paletteElements").append("<div>++</div>");
        });

        socket.on("shape:generating", function(msg) {
            $("div[data-file='" + msg.filePath + "'] ").addClass("spinner")
        });

        socket.on("shape:generated", function(msg) {
            $("div[data-file='" + msg.filePath + "'] ").removeClass("spinner")
            $("div[data-file='" + msg.filePath + "'] img").attr({ src: conf.shapes.url + msg.imagePath + "?timestamp=" + new Date().getTime() })
        });
    }

    arrayToObjectMap(array) {
        return array.reduce((obj, item) => {
            item["basename"] = item.name.split("_").pop();
            if (item.tags.length > 2) {
                obj[item.tags[0] + ":" + item.tags[1]] = obj[item.tags[0] + ":" + item.tags[1]] || { "shapes": [], "name": "" };
                item["category"] = item.tags[0] + ":" + item.tags[1];
                obj[item.tags[0] + ":" + item.tags[1]].name = item.tags[0] + ":" + item.tags[1];
                obj[item.tags[0] + ":" + item.tags[1]].shapes.push(item);
            } else {
                obj["Default"] = obj["Default"] || { "shapes": [], "name": "" };
                item["category"] = "Default";
                obj["Default"].name = "Default";
                obj["Default"].shapes.push(item);
            }
            return obj
        }, {});
    }
}