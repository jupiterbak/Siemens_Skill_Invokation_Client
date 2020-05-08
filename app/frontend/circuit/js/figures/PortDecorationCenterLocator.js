

/**
 * @class
 *
 * A CenterLocator is used to place figures in the center of a parent shape.
 *
 *
 *
 * @example
 *
 *
 *    // create a basic figure and add a Label/child via API call
 *    //
 *    let circle = new draw2d.shape.basic.Circle({diameter:120});
 *    circle.setStroke(3);
 *    circle.setColor("#A63343");
 *    circle.setBackgroundColor("#E65159");
 *    circle.add(new draw2d.shape.basic.Label({text:"Center Label"}), new draw2d.layout.locator.CenterLocator());
 *    canvas.add( circle, 100,50);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
let Locator  = draw2d.layout.locator.Locator.extend(
  /** @lends draw2d.layout.locator.CenterLocator.prototype */
  {

  NAME: "draw2d.layout.locator.CenterLocator",

  /**
   * Constructs a locator with associated parent.
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * 
   * Relocates the given Figure.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    target.setCenter(0 ,0)
  }
})

let locator = new Locator()
export default locator
