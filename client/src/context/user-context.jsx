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

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchUser(); // Fetch user information from the server
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
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
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
      await axios.post(`${baseUrl}/user/register`, body);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, logoutHandler, registerHandler, loginHandler, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

