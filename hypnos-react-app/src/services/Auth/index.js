import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/auth/login/`, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(`${API_URL}/auth/signup/`, {
      username,
      email,
      password
    });
  }

  checkTokenValidity() {
    return axios.get(`${API_URL}/auth/token/`);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Check for token validity
}

export default new AuthService();
