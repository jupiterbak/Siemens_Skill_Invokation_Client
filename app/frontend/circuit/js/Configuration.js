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
    }
  },
  issues: {
    url:"dddddd"
  },
  designer: {
    url: "../designer/"
  },
  shapes: {
    url: "./shapes/"
  },
  color: {
    high: "#C21B7A",
    low:  "#0078F2"
  }
};
