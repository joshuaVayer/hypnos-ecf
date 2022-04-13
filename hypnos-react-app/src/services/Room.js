import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class RoomsService {
  getAll(params = {}) {
    return axios
      .get(`${API_URL}/rooms`, {
        headers: authHeader(),
        params
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default new RoomsService();
