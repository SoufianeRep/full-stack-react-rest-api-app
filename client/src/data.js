import config from "./config";
import axios from "axios";

export default class Data {
  /**
   * Method to make API calls with below parameters
   *
   * @param {*} url API end point
   * @param {*} method HTTP method
   * @param {Object} data http Request Body
   * @param {Boolean} withCredentials defaults to false, if true sets credential headers
   * @param {*} credentials (Optional)
   * @returns Promise (Axios)
   */

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

  /**
   * async function with get http request from API to retrive all courses
   *
   * @param {*} url API end point
   * @returns Pomise
   */
  async getCourse(url) {
    return await this.api(url).then((response) => {
      return response.data;
    });
  }

  /**
   * async function with PUT http request
   *
   * @param {*} url API end point
   * @param {*} data Request body
   * @param {*} credentials Object {username, password}
   * @returns Promise
   */
  async updateCourse(url, data, credentials) {
    return await this.api(url, "put", data, true, credentials).then(
      (response) => {
        return response.data;
      }
    );
  }

  /**
   * async function with DELETE http request to delete a course from the DB
   * if the credentials check out
   *
   * @param {*} url API end point
   * @param {*} credentials Object {username, password}
   * @returns Promise
   */
  async deleteCourse(url, credentials) {
    return await this.api(url, "delete", null, true, credentials)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  /**
   * async function with POST HTTP request to add a course to the DB
   * Accessible only to logged in users
   *
   * @param {*} url API endpoint
   * @param {*} data Request Body as obj {title, description, estimatedTime, materialsNeeded}
   * @param {*} credentials Object {username, password}
   * @returns Promise
   */

  async createCourse(url, data, credentials) {
    return await this.api(url, "post", data, true, credentials).then(
      (response) => {
        return response.status;
      }
    );
  }

  /**
   * async function with POST HTTP Request to add a user to the DB
   *
   * @param {*} url Api endpoint
   * @param {*} data request body Object {firstName, lastName, emailAddress, password}
   * @returns Promise
   */

  async createUser(url, data) {
    return await this.api(url, "post", data).then((response) => {
      return response.status;
    });
  }

  /**
   * async function with GET http request to retrieves a user from Data
   *
   * @param {*} url API endpoint
   * @param {*} credentials User credentials object {username, password}
   * @returns promise
   */
  async getUser(url, credentials) {
    const response = await this.api(url, "get", null, true, credentials);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
}
