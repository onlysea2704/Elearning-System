import React, { useState } from 'react';
import './EmailScheduler.css';
import SideBar from '../../Components/SideBar/SideBar';

const EmailScheduler = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleList, setScheduleList] = useState([
    {
      id: 1,
      title: 'Chúc mừng sinh nhật',
      time: '2025-06-01T08:00',
      content: 'Chúc bạn một ngày sinh nhật vui vẻ!',
    },
    {
      id: 2,
      title: 'Nhắc nhở gia hạn',
      time: '2025-06-15T10:00',
      content: 'Vui lòng gia hạn gói học của bạn.',
    },
  ]);

  const handleSelectEvent = (event) => setSelectedEvent(event);

  const handleNewEvent = () => {
    setSelectedEvent({ title: '', content: '', time: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleSave = () => {
    // if (!selectedEvent.title || !selectedEvent.time || !selectedEvent.content) return;

    if (selectedEvent.id) {
      setScheduleList(scheduleList.map(item => item.id === selectedEvent.id ? selectedEvent : item));
    } else {
      const newId = Date.now();
      setScheduleList([...scheduleList, { ...selectedEvent, id: newId }]);
    }
    setSelectedEvent(null);
  };

  return (
    <div className='container-emai-scheduler'>
      <SideBar/>
      <div className="email-scheduler">
        <div className="left-panel">
          <h2>Lịch gửi Email</h2>
          <ul className="event-list">
            {scheduleList.map(event => (
              <li
                key={event.id}
                onClick={() => handleSelectEvent(event)}
                className={selectedEvent?.id === event.id ? 'selected' : ''}
              >
                {event.title}
              </li>
            ))}
          </ul>
          <button className="new-button" onClick={handleNewEvent}>+ Tạo mới</button>
        </div>

        <div className="right-panel">
          <h2>Chi tiết sự kiện</h2>
          {selectedEvent ? (
            <div className="form">
              <label>Thời gian gửi:</label>
              <input
                type="datetime-local"
                name="time"
                value={selectedEvent.time}
                onChange={handleChange}
              />

              <label>Tiêu đề Email:</label>
              <input
                type="text"
                name="title"
                value={selectedEvent.title}
                onChange={handleChange}
              />

              <label>Nội dung Email:</label>
              <textarea
                name="content"
                rows="6"
                value={selectedEvent.content}
                onChange={handleChange}
              ></textarea>

              <button className="save-button" onClick={handleSave}>💾 Lưu</button>
            </div>
          ) : (
            <p className="placeholder">Chọn một sự kiện hoặc nhấn "Tạo mới" để bắt đầu.</p>
          )}
        </div>
      </div>

    </div>

  );
};

export default EmailScheduler;
