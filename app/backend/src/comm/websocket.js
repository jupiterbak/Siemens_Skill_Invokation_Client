
// Global variable to hold the last events
module.exports = {
  gFoundedSkills: {},
  connectionMsg: {},
  lastStateChangeEvent:{},
  lastResultTriggerChangeEvent: {},
  lastKPIChangedEvent: {},
  lastSTATESDescriptionChangedEvent: null,
  lastTRANSITIONDescriptionChangedEvent : null,

  connect: function( http, params, logger, _KGEnpoints){
    var self = this;
    this.sockets={};
    this.logger = logger;
    this.io = require('socket.io')(http, params);
    this.io.on('connection', function(socket) {
      self.logger.info("New Socket IO Connection.", { service: 'Socket_IO'});
      self.sockets[socket.id.replace("/#", "")] = socket;
      socket.emit("connected", socket.id.replace("/#", ""));
      socket.on('disconnect', function() {
        logger.info("Socket IO Disconnection: " + socket.id + ".", { service: 'Socket_IO'});
      });

      // Propagate the last events to the new connected client.
      socket.emit("serverstatus", self.connectionMsg);
      socket.emit("skillModels", self.gFoundedSkills);
      
      // Get KGEndponts
      var end_points = [];
      for (var prop in _KGEnpoints) {
          var el = _KGEnpoints[prop];
          end_points.push({ip:el.ip, port:el.port});
      }      
      socket.emit("KGConnected", self.end_points);

      // Informs all connected client 
      socket.emit("StatesChanged", self.lastStateChangeEvent);
      socket.emit("KPIChanged", self.lastKPIChangedEvent);
      socket.emit("STATESDescriptionChanged", self.lastSTATESDescriptionChangedEvent);
      socket.emit("TRANSITIONDescriptionChanged", self.lastTRANSITIONDescriptionChangedEvent);
    });
    return self;
  },

  emit: function(eventID, data) {
    var self = this;
    if (eventID === "connected") {
        io.sockets.emit("client_connnected", data);
    } else if (eventID === "PLCConnected") {
      self.connectionMsg["" + data.ip + "_" + data.port]  = data;        
      self.io.sockets.emit("serverstatus", data);
      self.io.sockets.emit("opcua_serverstatus", data);
    } else if (eventID === "PLCDisconnected") {
      self.connectionMsg["" + data.ip + "_" + data.port]  = data;
      self.io.sockets.emit("serverstatus", data);
      self.io.sockets.emit("opcua_serverstatus", data);
    } else if (eventID === "serverstatus") {
      self.connectionMsg["" + data.ip + "_" + data.port]  = data;
      self.io.sockets.emit("serverstatus", data);
      self.io.sockets.emit("opcua_serverstatus", data);
    } else if (eventID === "skillModelFounded") {
      self.gFoundedSkills["" + data.ip + "_" + data.port + "_" + data.skill.name] = data;
      self.io.sockets.emit("skillModels", self.gFoundedSkills);
    } else if (eventID === "StatesChanged") {
      self.lastStateChangeEvent["" + data.ip + "_" + data.port + "_"  + data.state.ID] = data;
      self.io.sockets.emit("StatesChanged", lastStateChangeEvent);
      self.io.sockets.emit("SkillStatesChanged", data);
    } else if (eventID === "ResultTriggerChanged") {
      self.lastResultTriggerChangeEvent["" + data.ip + "_" + data.port + "_"  + data.node.ns + "_" + data.node.nid] = data;
      self.io.sockets.emit("ResultTriggerChanged", self.lastResultTriggerChangeEvent);
    } else if (eventID === "KPIChanged") {
      self.lastKPIChangedEvent["" + data.ip + "_" + data.port + "_" + data.name] = data;
      self.io.sockets.emit("KPIChanged", self.lastKPIChangedEvent);
      self.io.sockets.emit("SkillKPIChanged", data);
    } else if (eventID === "STATESDescriptionChanged") {
      self.lastSTATESDescriptionChangedEvent = data;
      self.io.sockets.emit("STATESDescriptionChanged", data);
    } else if (eventID === "TRANSITIONDescriptionChanged") {
      self.io.sockets.emit("TRANSITIONDescriptionChanged", data);
      self.lastTRANSITIONDescriptionChangedEvent = data;
    }else{
      self.io.sockets.emit(eventID, data);
    }
    self.logger.info("Socket IO Event: " + eventID, { service: 'Socket_IO'});
  },
  io: null,
  logger: null
};
