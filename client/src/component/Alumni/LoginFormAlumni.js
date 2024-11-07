import React from 'react';
import './LoginFormAlumni.css';
import { Link } from 'react-router-dom';
import student from '../../Assest/img/student.png';
import alumni from '../../Assest/img/alumni.png';
import institute from '../../Assest/img/institute.png';

const LoginFormAlumni = () => {
  return (
    <>   
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">LOGIN OPTIONS</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div class="login-cards">
  <div class="login-card">
    <img src={alumni} alt="Alumni" class="card-image"/>
    <h3 class="card-title">LOGIN AS ALUMNI</h3>
    <Link to="/AlumniLogin"> <button class="login-card-button">Login</button></Link>
  </div>

  <div class="login-card">
    <img src={student} alt="Student" class="card-image"/>
    <h3 class="card-title">LOGIN AS STUDENT</h3>
    <Link to="/StudentLogin"> <button class="login-card-button">Login</button></Link>
  </div>

  <div class="login-card">
    <img src={institute} alt="Institute" class="card-image"/>
    <h3 class="card-title">LOGIN AS INSTITUTE</h3>
    <Link to="/TeacherLogin"> <button class="login-card-button">Login</button></Link>
  </div>
</div>

  </div>
</div>
     <nav className="homepage-navbar">
        <div className="navbar-brand">Alumni Association</div>
        <ul>
        <li class="nav__item">
              <Link to="/LandingPage" id="profile-button-new">
              <i className="fa fa-home" aria-hidden="true"></i>
                <span class="nav__name" id='home-name'>Home</span>
         
              </Link>
            </li>
        </ul>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" id='login-button'>Login</button>
      </nav>
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-left">
          <h1 className="login-title">Welcome!</h1>
          <p className="login-desc">This Login is for ALUMNI</p>
          <div className="input-block">
            <label htmlFor="email" className="input-label">PRN / Email / Username</label>
            <input type="email" name="email" id="email" placeholder="PRN / Email / Username" />
          </div>
          <div className="input-block">
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" />
          </div>
          <div className="login-buttons">
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button className="input-button">Login</button>
          </div>
          <p className="sign-up">Don't have an account? <a href="#">Sign up now</a></p>
        </div>
        <div className="login-right">
          <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="Image" />
          <div className="overlay-content">
            <div className="icon"> <img src={alumni} alt="Alumni" class="card-image"/></div>
            <div className="heading">Alumni Login</div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default LoginFormAlumni;
