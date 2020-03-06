/**
 * Registry of all available devices (connected via RF24 adapter) and of the hub GPIO pins.
 * The hub could be an RaspberryPi or and Arduino.
 *
 * The "hub" is the receiver for the connected devices and expose its own
 * GPIO pins as well.
 */
import serial from "./serial"
import EventEmitter from "./util/EventEmitter"

let values = {}
let socket = null
let usbPort = null


export default {
  /**
   * Init the listener for the socket.io events
   * Events could be
   *  - changes on the GPIO pins
   *
   * @param s
   */
  init: function (s) {
    socket = s
    // GPIO from RasperyPi
    //
    socket.on("gpo:change", msg =>{
      values[msg.pin] = !!parseInt(msg.value)
    })

    socket.on('disconnect',  () => {
      this.raspi.emit("disconnect")
    })
    socket.on('connect',  () => {
      this.raspi.emit("connect")
    })

    // Init the WEBUSB stuff
    //
    serial.getPorts().then(ports => {
      if (ports.length !== 0) {
        this.arduino.connectPort(ports[0])
      }
    })
  },

  arduino: new class extends EventEmitter{
    set(pin, value) {
      /*
       * 1 = Wright:
       *     1 = analog:
       *         "pin number"
       *         "frequency (0-255)"
       *     2 = digital:
       *         "pin number"
       *         "1 for LOW"
       *         "2 for HIGH"
       *  2 = Read:
       *     1 = analog:
       *         "pin number"
       *     2 = digital:
       *         "pin number"
       *
       *  '1/2/7/1/' will turn pin 7 on HIGH
       *  '1/2/7/0/' would turn pin 7 off
       *  '1/1/7/255/' would turn pin 7 on at a analog rate of 255 or full power
       *
       */
      let cmd = [
        "1/",           // write
        "2/",           // digital
        pin, "/",        // pin number
        value ? "2/" : "1/" // on/off
      ].join("")

      // Either send the command via WebUSB to the connected Arduino
      //
      if (usbPort) {
        usbPort.send(new TextEncoder().encode(cmd)).catch(function(e){
          console.log(e)
        })
      }
      // or post it to the server. Maybe the server has an connected Arduino via serial port
      //
      else{
        socket.emit('arduino:set', {cmd})
      }
    }

    get(pin) {
      return values[pin]
    }

    disconnect(){
      if (usbPort) {
        usbPort.disconnect()
        usbPort = null
        this.emit("disconnect")
      }
    }

    connect() {
      serial.requestPort().then(selectedPort => {
        this.connectPort(selectedPort)
      }).catch(error => {
        this.emit("disconnect")
      })
    }

    connectPort(port) {
      port.connect().then(() => {
        usbPort = port
        this.emit("connect")
        usbPort.onReceive = data => {
          let textDecoder = new TextDecoder()
          let txt = textDecoder.decode(data)
          console.log('-', txt)
        }
        usbPort.onReceiveError = error => {
          usbPort = null;
          this.emit("disconnect")
        }
      }, error => {
        let msg = error.message
        switch(error.message){
          case "Unable to claim interface.":
            msg = "Unable to claim USB interface."+
                  "<br>Maybe it is already paired by another browser window"
            break;
          default:
            break;
        }
        $.notify({ message: msg},{ type: 'danger'});
        this.emit("disconnect")
      })
    }

    get connected(){
      return usbPort!==null
    }
  },


  raspi:  new class extends EventEmitter{
    set(pin, value) {
      socket.emit('raspi:set', {
        pin: pin,
        value: value
      })
    }

    get (pin) {
      return values[pin]
    }

    get connected(){
      return socket.connected
    }
  }

}
