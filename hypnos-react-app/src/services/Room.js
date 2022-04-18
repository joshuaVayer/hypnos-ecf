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
        console.error(error);
      });
  }

  get(id) {
    return axios
      .get(`${API_URL}/rooms/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  create(room) {
    return axios
      .post(`${API_URL}/rooms`, room, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  update(room) {
    return axios
      .put(`${API_URL}/rooms/${room._id}`, room, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  remove(id) {
    return axios
      .delete(`${API_URL}/rooms/${id}`, {
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

export default new RoomsService();
