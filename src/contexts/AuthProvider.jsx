import { useNavigate } from "react-router-dom";

const { useState, createContext } = require("react");
const { http } = require("../config/axios");

export const AuthContext = createContext({ token: null });

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const onLogin = async ({ username, password }) => {
    const response = await http.post("/login/", { username, password });
    setToken(response.data.token);
    localStorage.clear();
    setToken("token", response.data.token);
    navigate("/");
  };

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
  };

  const value = {
    token,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
