import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import l1 from "../../Assest/img/h-1.png";
import student from "../../Assest/img/student.png";
import alumni from "../../Assest/img/alumni.png";
import institute from "../../Assest/img/institute.png";

const HomePage = () => {
  const words = ["STUDENTS", "ALUMNI", "INSTITUTES"];
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < words[wordIndex].length) {
        setCurrentText(words[wordIndex].substring(0, charIndex + 1) + "|");
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
              <img src={l1} alt="Display Image" />
            </div>
          </div>
        </div>
      </div>
      <div class="login-cards-new">
        <div class="login-card-new">
          <img src={alumni} alt="Alumni" class="card-image-new" />
          <h3 class="card-title-new">ALUMNI</h3>
          {/* <button class="login-card-button">Login</button> */}
        </div>

        <div class="login-card-new">
          <img src={student} alt="Student" class="card-image-new" />
          <h3 class="card-title-new">STUDENT</h3>
          {/* <button class="login-card-button">Login</button> */}
        </div>

        <div class="login-card-new">
          <img src={institute} alt="Institute" class="card-image-new" />
          <h3 class="card-title-new">INSTITUTE</h3>
          {/* <button class="login-card-button">Login</button> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
