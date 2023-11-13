import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Dashboard = () => {
  const handleSelect = (info) => {
    const title = prompt('Enter an event title:');
    if (title) {
      // Add the event to the calendar
      calendarRef.current.addEvent({
        title: title,
        start: info.startStr,
        end: info.endStr,
      });
    }
  };

  const calendarRef = React.createRef();

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