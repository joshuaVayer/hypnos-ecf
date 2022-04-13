import ls from "localstorage-slim";

export default function authHeader() {
  const user = ls.get("user");
  const token = user ? JSON.parse(user).token : null;

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
