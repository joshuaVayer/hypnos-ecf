import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class FacilityService {
  get(id) {
    return axios
      .get(`${API_URL}/facilities/${id}`, {
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
      .get(`${API_URL}/facilities`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  update(facility) {
    return axios
      .put(`${API_URL}/facilities/${facility._id}`, facility, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  remove(id) {
    return axios
      .delete(`${API_URL}/facilities/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  create(facility) {
    return axios
      .post(`${API_URL}/facilities`, facility, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default new FacilityService();
