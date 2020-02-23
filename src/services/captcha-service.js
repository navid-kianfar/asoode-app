import HttpService from "./http-service";

export default {
  generate: async () => {
    return HttpService.post("/captcha/generate");
  }
};
