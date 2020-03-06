var os   = require('os');


// =======================================================================
// determine the ip address of the running node server
// just to prompt to the user for easy cut&paste into the browser
// =======================================================================
var ifaces = os.networkInterfaces();
var address ="*";
for (var dev in ifaces) {
    var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if(iface.length > 0) address = iface[0].address;
}


module.exports = address;