import axios from "axios";
import ls from "localstorage-slim";

import authHeader from "./Header";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  constructor() {
    ls.config.encrypt = false;
  }

  login(username, password) {
    return axios
      .post(`${API_URL}/auth/login/`, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          ls.set("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  update(user) {
    const existingUser = this.getCurrentUser();
    const token = existingUser ? existingUser.token : null;

    const updatedUser = {
      token,
      user: { ...existingUser.user, ...user }
    };

    ls.set("user", JSON.stringify(updatedUser));

    return updatedUser;
  }

  register(name, email, password) {
    return axios.post(`${API_URL}/auth/signup/`, {
      name,
      username: email,
      password
    });
  }

  checkTokenValidity() {
    return axios.get(`${API_URL}/auth/token/`);
  }

  getCurrentUser() {
    const user = ls.get("user");
    return user ? JSON.parse(user) : null;
  }

  getUserRole() {
    const user = ls.get("user");
    const token = user ? JSON.parse(user).token : null;

    if (token)
      return axios.get(`${API_URL}/auth/role/`, { headers: authHeader() });
    else return Promise.resolve({ data: { role: null } });
  }

  // Check for token validity
}

export default new AuthService();
