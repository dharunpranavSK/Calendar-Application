import React, { useState } from 'react';
import './MainContent.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Static events list
const staticEvents = [
  { title: "Event-1", date: "2025-06-25", time: "10:00 AM", duration: "1h" },
  { title: "Event-2", date: "2025-07-25", time: "11:00 AM", duration: "30m" },
  { title: "Event-3", date: "2025-08-25", time: "1:00 PM", duration: "1h" },
  { title: "Event-4", date: "2025-09-25", time: "3:00 PM", duration: "30m" },
  { title: "Event-5", date: "2025-10-26", time: "6:00 AM", duration: "1h" }
];

const MainContent = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const formatDateKey = (day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getEventsForDay = (day) => {
    const dateKey = formatDateKey(day);
    return staticEvents.filter((event) => event.date === dateKey);
  };

  const getCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i });
    }
    return days;
  };

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const calendarDays = getCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="main-content">
      <div className="calendar-topbar">
        <div className="calendar-footer">
          {today.getDate()} {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
        </div>
        <div className="calendar-controls">
          <button onClick={prevMonth}><FaChevronLeft /></button>
          <span>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </span>
          <button onClick={nextMonth}><FaChevronRight /></button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekdays.map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`} className="calendar-day empty" />
        ))}

        {calendarDays.map((d, index) => {
          const events = getEventsForDay(d.day);
          const visibleEvents = events.slice(0, 2);
          const extraCount = events.length - visibleEvents.length;

          return (
            <div key={index} className={`calendar-day ${isToday(d.day) ? 'today' : ''}`}>
              <div className="date-number">{d.day}</div>
              <div className="event-placeholder">
                {visibleEvents.map((event, i) => (
                  <div key={i} className="event-item">
                    <div
  className="event-item"
  data-details={`${event.time} • ${event.duration}`}
>
  {event.title}
</div>

                  </div>
                ))}
                {extraCount > 0 && (
                  <div className="event-item event-more">+{extraCount} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainContent;
