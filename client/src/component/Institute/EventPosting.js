import React, { useState } from 'react';
import './EventPage.css';

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Event created successfully!");
    closeModal();
  };

  return (
    <>
    <div className="event-page">
      <div className="container" id='hevents'>
        <h1>Events</h1>
        <button className="create-event-btn" onClick={openModal}>Create Event</button>
      </div>

      <div className="event-cards">
        <div className="card">
          <img src="https://cdn.create.vista.com/downloads/7bd3d192-306a-4ceb-9908-803a73ebd430_1024.jpeg" alt="Event 1 Thumbnail" />
          <h3>Event Title 1</h3>
          <button className="view-btn">View</button>
        </div>
        <div className="card">
          <img src="https://s.tmimgcdn.com/scr/800x500/292300/interior-minimal-youtube-thumbnail-design-template-26_292317-original.jpg" alt="Event 2 Thumbnail" />
          <h3>Event Title 2</h3>
          <button className="view-btn">View</button>
        </div>
        <div className="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh9Zor_Xlt8LOc5IxB2kbKwMOejXAIaj9U1rbebM5l4trQr3rj2F6b86sW--vm0Xe94tY&usqp=CAU" alt="Event 3 Thumbnail" />
          <h3>Event Title 3</h3>
          <button className="view-btn">View</button>
        </div>
      </div>

      {/* Modal for Create Event */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Create Event</h2>
            <form id="create-event-form" onSubmit={handleSubmit}>
              <label htmlFor="thumbnail">Add Thumbnail:</label>
              <input type="file" id="thumbnail" name="thumbnail" accept="image/*" required />

              <label htmlFor="organizer">Organizer:</label>
              <input type="text" id="organizer" name="organizer" required />

              <label htmlFor="eventType">Event Type:</label>
              <select id="eventType" name="eventType" required>
                <option value="online">Online</option>
                <option value="inperson">In Person</option>
              </select>

              <label htmlFor="eventTitle">Event Title:</label>
              <input type="text" id="eventTitle" name="eventTitle" required />

              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" name="startDate" required />

              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" name="endDate" required />

              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4" required></textarea>

              <label htmlFor="speakers">Speakers Name:</label>
              <input type="text" id="speakers" name="speakers" required />

              <button type="submit" id='sub-button '>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default EventPage;
