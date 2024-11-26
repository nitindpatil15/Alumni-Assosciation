import React, { useState } from "react";
import html2canvas from "html2canvas";
import hook1 from './hook-ID-new.png';
import './EditProfile.css';
import { Link } from "react-router-dom";


const EditProfile = ({ user = {} }) => {
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

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  const togglePasswordVisibility = (e) => {
    const passwordField = e.target.previousElementSibling;
    if (passwordField) {
      passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    }
  };

  const handleDownloadImage = () => {
    const idCard = document.getElementById("column1");
    if (idCard) {
      html2canvas(idCard).then((canvas) => {
        const link = document.createElement("a");
        link.download = "id-card.jpg";
        link.href = canvas.toDataURL("image/jpeg");
        link.click();
      });
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="row-profile">
        {/* Column 1 */}
        <div className="column1" id="column1">
          <div className="row-id">
            <div className="id-card-container" id="id-card-container">
              <div className="id-card-profile">
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
                    style={{ width: "6rem", borderRadius: "50%", border: "2px solid black" }}
                  />
                </div>
                <div className="card-content-ID">
                  <h2 className="name">{user?.name || "Unknown User"}</h2>
                  <p className="role">Role: {user?.role || "Not Specified"}</p>
                  <p className="prn">PRN: {user?.prn || user?.mobile || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="column2">
          <div className="download-btn">
            <button onClick={handleDownloadImage} className="download-btn">
              Download ID Card
            </button>
          </div>
          <div className="multi-step-form">
            <div className="form-container-pro">
              {/* Progress Bar */}
              <div className="progress-bar-container-regi">
                <div className="progress-bar-regi">
                  {steps.map((step, index) => (
                    <div
                      className={`step ${index <= currentStep ? 'active' : ''}`}
                      key={index}
                      onClick={() => handleStepClick(index)}
                      style={{ cursor: 'pointer' }}
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

              {/* Form Steps */}
              <form>
                {currentStep === 0 && (
                  <div className="form-step-regi active">
                    <h2>Update Introduction</h2>
                    <input type="text" placeholder="Username" required />
                    <input type="date" placeholder="Date of Birth" required />
                    <input type="tel" placeholder="Phone" required />
                    <input type="email" placeholder="Email" required />
                    <div className="btn-reg">
                      <button type="button" id="update-btn-new" className="next-btn">Update</button>
                      <button type="button" id="next-btn-profile" className="next-btn" onClick={handleNext}>Next</button>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="form-step-regi active">
                    <h2>Update Education</h2>
                    <input type="number" placeholder="PRN" required />
                    <input type="text" placeholder="Past Education" required />
                    <input type="text" placeholder="Passing Year" required />
                    <input type="text" placeholder="Branch" required />
                    <div className="btn-reg">
                      <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                      <button type="button" id="update-btn-new" className="next-btn">Update</button>
                      <button type="button" className="next-btn" id="next-btn-profile"  onClick={handleNext}>Next</button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="form-step-regi active">
                    <h2>Update Activity</h2>
                    <input type="text" placeholder="Position" required />
                    <input type="text" placeholder="Company Name" required />
                    <input type="text" placeholder="Skills" required />
                    <input type="text" placeholder="Duration" required />
                    <div className="btn-reg">
                      <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                      <button type="button" id="update-btn-new" className="next-btn">Update</button>
                      <button type="button" className="next-btn" id="next-btn-profile"  onClick={handleNext}>Next</button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="form-step-regi active">
                    <h2>Change Password</h2>
                    <div className="password-container-regi">
                      <input
                        type="password"
                        placeholder="Current Password"
                        id="confirmPassword"
                        required
                      />
                      <span className="view-icon" onClick={togglePasswordVisibility}></span>
                    </div>
                    <div className="btn-reg">
                      <button type="button" className="prev-btn" onClick={handlePrevious}>Previous</button>
                      <button type="button" id="update-btn-new" className="next-btn">Change Password</button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
