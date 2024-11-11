import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./InternshipPostingForm.css";
import { useDispatch } from "react-redux";
import { addNewJob } from "../../Redux/Reducers/jobSlice";

const InternshipPostingForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    company_location: "",
    company_email: "",
    company_size: "",
    title: "",
    description: "",
    job_location: "",
    Intern_duration: "",
    job_type: "",
    requirements: "",
    applicationDeadline: "",
    link: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.company ||
      !formData.company_location ||
      !formData.company_email ||
      !formData.job_location ||
      !formData.job_type ||
      !formData.description ||
      !formData.requirements ||
      !formData.company_size ||
      !formData.applicationDeadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      dispatch(addNewJob(formData)).then(async () => {
        alert("Job successfully posted!");
        navigate('/JobinternAdmin')
        window.location.reload()
      });
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  const nextStep = () => {
    if (
      step === 1 &&
      (!formData.company ||
        !formData.company_location ||
        !formData.company_email ||
        !formData.company_size)
    ) {
      alert("Please fill in all required fields in Company Details.");
      return;
    } else if (
      step === 2 &&
      (!formData.title ||
        !formData.description ||
        !formData.job_location ||
        !formData.job_type ||
        !formData.requirements ||
        !formData.applicationDeadline)
    ) {
      alert("Please fill in all required fields in Job Details.");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="internship-form-container">
      <div className="internship-button-h">
        <Link to="/JobinternAdmin" className="internship-back-btn">
          Go Back
        </Link>
        <h2>Job Posting</h2>
      </div>
      <div className="internship-progress-bar">
        {["Company Details", "Job Details", "Preview"].map((label, index) => (
          <div
            key={index}
            className={`internship-step ${step === index + 1 ? "active" : ""}`}
          >
            <div className="internship-step-number">{index + 1}</div>
            <div className="internship-step-label">{label}</div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="internship-form-step">
          <h2>Company Details</h2>
          <label>
            Company Name*:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Company Location*:
            <input
              type="text"
              name="company_location"
              value={formData.company_location}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Company Email*:
            <input
              type="email"
              name="company_email"
              value={formData.company_email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Company Size*:
            <input
              type="text"
              name="company_size"
              value={formData.company_size}
              onChange={handleInputChange}
              required
            />
          </label>
          <button id="#button-intern" onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="internship-form-step">
          <h2>Job Details</h2>
          <label>
            Job Title*:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Job Description*:
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
            />
          </label>
          <label>
            Job Location*:
            <input
              type="text"
              name="job_location"
              value={formData.job_location}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Duration*:
            <input
              type="text"
              name="Intern_duration"
              value={formData.Intern_duration}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Job Type*:
            <input
              type="text"
              name="job_type"
              value={formData.job_type}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Requirements*:
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Application Deadline*:
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              required
            />
          </label>
          <button id="#button-intern" onClick={prevStep}>
            Back
          </button>
          <button id="#button-intern" onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="internship-form-step">
          <h2>Preview</h2>
          <p>
            <strong>Company Name:</strong> {formData.company}
          </p>
          <p>
            <strong>Company Location:</strong> {formData.company_location}
          </p>
          <p>
            <strong>Company Email:</strong> {formData.company_email}
          </p>
          <p>
            <strong>Company Size:</strong> {formData.company_size}
          </p>
          <p>
            <strong>Job Title:</strong> {formData.title}
          </p>
          <p>
            <strong>Job Description:</strong> {formData.description}
          </p>
          <p>
            <strong>Job Location:</strong> {formData.job_location}
          </p>
          <p>
            <strong>Intern_duration:</strong> {formData.Intern_duration}
          </p>
          <p>
            <strong>Job Type:</strong> {formData.job_type}
          </p>
          <p>
            <strong>Requirements:</strong> {formData.requirements}
          </p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {formData.applicationDeadline}
          </p>
          <button id="#button-intern" onClick={prevStep}>
            Back
          </button>
          <button id="#button-intern" onClick={handleSubmit}>
            Confirm & Post
          </button>
        </div>
      )}
    </div>
  );
};

export default InternshipPostingForm;
