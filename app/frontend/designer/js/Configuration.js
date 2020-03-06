export default {
  fileSuffix: ".shape",
  serverless: false,
  backend: {
    file: {
      list: "/backend/shape/list",
      get:  file=>`../backend/shape/get?filePath=${file}`,
      save:"/backend/shape/save"
    }
  }
}
