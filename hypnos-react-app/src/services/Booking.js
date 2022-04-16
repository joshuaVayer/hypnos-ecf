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
        console.error(error);
      });
  }

  create(booking) {
    return axios
      .post(`${API_URL}/bookings`, booking, {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  cancel(id) {
    return axios
      .put(
        `${API_URL}/bookings/${id}`,
        { active: false },
        { headers: authHeader() }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
export default new BookingService();
