import { useLocation, useNavigate } from "react-router-dom";

const { useState, createContext } = require("react");
const { http } = require("../config/axios");

export const AuthContext = createContext({ token: null });

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogin = async ({ username, password }) => {
    try {
      const response = await http.post("/login/", { username, password });
      setToken(response.data.token);
      http.defaults.headers.common["Authorization"] = `Token ${token}`;
      localStorage.setItem("token", response.data.token);

      const origin = location.state.from.pathname || "/";
      navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    navigate("/");
  };

  const value = {
    token,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
