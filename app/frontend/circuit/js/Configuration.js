// This configuration file will be overridden if the application
// is provided by a node.js server. In this case we store all
// circuits and shapes on the local node.js server instead of
// using the global available repository.
// Check the special route in the ./server/main.js for this.
//
// This is useful if you want run the DigitalTrainingStudio local on
// RaspberryPi or another IoT device
//
//
export default {
  fileSuffix: ".brain",
  backend: {
    file: {
      list:   path       => `../backend/brain/list?path=${path}`,
      get:    file       => `../backend/brain/get?filePath=${file}`,
      image:  ()         => `../backend/brain/image?filePath=`,
      del:     `../backend/brain/delete`,
      rename:  `../backend/brain/rename`,
      save:     `../backend/brain/save`
    },
    skill:{
      connect: '/backend/skill/connect',
      browse: '/backend/skill/browse',
      save: '/backend/skill/save',
      getDescription: '/backend/skill/getDescription',
      call: '/backend/skill/call'
    }
  },
  monitor: {
    url:"http://localhost:8080/skill-monitoring.html"
  },
  issues: {
    url:"dddddd"
  },
  shapes: {
    url: "./shapes/"
  },
  color: {
    high: "#faa50a",
    low:  "#0078F2"
  }
};
