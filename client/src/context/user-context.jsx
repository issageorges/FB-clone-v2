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
  
    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('profile-pic', e.target['profile-image'].files[0]);
  
    try {
      const response = await axios.post(`${baseUrl}/user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  

  // const profilePicHandler = async (e) => {
  //   e.preventDefault()
  //   const body = new FormData();
  //   body.append("userId", user._id);
  //   body.append("profile-Pic", e.target["profile-image"].files[0]);

  //   try {
  //     const res = await axios.post(
  //       `${baseUrl}/user/update-profile`,
  //       body
  //     )
  //     setUser(res.data)
  //     e.target.reset();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{ user, logoutHandler, registerHandler, loginHandler,profilePicHandler }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
