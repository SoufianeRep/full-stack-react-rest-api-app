import config from "./config";
import axios from "axios";

export default class Data {
  api(method = "get", url) {
    const params = {
      method,
      url,
      baseURL: config.baseApiUrl,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: null,
    };
    return axios(params);
  }

  async getCourses() {
    await this.api("get", "/courses")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return null;
        } else {
          throw new Error();
        }
      });
  }
}
