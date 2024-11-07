import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import l1 from '../../Assest/img/h-1.png';
import student from '../../Assest/img/student.png';
import alumni from '../../Assest/img/alumni.png';
import institute from '../../Assest/img/institute.png';


const HomePage = () => {
  const words = ["STUDENTS", "ALUMNI", "INSTITUTES"];
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < words[wordIndex].length) {
        setCurrentText(words[wordIndex].substring(0, charIndex + 1) + '|');
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [charIndex, wordIndex]);

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
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" id='login-button'>Login</button>
      </nav>
    <div className="banner-component">
      <div className="banner-container">
        <div className="banner-row">
          {/* First Column with Headings */}
          <div className="banner-col">
            <h3 className="fade-in">WELCOME YOU ALL</h3>
            <h2 className="fade-in delay-1s">This Portal is for</h2>
            <h2 className="fade-in delay-2s">
              <span className="typing-text">{currentText}</span>
            </h2>
          </div>
          {/* Second Column with Image */}
          <div className="banner-col image-col fade-in delay-3s">
            <img src= {l1} alt="Display Image" />
          </div>
        </div>
      </div>
    </div>
    <div class="login-cards-new">
  <div class="login-card-new">
    <img src={alumni} alt="Alumni" class="card-image-new"/>
    <h3 class="card-title-new">ALUMNI</h3>
    {/* <button class="login-card-button">Login</button> */}
  </div>

  <div class="login-card-new">
    <img src={student} alt="Student" class="card-image-new"/>
    <h3 class="card-title-new">STUDENT</h3>
    {/* <button class="login-card-button">Login</button> */}
  </div>

  <div class="login-card-new">
    <img src={institute} alt="Institute" class="card-image-new"/>
    <h3 class="card-title-new">INSTITUTE</h3>
    {/* <button class="login-card-button">Login</button> */}
  </div>
</div>
    
    </>
  );
};

export default HomePage;
