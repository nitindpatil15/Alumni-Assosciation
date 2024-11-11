import React, { useEffect, useState } from 'react';
import './EventUser.css';
import { Link } from 'react-router-dom';
import event from'../../Assest/img/event-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllEvent } from '../../Redux/Reducers/eventSlice';

const EventUser = () => {
  const dispatch = useDispatch()
  const {events,error,loading} = useSelector((state)=>state.event)


  useEffect(()=>{
    dispatch(GetAllEvent())
  },[dispatch])

  if(loading){
    return <div style={{fontSize:"2rem",textAlign:"center"}}>Loading...</div>
  }

  if(error){
    return <div style={{fontSize:"2rem",textAlign:"center"}}>Events not available</div>
  }

  return (
    <>
    <div className="event-page">
      <div className="container" id='hevents'>
        <h1>Events</h1>
        {/* <button className="create-event-btn" onClick={openModal}>Create Event</button> */}
        <img src={event} alt="Logo" id='img-event'/> 
      </div>

      <div className="event-cards">
        {events.map((event) => (
          <div className="card" key={event._id}>
            <img src={event.image} alt={`Event ${event.title} Thumbnail`} />
            <h3>{event.event_title}</h3>
            <div className='btn-event'>
            <Link to={`/events/${event._id}`} className="view-btn" >View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default EventUser;
