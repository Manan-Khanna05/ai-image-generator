import { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.js";
import axios from "axios";
import { toast } from "react-toastify";

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axios
        .post("/api/user/credits", {}, { headers: { Authorization: token } })
        .then((res) => {
          if (res.data.sucess && res.data.user) {
            setUser(res.data.user);
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  });
  const generateImage = async (prompt) => {
    try {
      const payload = { prompt };
      if (user && user._id) payload.userId = user._id;
      const { data } = await axios.post("/api/image/generate-image", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data && data.creditBalance !== undefined && setUser && user) {
        setUser({ ...user, creditBalance: data.creditBalance });
      }
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Image generation failed"
      );
      return null;
    }
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
