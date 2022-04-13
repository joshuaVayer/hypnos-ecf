import AuthService from "@Services/Auth";

const AuthLogout = ({ navigate }) => {
  AuthService.logout();
  navigate("/login");

  return null;
};

export default AuthLogout;
