import HttpClient from "./http-client.js";

class ApiClient extends HttpClient {
  constructor(baseURL, langCode) {
    super({
      baseURL,
      headers: {
        lang: langCode
      }
    });
  }

  /**
   * I added the @babel/plugin-proposal-class-properties
   * so you can use the code below instead, whick i like more
   */
  // users = {
  //   get: () => this.get("/users"),
  //   delete: (id) => this.delete(`/users/${id}`),
  //   create: (user) => this.post("/users", user),
  //   update: (user) => this.put(`/users/${user.id}`, user)
  // };

  get repositories() {
    return {
      get: () => this.get("/repositories"),
      delete: (id) => this.delete(`/repositories/${id}`),
      create: (user) => this.post("/repositories", user),
      update: (user) => this.put(`/repositories/${user.id}`, user)
    };
  }

  get users() {
    return {
      get: (query, page=1) => this.get(`/usuarios?page=${page}&query=${query}`),
    };
  }
}

export default ApiClient;
