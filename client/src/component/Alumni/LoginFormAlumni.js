import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AlumniLogin } from "../../Redux/Reducers/userSlice";
import alumni from "../../Assest/img/alumni.png";
import "./LoginFormAlumni.css";

const LoginFormAlumni = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth); // Access user and error state

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch AlumniLogin with email/mobile and password
    dispatch(AlumniLogin(credentials)).then(()=>{
      window.location.reload();
      navigate('/')
    })
  };

  useEffect(() => {
    if (user) {
      // Redirect to homepage on successful login
      navigate("/");
    } else if (error) {
      // Display error message on login failure
      setLoginError(
        "Login failed. Please check your credentials and try again."
      );
    }
  }, [user, error, navigate]);

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-left">
            <h1 className="login-title">Welcome!</h1>
            <p className="login-desc">This Login is for ALUMNI</p>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="emailOrMobile" className="input-label">
                  Email / Mobile
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email / Mobile"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              {loginError && <p className="error-message">{loginError}</p>}
              <div className="login-buttons">
                <a href="#" className="forgot-password">
                  Forgot your password?
                </a>
                <button type="submit" className="input-button">
                  Login
                </button>
              </div>
            </form>
            <p className="sign-up">
              Don't have an account?<Link to="/Register">Sign up now </Link>
            </p>
          </div>
          <div className="login-right">
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
              alt="Background"
            />
            <div className="overlay-content">
              <div className="icon">
                <img src={alumni} alt="Alumni" className="card-image" />
              </div>
              <div className="heading">Alumni Login</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFormAlumni;
