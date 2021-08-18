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
    const courses = [];
    await this.api("get", "/courses")
      .then((response) => {
        if (response.status === 200) {
          response.data.forEach((x) => courses.push(x));
          return courses;
        }
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
