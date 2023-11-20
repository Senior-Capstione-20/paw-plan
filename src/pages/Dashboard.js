import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Dashboard = () => {
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = (info) => {
    setShowForm(true);
  };

  const handleEventClick = (clickInfo) => {
    // Handle event click, you can perform actions such as deletion here
    setSelectedEvent(clickInfo.event);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove(); // Remove the selected event from the calendar
      setSelectedEvent(null); // Clear the selected event
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const start = new Date(`${eventDate}T${eventTime}`);
    
    // Add the event to the calendar
    calendarRef.current.getApi().addEvent({
      title: eventTitle,
      start: start.toISOString(),
      allDay: false, // Set to false to specify a time-based event
    });

    // Close the form and reset input values
    setShowForm(false);
    setEventTitle('');
    setEventDate('');
    setEventTime('');
  };

  const handleFormCancel = () => {
    // Close the form and reset input values
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
        events={[]}
        select={handleSelect}
        eventClick={handleEventClick}
        ref={calendarRef}
      />
    </div>
  );
};

export default Dashboard;
