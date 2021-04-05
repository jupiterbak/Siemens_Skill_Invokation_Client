export default {
  fileSuffix: ".shape",
  serverless: false,
  backend: {
    file: {
      list: "/backend/shape/list",
      get:  file=>`../backend/shape/get?filePath=${file}`,
      save:"/backend/shape/save"
    }
  },
  color: {
    high: "#faa50a",
    low:  "#1C9BAB" //"#0078F2"
  }
}
