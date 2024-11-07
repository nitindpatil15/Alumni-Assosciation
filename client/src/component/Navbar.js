import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import './Navbar.css';  


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header class="header" id="header">
      <nav class="nav container">
        <Link to="#" class="nav__logo">Alumni Association</Link>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            <li class="nav__item">
              <Link to="/" class="nav__link active-link">
                <i class='bx bx-home-alt nav__icon'></i>
                <span class="nav__name">Home</span>
              </Link>
            </li>

            <li class="nav__item">
              <Link to="#My-Network" class="nav__link">
                <i class='bx bx-user nav__icon'></i>
                <span class="nav__name">My Network</span>
              </Link>
            </li>

            <li class="nav__item">
              <Link to="#Job-Internship" class="nav__link">
                <i class='bx bx-book-alt nav__icon'></i>
                <span class="nav__name">Job & Internship</span>
              </Link>
            </li>

            <li class="nav__item">
              <Link to="/events" class="nav__link">
                <i class='bx bx-briefcase-alt nav__icon'></i>
                <span class="nav__name">Events</span>
              </Link>
            </li>

            <li class="nav__item">
              <Link to="#Stories" class="nav__link">
                <i class='bx bx-message-square-detail nav__icon'></i>
                <span class="nav__name">Stories & Achivement</span>
              </Link>
            </li>
            <li class="nav__item">
              <Link to="/chat" class="nav__link-chat">
                <i class='bx bx-message-square-detail nav__icon' id="chat-i"></i>
                <span class="nav__name" id="chatbox">Chat Box</span>
              </Link>
            </li>
          </ul>
        </div>
        <img src="assets/img/perfil.png" alt="" class="nav__img"/>
      </nav>
    </header>

  );
};

export default Navbar;
