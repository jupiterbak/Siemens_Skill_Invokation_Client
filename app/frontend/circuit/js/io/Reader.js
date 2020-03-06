

var Reader = draw2d.io.json.Reader.extend({

    init:function(){
        this._super();
    },

    unmarshal:function(view, fileData)
    {
        // new JSON format with draw2&image content
        if(fileData.draw2d){
            this._super(view, fileData.draw2d);
        }
        // native JSON format
        else{
            this._super(view, fileData);
        }
    },

    createFigureFromType:function(type)
    {
        // path object types from older versions of JSON
        if(type === "draw2d.Connection"){
            type = "Connection";
        }

        return this._super(type);
    }
});
