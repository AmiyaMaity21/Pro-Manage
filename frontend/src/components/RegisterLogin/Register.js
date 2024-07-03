import React, { useState } from "react";
import "./RegisterLogin.css";
import Art from "../../assets/Art.png";
import { FaRegUser } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { TfiLock } from "react-icons/tfi";
import { FiEye } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { clearRegisterError } from "../../slice/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibleField, setVisibleField] = useState("");
  const { registerErrors } = useSelector((state) => state.user);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegisterFormChange = (e) => {
    dispatch(clearRegisterError(e.target.name));
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  const registerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(registerFormData));
      setRegisterFormData("");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };
  return (
    <div className="register-login-page">
      <div className="left-side">
        <img src={Art} alt="Art" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className="right-side">
        <h2 className="formHeading">Register</h2>
        <form onSubmit={registerFormSubmit} className="form">
          <div className="inputContainer">
            <i className="icon">
              <FaRegUser />
            </i>
            <input
              type="text"
              placeholder="Name"
              value={registerFormData.name}
              name="name"
              onChange={handleRegisterFormChange}
              className="inputField"
            />
            {registerErrors.name && <p>{registerErrors.name}</p>}
          </div>
          <div className="inputContainer">
            <i className="icon">
              <LuMail />
            </i>
            <input
              type="email"
              placeholder="Email"
              value={registerFormData.email}
              name="email"
              onChange={handleRegisterFormChange}
              className="inputField"
            />
            {registerErrors.email && <p>{registerErrors.email}</p>}
          </div>
          <div className="inputContainer">
            <i className="icon">
              <TfiLock />
            </i>
            <input
              type={visibleField === "password" ? "text" : "password"}
              placeholder="Password"
              value={registerFormData.password}
              name="password"
              onChange={handleRegisterFormChange}
              className="inputField"
            />
            <i
              className="showPassword"
              onClick={() =>
                setVisibleField(visibleField === "password" ? "" : "password")
              }
            >
              {visibleField === "password" ? <BsEyeSlash /> : <FiEye />}
            </i>
            {registerErrors.password && <p>{registerErrors.password}</p>}
          </div>
          <div className="inputContainer">
            <i className="icon">
              <TfiLock />
            </i>
            <input
              type={visibleField === "confirmPassword" ? "text" : "password"}
              placeholder="Confirm Password"
              value={registerFormData.confirmPassword}
              name="confirmPassword"
              onChange={handleRegisterFormChange}
              className="inputField"
            />
            <i
              className="showPassword"
              onClick={() =>
                setVisibleField(
                  visibleField === "confirmPassword" ? "" : "confirmPassword"
                )
              }
            >
              {visibleField === "confirmPassword" ? <BsEyeSlash /> : <FiEye />}
            </i>
            {registerErrors.confirmPassword && (
              <p>{registerErrors.confirmPassword}</p>
            )}
          </div>
          <button className="register-btn">Register</button>
        </form>
        <p>Have an account ?</p>
        <button onClick={() => navigate("/login")} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
