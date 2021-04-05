/**
 * The markerFigure is the left hand side annotation for a DecoratedPort.
 *
 * It contains two children
 *
 * StateAFigure: if the mouse hover and the figure isn't permanent visible
 * StateBFigure: either the mouse is over or the user pressed the checkbox to stick the figure on the port
 *
 * This kind of decoration is usefull for defualt values on workflwos enginges or circuit diagrams
 *
 */
import MarkerStateAFigure from "./LabeledMarkerStateAFigure"
import MarkerStateBFigure from "./LabeledMarkerStateBFigure"
import conf from "../Configuration"

export default draw2d.shape.layout.VerticalLayout.extend({

    NAME : "LabeledMarkerFigure",

    init : function(attr, setter, getter)
    {
        var _this = this;

        this.isMouseOver = false;        // indicator if the mouse is over the element
        this.stick       = false;        // indicator if the stateBFigure should always be visible
        this.defaultValue= true;         // current selected default value for the decoration

        this._super($.extend({
              stroke:0
        },attr),
        setter,
        getter);

        // figure if the decoration permanent visible
        this.add(this.stateB = new MarkerStateBFigure({text:"X"}));

        // figure if the decoration is not permanent visible (sticky note)
        this.add(this.stateA = new MarkerStateAFigure({text:"X"}));

        this.on("mouseenter",function(emitter, event){
            _this.onMouseOver(true);
        });

        this.on("mouseleave",function(emitter, event){
            _this.onMouseOver(false);
        });

        this.on("click",function(emitter, event){
            if (_this.isVisible() === false) {
                return;//silently
            }

            if(_this.stateB.getStickTickFigure().getBoundingBox().hitTest(event.x, event.y) === true){
                _this.setStick(!_this.getStick());
            }
            else if(_this.stateB.getLabelFigure().getBoundingBox().hitTest(event.x, event.y) === true){
                $.contextMenu({
                    selector: 'body',
                    trigger:"left",
                    events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },
                    callback: $.proxy(function(key, options)
                    {
                        // propagate the default value to the port
                        //
                        switch(key){
                            case "Stick":
                                //_this.setDefaultValue(true);
                                _this.setStick(true);
                                break;
                            case "Hide":
                                //_this.setDefaultValue(false);
                                _this.setStick(false);
                                break;
                            default:
                                break;
                        }

                    },this),
                    x:event.x,
                    y:event.y,
                    items:{
                        "Stick": {name: "Stick"},
                        "Hide":  {name: "Hide" }
                    }
                });
            }
        });
        this.setVisibleValue(0);
        this.setStick(false);
        this.onMouseOver(false);
    },

    onMouseOver: function(flag)
    {
        this.isMouseOver = flag;

        if(this.visible===false){
            return; // silently
        }

        if(this.stick===true) {
            this.stateA.setVisible(false);
            this.stateB.setVisible(true);
        }
        else{
            this.stateA.setVisible(!this.isMouseOver);
            this.stateB.setVisible( this.isMouseOver);
        }

        return this;
    },


    setVisible: function(flag)
    {
        this._super(flag);

        // update the hover/stick state of the figure
        this.onMouseOver(this.isMouseOver);

        return this;
    },


    setStick:function(flag)
    {
        this.stick = flag;
        this.onMouseOver(this.isMouseOver);

        this.stateB.setTick(this.getStick());

        return this;
    },


    getStick:function()
    {
        return this.stick;
    },


    setText: function(text)
    {
        this.stateB.setText(text);

        return this;
    },

    setVisibleValue: function(value)
    {
        this.defaultValue = value;
        this.setText((this.defaultValue)?""+this.defaultValue:"0");
        this.stateB.setTintColor((this.defaultValue)?conf.color.high:conf.color.low);
        this.stateB.setTick(this.getStick());
    }
});
