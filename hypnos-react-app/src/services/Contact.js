import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class ContactService {
  submit(contact) {
    return axios
      .post(`${API_URL}/formSubmissions`, contact, {
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
      .get(`${API_URL}/formSubmissions`, {
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

export default new ContactService();
