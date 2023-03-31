import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/userSlice";
import { resetCounter } from "../redux/counterSlice";

function useLogin() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    user_name: "",
    user_password: "",
  });

  const persistUserData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const resetPasswordInput = () => {
    setLoginData({ ...loginData, user_password: "" });
  };

  // USER LOG OUT FUNCTION
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    dispatch(resetCounter());
    localStorage.removeItem("userData");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return {
    handleChange,
    handleLogout,

    loginData,
    persistUserData,
    resetPasswordInput,
  };
}

export default useLogin;
