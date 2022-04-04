import axios from "axios";
import ls from "localstorage-slim";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  constructor() {
    ls.config.encrypt = true;
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

  // Check for token validity
}

export default new AuthService();
