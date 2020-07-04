
let sanitize = require("sanitize-filename")


class WindowLogger {

    /**
     * @constructor
     *
     */
    constructor() {
        
        this.eleContainerLog = document.getElementById("probe_window_log_container");
        this.eleLog = document.getElementById("probe_window_log");
        this.autoScroll = true;        
        Object.preventExtensions(this);
    }

    

    produceOutput(name, args) {
        return args.reduce((output, arg) => {
            return output +
                "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" + new Date().toISOString() + " - ["+name+"] "+
                    (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
                "</span>&nbsp;";
        }, '');
    }

    logSimple(name, args){
        const output = this.produceOutput(name, args);
        if (this.autoScroll) {
            const isScrolledToBottom = this.eleContainerLog.scrollHeight - this.eleContainerLog.clientHeight <= this.eleContainerLog.scrollTop + 1;
            this.eleLog.innerHTML += output + "<br>";
            if (isScrolledToBottom) {
                this.eleContainerLog.scrollTop = this.eleContainerLog.scrollHeight - this.eleContainerLog.clientHeight;
            }
        } else {
            this.eleLog.innerHTML += output + "<br>";
        }
    }

    debug(arg){
        this.logSimple('debug', [arg]);
    }

    warn(arg){
        this.logSimple('warn', [arg]);
    }

    error(arg){
        this.logSimple('error', [arg]);
    }

    info(arg){
        this.logSimple('info', [arg]);
    }

    log(arg){
        this.logSimple('log', [args]);
    }
}

let application_log = new WindowLogger();
export default application_log;