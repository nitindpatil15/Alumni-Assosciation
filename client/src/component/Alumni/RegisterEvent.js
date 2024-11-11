import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./RegisterEvents.css";
import { useDispatch, useSelector } from "react-redux";
import { GetEvent, UserRegisterEvent } from "../../Redux/Reducers/eventSlice";

const Registerevent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector((state) => state.event);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFinalStepModalOpen, setIsFinalStepModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(GetEvent(id));
    }
  }, [dispatch, id]);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsFinalStepModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventRegister = (e) => {
    e.preventDefault();
    console.log("clicked", formData);
    dispatch(UserRegisterEvent({id:event._id, data:formData}))
      .then(() => {
        console.log("Event Registered");
        setIsRegisterModalOpen(false);
        setIsFinalStepModalOpen(true);
      })
      .catch((error) => console.error("Error registering event:", error));
  };

  const addToCalendar = () => {
    const title = event?.event_title;
    const location = event?.event_type;
    const details = event?.event_description;
    const startDate = event?.start_date.replace(/-/g, "") + "T000000Z";
    const endDate = event?.end_date.replace(/-/g, "") + "T235959Z";

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <div className="container" id="RE-cont">
      <div className="re-event-card">
        <img
          src={event?.image}
          alt={event?.event_title}
          className="thumbnail"
        />
        <div className="event-details">
          <h2>{event?.event_title}</h2>
          <p>
            <strong>Date:</strong> {event?.start_date}
          </p>
          <p>
            <strong>Arranged by:</strong> {event?.organizer}
          </p>
          <p>
            <strong>Event Type:</strong> {event?.event_type}
          </p>
          <p>
            <strong>Organized For:</strong> {event?.organized_for || ""}
          </p>
          <button className="register-button" onClick={openRegisterModal}>
            Register for Event
          </button>
          <Link to="/EventUser" className="register-button">
            Go Back
          </Link>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="modal-reg" onClick={closeModal}>
          <div
            className="modal-reg-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="head-event">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Register for the Event</h2>
            </div>
            <form onSubmit={handleEventRegister}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              <button type="submit" id="sub-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Final Step Modal */}
      {isFinalStepModalOpen && (
        <div className="modal-reg" onClick={closeModal}>
          <div
            className="modal-reg-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="head-event">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Congratulations!</h2>
            </div>
            <div className="mod-conten">
              <p>
                Here is your final step. Click on the button below to add the
                webinar to your calendar.
              </p>
              <button className="attend-button" onClick={addToCalendar}>
                Attend Webinar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registerevent;
