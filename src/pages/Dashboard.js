import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Dashboard = () => {
  const calendarRef = useRef(null);

  const handleSelect = (info) => {
    const title = prompt('Enter an event title:');
    if (title) {
      // Add the event to the calendar
      calendarRef.current.getApi().addEvent({
        title: title,
        start: info.startStr,
        end: info.endStr,
      });
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={[]}
        select={handleSelect}
        ref={calendarRef}
      />
    </div>
  );
};

export default Dashboard;
