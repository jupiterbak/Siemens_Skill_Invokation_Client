import conf from './../Configuration'

let sanitize = require("sanitize-filename")


class BackendMTPService {

  /**
   * @constructor
   *
   */
  constructor() {
    this.skillList = [];
    Object.preventExtensions(this);
  }

  connectMTPService(ip, port) {
    var self = this;
    return $.ajax({
      url: conf.backend.mtp.connect,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: ip,
        port:port
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, connected: resp.connected};
      }
    });
  }

  getMTPServiceDescription(_mtp_service_name) {
    const self = this;
    return $.ajax({
      url: conf.backend.mtp.getDescription,
      xhrFields: {
        withCredentials: true
      },
      data: {
        mtp_service_name: _mtp_service_name,
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, mtp_service_descp: resp.mtp_service_descp};
      }        
    });
  }

  writeRequestParameters(_ip, _port, _mtp_service_name, _nodes, _values) {
    var self = this;
    return $.ajax({
      url: conf.backend.mtp.writeRequestParameters,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        mtpServiceName: _mtp_service_name,
        nodes: _nodes,
        values: _values
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }
    });
  }

  readResultParameters(_ip, _port, _mtp_service_name, _nodes) {
    var self = this;
    return $.ajax({
      url: conf.backend.mtp.readResultParameters,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        mtpServiceName: _mtp_service_name,
        nodes: _nodes
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }        
    });
  }

  monitorService(_ip, _port, _mtp_service_name, _nodes) {
    var self = this;
    return $.ajax({
      url: conf.backend.mtp.monitorService,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        mtpServiceName: _mtp_service_name,
        nodes: _nodes
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }   
    });
  }


  callService(_ip, _port, _mtp_service_name, _call_nodes, _call_values) {
    var self = this;
    return $.ajax({
      url: conf.backend.mtp.call,
      xhrFields: {
        withCredentials: true
      },
      data: {
        ip: _ip,
        port: _port,
        mtpServiceName: _mtp_service_name,
        nodes: _call_nodes,
        values: _call_values
      }
    }).then((resp) => {
      if (resp.err){
        return {err: resp.err};
      }else{
        return {err: resp.err, results: resp.results};
      }
    });
  }

}

let mtp_services_proxy = new BackendMTPService();
export default mtp_services_proxy;