import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const { data } = await axios.post(`${baseUrl}/user/login`, body);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const { data } = await axios.post(`${baseUrl}/user/register`, body);
      console.log(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, logoutHandler, registerHandler, loginHandler }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
