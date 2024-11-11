import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import hook1 from "../Assest/img/hook-ID-new.png";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser, LogoutUser } from "../Redux/Reducers/userSlice";
import student from "../Assest/img/student.png";
import alumni from "../Assest/img/alumni.png";
import institute from "../Assest/img/institute.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(CurrentUser());
  },[dispatch]);

  const handleLogout = () => {
    dispatch(LogoutUser());
    navigate("/"); // Navigate to the home page
    alert("Logged Out");
    document.querySelector(".offcanvas-backdrop")?.click(); // Close offcanvas if open
    window.location.reload(); // Reload the page to refresh the state
  };
  

  const toggleDropdown = () => {
    dispatch(CurrentUser());
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header" id="header">
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <i
              className="fa fa-user-circle-o"
              aria-hidden="true"
              id="user-offcanvas"
            ></i>
            Welcome, {user?.name?.split(" ")?.[0]}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="id-card-container mt-3">
            <div className="id-card">
              <div className="card-header">
                <img src={hook1} alt="Company Logo" className="company-logo" />
              </div>
              <div className="card-head">
                <img
                  src={
                    user?.avatar ||
                    "https://media.istockphoto.com/id/1461543717/vector/scholars-degree.jpg?s=612x612&w=0&k=20&c=l7nLGYcKkjqSyvzT2mSfPH1YY1wdtU7RFPuR97JNxmo="
                  }
                  alt="avatar"
                  style={{
                    width: "6rem",
                    borderRadius: "50%",
                    border: "2px solid black",
                  }}
                />
              </div>
              <div className="card-content-ID">
                <h2 className="name">{user?.name}</h2>
                <p className="role">Role: {user?.role}</p>
                <p className="prn">PRN: {user?.prn || user?.mobile}</p>
              </div>
              <div className="card-content-btn">
                <button className="btn-ID">
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Edit
                  Profile
                </button>
              </div>
            </div>
          </div>
          <div className="other-opt-btn">
            <div className="profile-description mt-4">
              <p>
                Welcome to your Alumni Profile! Manage your info, connect with
                alumni, and stay updated on events and opportunities.
              </p>
            </div>
            <button
              id="btn-logout"
              onClick={handleLogout}
              type="button"
              className="btn-close text-reset btn"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{width:"19.5rem"}}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasTopLabel">LOGIN OPTIONS</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="login-cards">
            <div className="login-card">
              <img src={alumni} alt="Alumni" className="card-image" />
              <h3 className="card-title">LOGIN AS ALUMNI</h3>
              <Link to="/AlumniLogin">
                <button
                  className="login-card-button"
                  data-bs-dismiss="offcanvas"
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="login-card">
              <img src={student} alt="Student" className="card-image" />
              <h3 className="card-title">LOGIN AS STUDENT</h3>
              <Link to="/login">
                <button
                  className="login-card-button"
                  data-bs-dismiss="offcanvas"
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="login-card">
              <img src={institute} alt="Institute" className="card-image" />
              <h3 className="card-title">LOGIN AS INSTITUTE</h3>
              <Link to="/TeacherLogin">
                <button
                  className="login-card-button"
                  data-bs-dismiss="offcanvas"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="nav container-nav">
        <Link to="/" className="nav__logo navbar-brand">
          Alumni Association 
        </Link>
        <span>Welcome {user?.role}</span>
        {user ? (
          <>
            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link to="/" className="nav__link active-link">
                    <i className="bx bx-home-alt nav__icon"></i>
                    <span className="nav__name">Home</span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link to="#My-Network" className="nav__link">
                    <i className="bx bx-user nav__icon"></i>
                    <span className="nav__name">My Network</span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link to={user.role ==="Student"?"/JobUser":"/JobinternAdmin"} className="nav__link">
                    <i className="bx bx-book-alt nav__icon"></i>
                    <span className="nav__name">Job & Internship</span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link to={user.role ==="Student"? "/EventUser":"/eventpost"} className="nav__link">
                    <i className="bx bx-briefcase-alt nav__icon"></i>
                    <span className="nav__name">Events</span>
                  </Link>
                </li>

                <li className="nav__item">
                  <button
                    className="nav__link more-button"
                    id="more-button-new"
                    onClick={toggleDropdown}
                  >
                    <i
                      className="fa fa-bars nav__icon-new"
                      aria-hidden="true"
                    ></i>
                    <span className="nav__name">More</span>
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <Link to="/stories">Stories & Achievements</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/AlumniLogin">Contact Us</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/faq">FAQ</Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="nav__item">
                  <a
                    className="nav__link"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                    id="profile-button-new"
                  >
                    <i
                      className="fa fa-user-circle-o nav__icon-new"
                      aria-hidden="true"
                    ></i>
                    <span className="nav__name">Profile</span>
                  </a>
                </li>

                <li className="nav__item">
                  <Link to="/chat" className="nav__link-chat">
                    <i
                      className="bx bx-message-square-detail nav__icon"
                      id="chat-i"
                    ></i>
                    <span className="nav__name" id="chatbox">
                      Chat Box
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link active-link">
                  <i className="bx bx-home-alt nav__icon"></i>
                  <span className="nav__name">Home</span>
                </Link>
              </li>
              <li className="nav__item">
                <button
                  type="button"
                  className="nav__link more-button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTop"
                  aria-controls="offcanvasTop"
                >
                  <i className="fa fa-sign-in nav__icon" aria-hidden="true"></i>
                  <span className="nav__name">Login</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
