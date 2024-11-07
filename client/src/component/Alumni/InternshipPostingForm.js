import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './InternshipPostingForm.css';

const InternshipPostingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    companyDetails: '',
    internshipType: '',
    internshipTitle: '',
    internshipDescription: '',
    internshipLocation: '',
    stipend: '',
    duration: '',
    internshipCategory: 'Internship',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInternshipDescriptionChange = (value) => {
    setFormData({ ...formData, internshipDescription: value });
  };

  const handleSubmit = () => {
    alert('Internship successfully posted!');
    setStep(1);
    setFormData({
      companyName: '',
      companyWebsite: '',
      companyEmail: '',
      companyDetails: '',
      internshipType: '',
      internshipTitle: '',
      internshipDescription: '',
      internshipLocation: '',
      stipend: '',
      duration: '',
      internshipCategory: 'Internship',
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
      if (!formData.internshipTitle || !formData.internshipDescription || !formData.internshipLocation || !formData.internshipType || !formData.stipend || !formData.duration) {
        alert('Please fill in all required fields in Internship Details.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="internship-form-container">
      <div className='internship-button-h'>
        <Link to="/JobinternAdmin" className="internship-back-btn">Go Back</Link>
        <h2>Internship Posting</h2>
      </div>
      <div className="internship-progress-bar">
        {['Company Details', 'Internship Details', 'Preview'].map((label, index) => (
          <div key={index} className={`internship-step ${step === index + 1 ? 'active' : ''}`}>
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
          <button id='  #button-intern' onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="internship-form-step">
          <h2>Internship Details</h2>
          <label>
            Internship Title*:
            <input type="text" name="internshipTitle" value={formData.internshipTitle} onChange={handleInputChange} required />
          </label>
          <label>
            Internship Description*:
            <ReactQuill theme="snow" value={formData.internshipDescription} onChange={handleInternshipDescriptionChange} />
          </label>
          <label>
            Location*:
            <input type="text" name="internshipLocation" value={formData.internshipLocation} onChange={handleInputChange} required />
          </label>
          <label>
            Stipend*:
            <input type="text" name="stipend" value={formData.stipend} onChange={handleInputChange} required />
          </label>
          <label>
            Duration*:
            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required />
          </label>
          <label>
            Internship Type*:
            <input type="text" name="internshipType" value={formData.internshipType} onChange={handleInputChange} required />
          </label>
          <button id='#button-intern' onClick={prevStep}>Back</button>
          <button id='#button-intern' onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="internship-form-step">
          <h2>Preview</h2>
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Website:</strong> {formData.companyWebsite}</p>
          <p><strong>Email:</strong> {formData.companyEmail}</p>
          <p><strong>Company Details:</strong> {formData.companyDetails}</p>
          <p><strong>Internship Title:</strong> {formData.internshipTitle}</p>
          <p><strong>Internship Description:</strong> {formData.internshipDescription}</p>
          <p><strong>Location:</strong> {formData.internshipLocation}</p>
          <p><strong>Stipend:</strong> {formData.stipend}</p>
          <p><strong>Duration:</strong> {formData.duration}</p>
          <p><strong>Internship Type:</strong> {formData.internshipType}</p>
          <button id='#button-intern' onClick={prevStep}>Back</button>
          <button id='#button-intern' onClick={handleSubmit}>Confirm & Post</button>
        </div>
      )}
    </div>
  );
};

export default InternshipPostingForm;
