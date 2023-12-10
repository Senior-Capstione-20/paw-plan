import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Dashboard.css';

import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import useFirebaseAuthentication from '../useFirebaseAuthentication';

const Dashboard = () => {
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [dogs, setDogs] = useState([]); 
  const [selectedDog, setSelectedDog] = useState('');

  const db = getFirestore();
  const currentUser = useFirebaseAuthentication();


  const getUser = () => {
    if (!currentUser) {
     return;
    }
    const userDoc = doc(db, "users", currentUser);
    getDoc(userDoc).then((userSnap) => {
     if (userSnap.exists()) {
       const userData = userSnap.data();
       const events = userData.events.map(event => ({
         id: event.id,
         title: event.title,
         start: event.start.toDate(),
         allDay: event.allDay,
       }));
       setCalendarEvents(events);
       setDogs(userData.dogs);
     } else {
       console.log("No such document!");
     }
    });
   };
   

  useEffect(() => {
    getUser();
  });

  const handleSelect = (info) => {
    setShowForm(true);
    setSelectedDog(dogs[0].petName);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      calendarEvents.splice(calendarEvents.indexOf(selectedEvent), 1);
      calendarRef.current.getApi().refetchEvents();
      //remove event from database
      const eventId = selectedEvent.id;
      const userDocRef = doc(db, 'users', currentUser);
      getDoc(userDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const events = userData.events.filter(event => event.id !== eventId);
        updateDoc(userDocRef, {
        events
        })
        .then(() => {
        console.log("Event successfully removed from array!");
        })
        .catch((error) => {
        console.error("Error removing event from array: ", error);
        });
      }
      });
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

    // Generate an event ID
    const eventId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Use the event ID
    const newEvent = {
    title: selectedDog + ' - ' + eventTitle,
    start,
    allDay: false,
    id: eventId,
    };

    //add event to database
    updateDoc(doc(db, 'users', currentUser), {
      events: arrayUnion(newEvent)
    });

    //add event to state
    setCalendarEvents(prevEvents => [...prevEvents, newEvent]);

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

  // Handle dog selection
  const handleDogSelect = (event) => {
    setSelectedDog(event.target.value);
  };

  return (
    <div className='calendar-container'> 
      <div className='event-wrapper'>
        {!showForm && (
          <>
            <button onClick={handleSelect}>Add Event</button>
            <button onClick={handleDeleteEvent} disabled={!selectedEvent}> Delete Event </button>
          </>
        )}

        {showForm && (
          <form onSubmit={handleFormSubmit}>
              <select value={selectedDog} onChange={handleDogSelect}>
                {dogs.map((dog, index) => (
                  <option key={index} value={dog.petName}>{dog.petName}</option>
                ))}
              </select>
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
      </div>        
        <div className='calendar-box'>
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
        {selectedEvent && (
          <div className='event-details'>
            <h2>Last Selected Event Details: <span className='event'>{selectedEvent.title}, Start: {selectedEvent.start.toLocaleString()} </span></h2>
          </div>
        )}  
      </div>
  );
};

export default Dashboard;

