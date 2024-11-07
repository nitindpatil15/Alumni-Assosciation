import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import './Navbar.css';  // Update the path as per your CSS file location
import hook from '../Assest/img/hook-ID.png';
import hook1 from '../Assest/img/hook-ID-new.png';
// import profilepic from '.assesimage.jpg';


const Navbar = (props) => {
  

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header class="header" id="header">
     
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
  <h5 class="offcanvas-title" id="offcanvasExampleLabel"><i class="fa fa-user-circle-o" aria-hidden="true" id="user-offcanvas"></i>Welcome</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
     
    <div class="id-card-container mt-3">
      <div class="id-card">
        <div class="card-header">
          <img src={hook1}  alt="Company Logo" class="company-logo" />
        </div>
        <div class="card-head">
          <h2 class="head-ID">Profile Card</h2>
        </div>
        <div class="card-content-ID">
          <h2 class="name">John Doe</h2>
          <p class="role">Role: Admin</p>
          <p class="prn">PRN: 123456789</p>
        </div>
        <div class="card-content-btn">
        <button class="btn-ID"><i class="fa fa-sign-out" aria-hidden="true"></i> Edit Profile</button>
        </div>
      </div>
      
    </div>
    <div className="other-opt-btn">
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
      <button class="btn" id="btn-logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
    </div>
  </div>
</div>
      <nav class="nav container-nav">
        <a href="#" class="nav__logo">Alumni Association</a>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            <li class="nav__item">
              <a href="/" class="nav__link active-link">
                <i class='bx bx-home-alt nav__icon'></i>
                <span class="nav__name">Home</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="/LandingPage" class="nav__link">
                <i class='bx bx-user nav__icon'></i>
                <span class="nav__name">My Network</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="/JobinternAdmin" class="nav__link">
                <i class='bx bx-book-alt nav__icon'></i>
                <span class="nav__name">Job & Internship</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="/eventpost" class="nav__link">
                <i class='bx bx-briefcase-alt nav__icon'></i>
                <span class="nav__name">Events</span>
              </a>
            </li>
            {/* 
            <li class="nav__item">
              <a href="/Jobuser" class="nav__link">
                <i class='bx bx-message-square-detail nav__icon'></i>
                <span class="nav__name">Stories & Achiev.</span>
              </a>
            </li> */}
            <li className="nav__item">
              <button className="nav__link more-button" id="more-button-new" onClick={toggleDropdown}>
                <i  className="fa fa-bars nav__icon-new" aria-hidden="true"></i>
                {/* <i class="fa fa-bars" aria-hidden="true"></i> */}

                <span className="nav__name">More</span>
              </button>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="/stories">Stoires & Achivements</a></li>
                  <li className="dropdown-item"><a href="/AlumniLogin">Contact Us</a></li>
                  <li className="dropdown-item"><a href="/faq">FAQ</a></li>
                </ul>
              )}
            </li>
            <li class="nav__item">
              <a class=" nav__link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" id="profile-button-new">
              <i className="fa fa-user-circle-o nav__icon-new" aria-hidden="true"></i>
                <span class="nav__name">Profile</span>
              </a>
            </li>
            
            <li class="nav__item">
              <a href="#CHATBOX" class="nav__link-chat">
                <i class='bx bx-message-square-detail nav__icon' id="chat-i"></i>
                {/* <span class="nav__name" id="chatbox">Chat Box</span> */}
              </a>
            </li>
            
          </ul>
        </div>
        <img src="assets/img/perfil.png" alt="" class="nav__img"/>
      </nav>
    </header>

  );
};

export default Navbar;
