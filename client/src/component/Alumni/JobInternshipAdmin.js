import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./JobInternshipAdmin.css";
import { AllJobs, deleteJob, GetJobbyId } from "../../Redux/Reducers/jobSlice";
import { CurrentUser } from "../../Redux/Reducers/userSlice";

const JobInternshipTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("job");
  const [filterBranch, setFilterBranch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  // Fetch jobs from Redux store
  const { jobs, job } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(CurrentUser());
    dispatch(AllJobs());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (e) => {
    setFilterBranch(e.target.value);
  };

  const openPopup = (jobId) => {
    dispatch(GetJobbyId(jobId)).then(() => {
      setPopupContent(job);
      setIsPopupOpen(true);
    });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId)).then(() => {
      navigate("/JobinternAdmin");
      window.location.reload();
    });
  };

  return (
    <div className="job-internship-container">
      <div className="container" id="Hjob">
        <div className="text-h">
          <h1>Job & Internship</h1>
        </div>
        <div className="button-h">
          <Link to="/InternPost" className="create-job-btn">
            Post JOB / INTERNSHIP
          </Link>
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
        <button
          className={activeTab === "job" ? "active" : ""}
          onClick={() => handleTabClick("job")}
        >
          Job
        </button>
        <button
          className={activeTab === "internship" ? "active" : ""}
          onClick={() => handleTabClick("internship")}
        >
          Internship
        </button>
      </div>

      <div className="card-container">
        {activeTab === "job" &&
          jobs
            ?.filter(
              (job) =>
                job.job_type === "Full-time" || job.job_type === "Part-time"
            )
            .map((job) => (
              <div key={job._id} className="info-box">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>Job Location: {job.job_location}</p>
                <p>Job Type: {job.job_type}</p>
                <div className="btn-job">
                  <button
                    className="view-btn"
                    onClick={() => openPopup(job._id)}
                  >
                    View
                  </button>
                  {user?._id === job?.postedBy?.toString() ||
                  user?.role === "Admin" ? (
                    <>
                      <button
                        className="update-event-btn"
                        onClick={() => {
                          /* Handle update job */
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="e-delete-btn"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        {activeTab === "internship" &&
          jobs
            ?.filter((job) => job.job_type === "Internship")
            .map((internship) => (
              <div key={internship._id} className="info-box">
                <h3>{internship.title}</h3>
                <p>{internship.company}</p>
                <p>Job Location: {internship.job_location}</p>
                <p>Job Type: {internship.job_type}</p>
                <div className="btn-job">
                  <button
                    className="view-btn"
                    onClick={() => openPopup(internship._id)}
                  >
                    View
                  </button>
                  {user?._id === job?.postedBy?.toString() ||
                  user?.role === "Admin" ? (
                    <>
                      <button className="update-event-btn">Update</button>
                      <button
                        className="e-delete-btn"
                        onClick={() => handleDeleteJob(internship._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
      </div>

      {isPopupOpen && popupContent && (
        <div className="popup-wrapper">
          <div className="popup-content">
            <span className="close-button" onClick={closePopup}>
              &times;
            </span>
            <h2 className="popup-header">Job Details</h2>
            <p>
              <strong>Title:</strong> {popupContent.title}
            </p>
            <p>
              <strong>Company:</strong> {popupContent.company}
            </p>
            <p>
              <strong>Location:</strong> {popupContent.job_location}
            </p>
            <p>
              <strong>Type:</strong> {popupContent.job_type}
            </p>
            <p>
              <strong>Description:</strong> {popupContent.description}
            </p>
            <p>
              <strong>Posted On:</strong> {popupContent.createdAt}
            </p>
            <div className="action-buttons">
              <button className="close-btn" onClick={closePopup}>
                Close
              </button>
              <Link to={popupContent.link} className="apply-btn">
                Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInternshipTabs;
