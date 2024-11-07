import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './JobPostingForm.css';

const JobPostingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    companyDetails: '',
    jobType: '',
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    jobCategory: 'Job',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobDescriptionChange = (value) => {
    setFormData({ ...formData, jobDescription: value });
  };

  const handleSubmit = () => {
    alert('Job successfully posted!');
    setStep(1);
    setFormData({
      companyName: '',
      companyWebsite: '',
      companyEmail: '',
      companyDetails: '',
      jobType: '',
      jobTitle: '',
      jobDescription: '',
      jobLocation: '',
      jobCategory: 'Job',
    });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.companyName || !formData.companyWebsite || !formData.companyEmail) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.companyWebsite)) {
        alert('Please enter a valid website URL.');
        return;
      }
    } else if (step === 2) {
      if (!formData.jobTitle || !formData.jobDescription || !formData.jobLocation || !formData.jobType) {
        alert('Please fill in all required fields in Job Details.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="form-container">
      <div className='button-h'>
        <Link to="/JobinternAdmin" className="back-job-btn" id='back-job-btn'>Go Back</Link>
        <h2>Job Posting</h2>
        </div>
      <div className="progress-bar">
        {['Company Details', 'Job Details', 'Preview'].map((label, index) => (
          <div key={index} className={`step ${step === index + 1 ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="form-step">
          <h2>Company Details</h2>
          <label>
            Company Name*:
            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
          </label>
          <label>
            Website*:
            <input type="url" name="companyWebsite" value={formData.companyWebsite} onChange={handleInputChange} required />
          </label>
          <label>
            Email*:
            <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} required />
          </label>
          <label>
            Company Details:
            <textarea name="companyDetails" value={formData.companyDetails} onChange={handleInputChange}></textarea>
          </label>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Job Details</h2>
          <label>
            Job Category*:
            <select name="jobCategory" value={formData.jobCategory} onChange={handleInputChange}>
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
          </label>
          <label>
            Job Title*:
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
          </label>
          <label>
            Job Description*:
            <ReactQuill theme="snow" value={formData.jobDescription} onChange={handleJobDescriptionChange} />
          </label>
          <label>
            Location*:
            <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleInputChange} required />
          </label>
          <label>
            Job Type*:
            <input type="text" name="jobType" value={formData.jobType} onChange={handleInputChange} required />
          </label>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2>Preview</h2>
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Website:</strong> {formData.companyWebsite}</p>
          <p><strong>Email:</strong> {formData.companyEmail}</p>
          <p><strong>Company Details:</strong> {formData.companyDetails}</p>
          <p><strong>Job Category:</strong> {formData.jobCategory}</p>
          <p><strong>Job Title:</strong> {formData.jobTitle}</p>
          <p><strong>Job Description:</strong> {formData.jobDescription}</p>
          <p><strong>Location:</strong> {formData.jobLocation}</p>
          <p><strong>Job Type:</strong> {formData.jobType}</p>
          <button onClick={prevStep}>Back</button>
          <button onClick={handleSubmit}>Confirm & Post</button>
        </div>
      )}
    </div>
  );
};

export default JobPostingForm;
