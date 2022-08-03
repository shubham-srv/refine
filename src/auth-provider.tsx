import { AuthProvider } from "@pankod/refine-core";

const sampleUserArr = [{ userName: "abc", password: "1234" }];

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    console.log(username, password);
    if (
      sampleUserArr.find(
        (user) => user.userName === username && user.password === password
      )
    ) {
      const key = JSON.stringify({ username });
      localStorage.setItem("Auth", key);
      return Promise.resolve();
    }
    return Promise.reject();
  },

  logout: () => {
    localStorage.removeItem("Auth");
    return Promise.resolve("/");
  },

  checkAuth: () => {
    console.log(localStorage.getItem("Auth"));
    console.log(Boolean(localStorage.getItem("Auth")));
    return localStorage.getItem("Auth") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 400) return Promise.reject();
    return Promise.resolve();
  },

  getPermissions: () => {
    const userData = localStorage.getItem("Auth");
    if (userData) {
      return Promise.resolve(JSON.parse(userData));
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const user = localStorage.getItem("Auth");
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
    return Promise.reject();
  },
};

export default authProvider;
