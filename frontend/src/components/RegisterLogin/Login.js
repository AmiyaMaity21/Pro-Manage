import React, { useEffect, useState } from "react";
import "./RegisterLogin.css";
import Art from "../../assets/Art.png";
import { LuMail } from "react-icons/lu";
import { TfiLock } from "react-icons/tfi";
import { FiEye } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginError } from "../../slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, loginErrors } = useSelector((state) => state.user);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const handleLoginFormChange = (e) => {
    dispatch(clearLoginError(e.target.name));
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  const loginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginFormData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="register-login-page">
      <div className="left-side">
        <img src={Art} alt="Art" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className="right-side">
        <h2 className="formHeading">Login</h2>
        <form onSubmit={loginFormSubmit} className="form">
          <div className="inputContainer">
            <i className="icon">
              <LuMail />
            </i>
            <input
              type="email"
              placeholder="Email"
              value={loginFormData.email}
              name="email"
              onChange={handleLoginFormChange}
              className="inputField"
            />
            {loginErrors.email && <p>{loginErrors.email}</p>}
          </div>
          <div className="inputContainer">
            <i className="icon">
              <TfiLock />
            </i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={loginFormData.password}
              name="password"
              onChange={handleLoginFormChange}
              className="inputField"
            />
            <i
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlash /> : <FiEye />}
            </i>
            {loginErrors.password && <p>{loginErrors.password}</p>}
          </div>
          <button className="register-btn">Login</button>
        </form>
        <p>Have no account yet?</p>
        <button className="login-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
