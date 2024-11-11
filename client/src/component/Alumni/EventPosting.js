import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  GetAllEvent,
  UpdateEvent,
  DeleteEvent,
} from "../../Redux/Reducers/eventSlice"; // Adjust the import path as needed
import "./EventPage.css";
import { CurrentUser } from "../../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { events, loading, error } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    dispatch(CurrentUser());
    dispatch(GetAllEvent()); // Fetch all events when component mounts
  }, [dispatch]);

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
    const data = new FormData(event.target);
    dispatch(addEvent(data)).then(() => {
      window.location.reload();
    });
    closeModal();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(UpdateEvent({ id: currentEvent._id, data })).then(() => {
      window.location.reload();
    });
    closeUpdateModal();
  };

  const handleDelete = (id) => {
    dispatch(DeleteEvent(id)).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="event-page">
      <div className="container" id="hevents">
        <h1>Events</h1>
        <button className="create-event-btn" onClick={openModal}>
          {loading === "loading" ? "Uploading.." : "Create Event"}
        </button>
      </div>

      <div className="event-cards">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          events.map((event) => (
            <div className="card" key={event._id}>
              <img
                src={event.image}
                alt={`Event ${event.event_title} Thumbnail`}
              />
              <h3>{event.event_title}</h3>
              <div className="btn-event">
                {user?.role === "Admin" ? (
                  <button
                    className="view-btn"
                    onClick={() => openViewModal(event)}
                  >
                    View
                  </button>
                ) : (
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    View
                  </button>
                )}
                {user?._id === event?.owner?.toString() ||
                user?.role === "Admin" ? (
                  <>
                    <button
                      className="update-event-btn"
                      onClick={() => openUpdateModal(event)}
                    >
                      Update
                    </button>
                    <button
                      className="e-delete-btn"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Create Event */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="head-event">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Create Event</h2>
            </div>
            <div className="event-form">
              <form id="create-event-form" onSubmit={handleSubmit}>
                <label htmlFor="thumbnail">Add Thumbnail:</label>
                <input type="file" id="image" name="image" required />

                <label htmlFor="organizer">Organizer:</label>
                <input type="text" id="organizer" name="organizer" required />

                <label htmlFor="eventFor">This Event is For:</label>
                <select id="eventFor" name="organized_for" required>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>

                <label htmlFor="eventType">Event Type:</label>
                <select id="eventType" name="event_type" required>
                  <option value="online">Online</option>
                  <option value="inperson">In Person</option>
                </select>

                <label htmlFor="eventTitle">Event Title:</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="event_title"
                  required
                />

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="start_date" required />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" name="end_date" required />

                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="event_description"
                  rows="4"
                  required
                ></textarea>

                <label htmlFor="speakers">Speakers Name:</label>
                <input type="text" id="speakers" name="speaker_name" required />

                <button type="submit" id="sub-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Event Details */}
      {isViewModalOpen && currentEvent && (
        <div className="modal">
          <div className="modal-content">
            <div className="head-event">
              <span className="close" onClick={closeViewModal}>
                &times;
              </span>
              <h2>Event Details</h2>
            </div>
            <div className="event-details">
              <p>
                <strong>Title:</strong> {currentEvent.event_title}
              </p>
              <p>
                <strong>Description:</strong> {currentEvent.event_description}
              </p>
              <p>
                <strong>Organizer:</strong> {currentEvent.organizer}
              </p>
              <p>
                <strong>Date:</strong> {currentEvent.start_date}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {currentEvent.event_type === "online" ? "Online" : "In-Person"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Event */}
      {isUpdateModalOpen && currentEvent && (
        <div className="modal">
          <div className="modal-content">
            <div className="head-event">
              <span className="close" onClick={closeUpdateModal}>
                &times;
              </span>
              <h2>Update Event</h2>
            </div>
            <div className="event-form">
              <form id="update-event-form" onSubmit={handleUpdateSubmit}>
                <label htmlFor="thumbnail">Update Thumbnail:</label>
                <input type="file" id="image" name="image" />

                <label htmlFor="organizer">Organizer:</label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  defaultValue={currentEvent.organizer}
                  required
                />

                <label htmlFor="eventFor">This Event is For:</label>
                <select
                  id="eventFor"
                  name="eventFor"
                  defaultValue={currentEvent.eventFor}
                  required
                >
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>

                <label htmlFor="eventType">Event Type:</label>
                <select
                  id="eventType"
                  name="event_type"
                  defaultValue={currentEvent.event_type}
                  required
                >
                  <option value="online">Online</option>
                  <option value="inperson">In Person</option>
                </select>

                <label htmlFor="eventTitle">Event Title:</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="event_title"
                  defaultValue={currentEvent.event_title}
                  required
                />

                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="start_date"
                  defaultValue={currentEvent.start_date}
                  required
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="end_date"
                  defaultValue={currentEvent.end_date}
                  required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="event_description"
                  rows="4"
                  defaultValue={currentEvent.event_description}
                  required
                ></textarea>

                <label htmlFor="speakers">Speakers Name:</label>
                <input
                  type="text"
                  id="speakers"
                  name="speaker_name"
                  defaultValue={currentEvent.speaker_name}
                  required
                />

                <button type="submit" id="sub-button">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
