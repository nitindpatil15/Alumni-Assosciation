import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterEvents.css';

const RegisterEvent = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFinalStepModalOpen, setIsFinalStepModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsFinalStepModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegisterModalOpen(false);
    setIsFinalStepModalOpen(true);
  };

  const addToCalendar = () => {
    const title = 'Webinar Title';
    const location = 'Online Event';
    const details = 'Join us for an exciting webinar on XYZ.';
    const startDate = '20241025T090000Z';
    const endDate = '20241025T100000Z';

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="container" id='RE-cont'>
      <div className="re-event-card">
        <img
          src="https://cdn.create.vista.com/downloads/7bd3d192-306a-4ceb-9908-803a73ebd430_1024.jpeg"
          alt="Webinar Thumbnail"
          className="thumbnail"
        />
        <div className="event-details">
          <h2>Webinar Title</h2>
          <p><strong>Date:</strong> October 25, 2024</p>
          <p><strong>Arranged by:</strong> Organization XYZ</p>
          <button className="register-button" onClick={openRegisterModal}>
            Register for Event
          </button>
          <Link to="/EventUser" className="register-button" >Go Back</Link>
        
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="modal-reg" onClick={closeModal}>
          <div className="modal-reg-content" onClick={(e) => e.stopPropagation()}>
          <div className='head-event'>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Register for the Event</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="mobile">Mobile Number:</label>
              <input type="tel" id="mobile" name="mobile" required />
              <button type="submit" id='sub-button'>Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Final Step Modal */}
      {isFinalStepModalOpen && (
        <div className="modal-reg" onClick={closeModal}>
          <div className="modal-reg-content" onClick={(e) => e.stopPropagation()}>
          <div className='head-event'>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Congratulations!</h2>
            </div>
            <div className='mod-conten'>
            <p>Here is your final step. Click on the button below to add the webinar to your calendar.</p>
            <button className="attend-button" onClick={addToCalendar}>Attend Webinar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterEvent;
