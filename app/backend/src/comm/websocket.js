
module.exports = {
  connect: function( http, params, clientUrl){
    this.io = require('socket.io')(http, params);
    this.connectClient(clientUrl);
    return this.io;
  },

  connectClient: function (url) {
    var self = this;
    this.ioClient = require("socket.io-client").connect(url);

    // Forward all messages to the frontend client.
    this.ioClient.on("connected", function(data) {
      self.io.sockets.emit("client_connnected", data);
    });
    this.ioClient.on("serverstatus", function(data) {
      self.io.sockets.emit("opcua_serverstatus", data);
    });
    this.ioClient.on("skillModels", function(data) {
      self.io.sockets.emit("skillModels", data);
    });
    this.ioClient.on("StatesChanged", function(data) {
      self.io.sockets.emit("SkillStatesChanged", data);
    });
    this.ioClient.on("KPIChanged", function(data) {
      self.io.sockets.emit("SkillKPIChanged", data);
    });
    this.ioClient.on("STATESDescriptionChanged", function(data) {
      self.io.sockets.emit("STATESDescriptionChanged", data);
    });
    this.ioClient.on("TRANSITIONDescriptionChanged", function(data) {
      self.io.sockets.emit("TRANSITIONDescriptionChanged", data);
    });

    this.ioClient.connect(url);
  },

  io: null,
  ioClient:null
}
