import React, { useState } from 'react';
import './EventUser.css';
import { Link } from 'react-router-dom';
import event from'../../Assest/img/event-icon.png'

const EventUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openViewModal = (event) => {
    setCurrentEvent(event);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentEvent(null);
  };

  const openUpdateModal = (event) => {
    setCurrentEvent(event);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentEvent(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Event created successfully!");
    closeModal();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    alert("Event updated successfully!");
    closeUpdateModal();
  };

  return (
    <>
    <div className="event-page">
      <div className="container" id='hevents'>
        <h1>Events</h1>
        {/* <button className="create-event-btn" onClick={openModal}>Create Event</button> */}
        <img src={event} alt="Logo" id='img-event'/> 
      </div>

      <div className="event-cards">
        {[1, 2, 3].map((index) => (
          <div className="card" key={index}>
            <img src={`https://cdn.create.vista.com/downloads/7bd3d192-306a-4ceb-9908-803a73ebd430_1024.jpeg`} alt={`Event ${index} Thumbnail`} />
            <h3>Event Title {index}</h3>
            <div className='btn-event'>
            <Link to="/events" className="view-btn" >View</Link>
              {/* <button className="view-btn" onClick={() => openViewModal({ title: `Event Title ${index}`, description: `Description for Event ${index}`, organizer: `Organizer ${index}`, date: '2024-10-10', location: 'Online' })}>View</button> */}
              {/* <button className="update-event-btn" onClick={() => openUpdateModal({ title: `Event Title ${index}`, organizer: `Organizer ${index}`, eventType: 'online', eventFor: 'student', date: '2024-10-10', endDate: '2024-10-12', description: `Description for Event ${index}`, speakers: 'Speaker Name' })}>Update</button>
              <button className="e-delete-btn">Delete</button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create Event */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className='head-event'>
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Create Event</h2>
            </div>
            <div className='event-form'>
              <form id="create-event-form" onSubmit={handleSubmit}>
                <label htmlFor="thumbnail">Add Thumbnail:</label>
                <input type="file" id="thumbnail" name="thumbnail" accept="image/*" required />

                <label htmlFor="organizer">Organizer:</label>
                <input type="text" id="organizer" name="organizer" required />

                <label htmlFor="eventFor">This Event is For:</label>
                <select id="eventFor" name="eventFor" required>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>

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
        </div>
      )}

      {/* Modal for Viewing Event Details */}
      {isViewModalOpen && currentEvent && (
        <div className="modal">
          <div className="modal-content">
            <div className='head-event'>
              <span className="close" onClick={closeViewModal}>&times;</span>
              <h2>Event Details</h2>
            </div>
            <div className='event-details'>
              <p><strong>Title:</strong> {currentEvent.title}</p>
              <p><strong>Description:</strong> {currentEvent.description}</p>
              <p><strong>Organizer:</strong> {currentEvent.organizer}</p>
              <p><strong>Date:</strong> {currentEvent.date}</p>
              <p><strong>Location:</strong> {currentEvent.location}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Event */}
      {isUpdateModalOpen && currentEvent && (
        <div className="modal">
          <div className="modal-content">
            <div className='head-event'>
              <span className="close" onClick={closeUpdateModal}>&times;</span>
              <h2>Update Event</h2>
            </div>
            <div className='event-form'>
              <form id="update-event-form" onSubmit={handleUpdateSubmit}>
                <label htmlFor="thumbnail">Update Thumbnail:</label>
                <input type="file" id="thumbnail" name="thumbnail" accept="image/*" />

                <label htmlFor="organizer">Organizer:</label>
                <input type="text" id="organizer" name="organizer" defaultValue={currentEvent.organizer} required />

                <label htmlFor="eventFor">This Event is For:</label>
                <select id="eventFor" name="eventFor" defaultValue={currentEvent.eventFor} required>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>

                <label htmlFor="eventType">Event Type:</label>
                <select id="eventType" name="eventType" defaultValue={currentEvent.eventType} required>
                  <option value="online">Online</option>
                  <option value="inperson">In Person</option>
                </select>

                <label htmlFor="eventTitle">Event Title:</label>
                <input type="text" id="eventTitle" name="eventTitle" defaultValue={currentEvent.title} required />

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" defaultValue={currentEvent.date} required />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate" defaultValue={currentEvent.endDate} required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows="4" defaultValue={currentEvent.description} required></textarea>

                <label htmlFor="speakers">Speakers Name:</label>
                <input type="text" id="speakers" name="speakers" defaultValue={currentEvent.speakers} required />

                <button type="submit" id='sub-button '>Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default EventUser;
