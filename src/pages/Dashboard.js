import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Dashboard.css';

const Dashboard = () => {
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setCalendarEvents(savedEvents);
  }, []);

  const updateLocalStorage = (events) => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  };

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
      updateLocalStorage(calendarEvents);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

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

    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
    
    setShowForm(false);
    setEventTitle('');
    setEventDate('');
    setEventTime('');

    // Update localStorage with the new events
    updateLocalStorage([...calendarEvents, newEvent]);
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

