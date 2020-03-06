import MarkerFigure from "./MarkerFigure"

export default draw2d.InputPort.extend({

    NAME: "DecoratedInputPort",

    init : function(attr, setter, getter)
    {
        this.hasChanged = false;

        this._super(attr, setter, getter);

        this.decoration = new MarkerFigure();

        this.add(this.decoration, new draw2d.layout.locator.LeftLocator({margin:8}));

        this.on("disconnect",function(emitter, event){
            this.decoration.setVisible(this.getConnections().getSize()===0);

            // default value of a not connected port is always HIGH
            //
            if(this.getConnections().getSize()===0){
                this.setValue(true);
            }
        }.bind(this));

        this.on("connect",function(emitter, event){
            this.decoration.setVisible(false);
        }.bind(this));

        this.on("dragend",function(emitter, event){
            this.decoration.setVisible(this.getConnections().getSize()===0);
        }.bind(this));

        this.on("drag",function(emitter, event){
            this.decoration.setVisible(false);
        }.bind(this));

        // a port can have a value. Usefull for workflow engines or circuit diagrams
        this.setValue(true);
    },

    useDefaultValue:function()
    {
        this.decoration.setStick(true);
    },

    setValue:function(value)
    {
        this.hasChanged = this.value !==value;
        this._super(value);
    },

    hasChangedValue: function()
    {
        return this.hasChanged;
    },

    hasRisingEdge: function()
    {
        return this.hasChangedValue()&& this.getValue();
    },

    hasFallingEdge: function()
    {
        return this.hasChangedValue() && !this.getValue();
    }
});
