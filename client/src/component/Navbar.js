import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import './Navbar.css';  // Update the path as per your CSS file location
// import profilepic from '.assesimage.jpg';


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header class="header" id="header">
      <nav class="nav container">
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
              <a href="#My-Network" class="nav__link">
                <i class='bx bx-user nav__icon'></i>
                <span class="nav__name">My Network</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="#Job-Internship" class="nav__link">
                <i class='bx bx-book-alt nav__icon'></i>
                <span class="nav__name">Job & Internship</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="/events" class="nav__link">
                <i class='bx bx-briefcase-alt nav__icon'></i>
                <span class="nav__name">Events</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="#Stories" class="nav__link">
                <i class='bx bx-message-square-detail nav__icon'></i>
                <span class="nav__name">Stories & Achivement</span>
              </a>
            </li>
            <li class="nav__item">
              <a href="#CHATBOX" class="nav__link-chat">
                <i class='bx bx-message-square-detail nav__icon' id="chat-i"></i>
                <span class="nav__name" id="chatbox">Chat Box</span>
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
