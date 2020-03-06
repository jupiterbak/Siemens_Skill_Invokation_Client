import app from "./Application"

let stack = app.view.getCommandStack()

// Return the one and only CommandStack instance.
// This is usefull for some clients to register some listener
// for changes. e.g. add/remove/change of shapes in the circuit
//
//
//
//
export default stack
