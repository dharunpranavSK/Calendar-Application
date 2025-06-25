import React, { useState } from 'react';
import './MainContent.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MainContent = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getCalendarDays = () => {
    const days = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    while (days.length % 7 !== 0) {
      days.push({ day: days.length, currentMonth: false });
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

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
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}

        {calendarDays.map((d, index) => (
          <div
            key={index}
            className={`calendar-day ${d.currentMonth ? '' : 'dimmed'} ${
              isToday(d.day) && d.currentMonth ? 'today' : ''
            }`}
          >
            <div className="date-number">{d.day}</div>
            <div className="event-placeholder">
              {/* Placeholder for future event cards */}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default MainContent;
