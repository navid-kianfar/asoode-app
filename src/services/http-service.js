const axios = require("axios");
const prefix = "https://asoode.com/api/v1";
import * as Enums from "../library/enums";

class HttpService {
  token: "";
  async post(url, params = {}) {
    return new Promise(resolve => {
      const config = { headers: { Authorization: this.token } };
      axios
        .post(`${prefix}${url}`, params, config)
        .then(res => resolve(res.data))
        .catch(err => {
          resolve({
            status: Enums.OperationResultStatus.Failed,
            data: null,
            error: err
          });
          console.error(err.message);
        });
    });
  }

  async upload(url, model) {
    const filesNames = [];
    const files = [];
    Object.keys(model).forEach(k => {
      if (model[k] instanceof File) {
        filesNames.push(k);
        files.push(model[k]);
        delete model[k];
      } else if (Array.isArray(model[k]) && model[k][0] instanceof File) {
        model[k].forEach((f, i) => {
          filesNames.push(k + "_" + i);
          files.push(f);
        });
        delete model[k];
      } else if (model[k].uri && model[k].name && model[k].type) {
        filesNames.push(k);
        files.push(model[k]);
        delete model[k];
      }
    });
    model.filesNames = filesNames;
    const data = { data: JSON.stringify(model) };
    const formData = new FormData();
    for (let i = 0; i < filesNames.length; i++) {
      formData.append(filesNames[i], files[i]);
    }
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.post(url, formData);
  }
  grid(param) {
    const data = {
      page: param.page,
      pageSize: param.pageSize,
      params: param.params || {}
    };
    return this.post(param.backend, data);
  }
}
const instance = new HttpService();
export default instance;
