const { useState } = require("react");
const { http } = require("../config/axios");

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(null);

  const handleLogin = async ({ username, password }) => {
    const response = await http.post("/login/", { username, password });
    setToken(response.data.token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
