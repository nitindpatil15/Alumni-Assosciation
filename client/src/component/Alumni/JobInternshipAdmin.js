import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JobInternshipAdmin.css'; 

const JobInternshipTabs = () => {
  const [activeTab, setActiveTab] = useState('job');
  const [filterBranch, setFilterBranch] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (e) => {
    setFilterBranch(e.target.value);
  };

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const jobs = [
    { role: 'Software Engineer', company: 'ABC Corp', location: 'NYC', mode: 'Remote', type: 'Full-Time' },
    { role: 'Data Analyst', company: 'XYZ Inc.', location: 'SF', mode: 'Hybrid', type: 'Part-Time' },
    { role: 'Frontend Developer', company: 'TechSolutions', location: 'LA', mode: 'Onsite', type: 'Full-Time' },
  ];

  const internships = [
    { role: 'Web Dev Intern', company: 'ABC Corp', applications: 5, daysLeft: 10 },
    { role: 'Data Science Intern', company: 'XYZ Inc.', applications: 3, daysLeft: 20 },
    { role: 'Marketing Intern', company: 'TechSolutions', applications: 7, daysLeft: 5 },
  ];

  return (
    <div className="job-internship-container">
      <div className="container" id='Hjob'>
        <div className='text-h'>
        <h1>Job & Internship</h1>
        </div>
        <div className='button-h'>
        <Link to="/post-job" className="create-job-btn">Post Job</Link>
        <Link to="/InternPost" className="create-job-btn">Post Internship</Link>
        </div>
      </div>
      <div className="filter">
        <label>Filter by Branch:</label>
        <select onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="computer">Computer Engineering</option>
          <option value="electronics">Electronics & Telecommunication</option>
          <option value="electrical">Electrical Engineering</option>
          <option value="mechanical">Mechanical Engineering</option>
        </select>
      </div>

      <div className="tabs">
        <button className={activeTab === 'job' ? 'active' : ''} onClick={() => handleTabClick('job')}>Job</button>
        <button className={activeTab === 'internship' ? 'active' : ''} onClick={() => handleTabClick('internship')}>Internship</button>
      </div>

      <div className="card-container">
        {activeTab === 'job' && jobs.map((job, index) => (
          <div key={index} className="info-box" onClick={() => openPopup(job)}>
            <h3>{job.role}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.mode}</p>
            <p>{job.type}</p>
            <div className='btn-job'>
            <button className="view-btn">View</button>
              <button className="update-event-btn" >Update</button>
              <button className="e-delete-btn">Delete</button>
              </div>
          </div>
        ))}
        {activeTab === 'internship' && internships.map((internship, index) => (
          <div key={index} className="info-box" onClick={() => openPopup(internship)}>
            <h3>{internship.role}</h3>
            <p>{internship.company}</p>
            <p>Applications: {internship.applications}</p>
            <p>Days Left: {internship.daysLeft}</p>
            <div className='btn-job'>
            <button className="view-btn">View</button>
              <button className="update-event-btn" >Update</button>
              <button className="e-delete-btn">Delete</button>
              </div>
          </div>
          
        ))}
      </div>

      {isPopupOpen && popupContent && (
        <div className="popup-wrapper">
          <div className="popup-content">
            <span className="close-button" onClick={closePopup}>&times;</span>
            <h2 className="popup-header">Company Details</h2>
                      <div className="popup-body">
                          <p><strong>Company Name:</strong> {popupContent.company}</p>
                          <p><strong>Company Website:</strong> <a href={popupContent.companyWebsite} target="_blank" rel="noopener noreferrer">{popupContent.companyWebsite}</a></p>
                          <p><strong>Company Email:</strong> {popupContent.companyEmail}</p>
                          <p><strong>Company Details:</strong> {popupContent.companyDetails}</p>

            <h2 className="popup-header">Job Details</h2>
                          <p><strong>Job Type:</strong> {popupContent.type || 'N/A'}</p>
                          <p><strong>Job Title:</strong> {popupContent.role}</p>
                          <p><strong>Job Description:</strong> {popupContent.jobDescription}</p>
                          <p><strong>Job Location:</strong> {popupContent.location || 'N/A'}</p>
                          <p><strong>Job Category:</strong> {popupContent.jobCategory || 'N/A'}</p>
                      </div>

            <div className="action-buttons">
              <button className="close-btn" onClick={closePopup}>Close</button>
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInternshipTabs;
