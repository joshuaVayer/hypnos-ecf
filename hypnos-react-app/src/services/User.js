import axios from "axios";
import AuthService from "./Auth";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  update(user) {
    return axios
      .put(`${API_URL}/users/${user._id}`, user, {
        headers: authHeader()
      })
      .then(response => {
        const updatedUser = AuthService.update(response.data);
        return updatedUser;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getAll() {
    return axios
      .get(`${API_URL}/users`, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  create(user) {
    return axios
      .post(`${API_URL}/users`, user, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
export default new UserService();
