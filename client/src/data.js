import config from "./config";
import axios from "axios";

export default class Data {
  api(
    url,
    method = "get",
    data = null,
    withCredentials = false,
    credentials = null
  ) {
    const params = {
      method,
      url,
      params: null,
      baseURL: config.baseApiUrl,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "basic am9lQHNtaXRoLmNvbTpqb2VwYXNzd29yZA==",
      },
      withCredentials: false,
    };

    if (data) {
      params.data = data;
    }

    if (withCredentials) {
      params.auth = {
        username: credentials.username,
        password: credentials.password,
      };
    }
    return axios(params);
  }

  async getCourse(url) {
    return await this.api(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return null;
        } else {
          throw new Error(error.message);
        }
      });
  }

  async updateCourse(url, data) {
    return await this.api(url, "put", data).then((response) => {
      return response.data;
    });
  }

  async deleteCourse(url) {
    return await this.api(url, "delete")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  async createCourse(url, data) {
    return await this.api(url, "post", data).then((response) => {
      return response.status;
    });
  }

  async createUser(url, data) {
    return await this.api(url, "post", data).then((response) => {
      return response.status;
    });
  }

  async getUser(url, credentials) {
    return await this.api(url, "get", null, true, credentials).then(
      (response) => {
        return response.data;
      }
    );
  }
}
