import axios from "axios";
import authHeader from "./Auth/Header";

const API_URL = process.env.REACT_APP_API_URL;

class BookingService {
  getAll(params = {}) {
    return axios
      .get(`${API_URL}/bookings`, {
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
export default new BookingService();
