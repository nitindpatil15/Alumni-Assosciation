// MultiStepForm.js
import React, { useState } from 'react';
import './Registration.css';
import { Link } from "react-router-dom";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Intro', 'Education', 'Activity', 'Password'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const togglePasswordVisibility = (e) => {
    const passwordField = e.target.previousElementSibling;
    const confirmPasswordField = document.getElementById('confirmPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    confirmPasswordField.type = confirmPasswordField.type === 'password' ? 'text' : 'password';
  };

  const switchToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <>
      <div className="row-new">
        <div className="multi-step-form">
          <div className="form-container-regi">
            <div className="progress-bar-container-regi">
              <div className="progress-bar-regi">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`step ${index <= currentStep ? 'active' : ''}`}
                    onClick={() => switchToStep(index)} // Enable direct switching by clicking
                    style={{ cursor: "pointer" }} // Indicate clickable steps
                  >
                    <div className={`step-number ${index <= currentStep ? 'active' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="step-label">{step}</div>
                  </div>
                ))}
              </div>
              <div
                className="progress-regi"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            <form>
              {currentStep === 0 && (
                <div className="form-step-regi active">
                  <h2>Introduction</h2>
                  <input type="text" placeholder="Username" required />
                  <input type="date" placeholder="Date of Birth" required />
                  <input type="tel" placeholder="Phone" required />
                  <input type="email" placeholder="Email" required />
                  <div className="btn-reg">
                    <button type="button" className="next-btn" onClick={handleNext}>Save & Next</button>
                  </div>
                  <div className="login-back">
                    Already have an account?<Link to="/AlumniLogin"> Login now </Link>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="form-step-regi active">
                  <h2>Education</h2>
                    <input type="number" placeholder="PRN" required />
                  <input type="text" placeholder="Past Education" required />
                  <input type="text" placeholder="Passing Year" required />
                  <input type="text" placeholder="Branch" required />
                  <div className="btn-reg">
                    <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                    <button type="button" className="next-btn" onClick={handleNext}>Save & Next</button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step-regi active">
                  <h2>Activity</h2>
                  <input type="text" placeholder="Position" required />
                  <input type="text" placeholder="Company Name" required />
                  <input type="text" placeholder="Skills" required />
                  <input type="text" placeholder="Duration" required />
                  <div className="btn-reg">
                    <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                    <button type="button" className="next-btn" onClick={handleNext}>Save & Next</button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step-regi active">
                  <h2>Password</h2>
                  <div className="password-container-regi">
                    <input type="password" placeholder="Password" id="password" required />
                    <span className="view-icon" onClick={togglePasswordVisibility}></span>
                  </div>
                  <div className="password-container-regi">
                    <input type="password" placeholder="Confirm Password" id="confirmPassword" required />
                    <span className="view-icon" onClick={togglePasswordVisibility}></span>
                  </div>
                  <div className="btn-reg">
                    <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                    <button type="submit" className="submit-btn">Submit</button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="image-container-regi">
            <img
              src="https://img.freepik.com/free-vector/registration-form-template-with-flat-design_23-2147971971.jpg"
              alt="Registration Form Image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
