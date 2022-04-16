import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class RoleService {
  getAll() {
    return axios
      .get(`${API_URL}/roles`, {
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
export default new RoleService();
