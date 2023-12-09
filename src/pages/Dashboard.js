import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Dashboard.css';

import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import useFirebaseAuthentication from '../useFirebaseAuthentication';

const Dashboard = () => {
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const db = getFirestore();
  const currentUser = useFirebaseAuthentication();


  const getUser = async () => {
    if (!currentUser) {
      return;
    }
    const userDoc = doc(db, "users", currentUser);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      setCalendarEvents(userData.events);
      calendarRef.current.getApi().refetchEvents();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const handleSelect = (info) => {
    setShowForm(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      calendarEvents.splice(calendarEvents.indexOf(selectedEvent), 1);
      selectedEvent.remove();
      setSelectedEvent(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //make sure no empty values
    if (!eventTitle || !eventDate || !eventTime) {
      alert('Please fill out all fields');
      return;
    }

    const start = new Date(`${eventDate}T${eventTime}`);
    
    if (isNaN(start.getTime())) {
      alert('Invalid date or time. Please check your input.');
      return;
    }

    const newEvent = {
      title: eventTitle,
      start,
      allDay: false,
    };

    //add event to database
    updateDoc(doc(db, 'users', currentUser), {
      events: arrayUnion(newEvent)
    });

    //add event to state
    setCalendarEvents(prevEvents => [...prevEvents, newEvent]);

    console.log(calendarEvents)

    //add event to calendar
    calendarRef.current.getApi().addEvent(newEvent);
    calendarRef.current.getApi().refetchEvents();

    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEventTitle('');
    setEventDate('');
    setEventTime('');
  };

  return (
    <div>
      <button onClick={handleSelect}>Add Event</button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Event Title:
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Event Date:
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </label>
          <label>
            Event Time:
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Event</button>
          <button type="button" onClick={handleFormCancel}>Cancel</button>
        </form>
      )}

      <button onClick={handleDeleteEvent} disabled={!selectedEvent}>
        Delete Event
      </button>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={calendarEvents}
        select={handleSelect}
        eventClick={handleEventClick}
        ref={calendarRef}
      />
    </div>
  );
};

export default Dashboard;

