import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class MediaService {
  create(formData) {
    return axios
      .post(`${API_URL}/upload`, formData, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  remove(file) {
    return axios
      .delete(`${API_URL}/upload/${file}`, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  getAll() {
    return axios
      .get(`${API_URL}/upload`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default new MediaService();
