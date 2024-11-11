import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../../Redux/Reducers/userSlice";
import institute from "../../Assest/img/institute.png";

const LoginTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the AdminLogin action with credentials
    dispatch(AdminLogin(credentials)).then(()=>{
      window.location.reload();
      navigate('/')
    })
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Navigate to homepage on successful login
    } else if (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-left">
            <h1 className="login-title">Welcome!</h1>
            <p className="login-desc">
              Institution Login (Teacher/Admin Login)
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  PRN / Email / Username
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="PRN / Email / Username"
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
              <div className="login-buttons">
                <a href="#" className="forgot-password">
                  Forgot your password?
                </a>
                <button type="submit" className="input-button">
                  Login
                </button>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <p className="sign-up">
              Don't have an account? <a href="#">Sign up now</a>
            </p>
          </div>
          <div className="login-right">
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
              alt="Image"
            />
            <div className="overlay-content">
              <div className="icon">
                <img src={institute} alt="Institute" className="card-image" />
              </div>
              <div className="heading">Institute Login</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTeacher;
