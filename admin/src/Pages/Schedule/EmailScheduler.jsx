import React, { useState, useEffect } from 'react';
import './EmailScheduler.css';
import SideBar from '../../Components/SideBar/SideBar';
import { authAxios } from '../../services/axios-instance';

const EmailScheduler = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const fetchAllLecturers = async () => {
      const schedules = await authAxios.get('/schedule/get-all-schedule');
      setScheduleList(schedules.data);
      console.log(schedules.data);
    };
    fetchAllLecturers();
  }, []);

  const handleSelectEvent = (event) => setSelectedSchedule(event);

  const handleNewEvent = async () => {
    const newSchedulde = await authAxios.post('schedule/create-schedule');
    setSelectedSchedule(newSchedulde.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSchedule({ ...selectedSchedule, [name]: value });
  };

  const handleUpdate = async () => {
    if (!selectedSchedule.time_sent || !selectedSchedule.title || !selectedSchedule.body) {
      alert("Vui lòng điền đủ thông tin")
      return
    }
    const result = await authAxios.post('/schedule/update-schedule', { schedule: selectedSchedule })
    if (result.data) {
      alert('Cập nhật thành công');
      setScheduleList(prevList => {
        const updatedList = [
          ...prevList.filter(item => item.id_schedule !== result.data.id_schedule),
          result.data
        ];
        return updatedList.sort((a, b) => a.id_schedule - b.id_schedule);
      });
      setSelectedSchedule(null);
    } else {
      alert('Cập nhật thất bại');
    }
  };

  return (
    <div className='container-emai-scheduler'>
      <SideBar />
      <div className="email-scheduler">
        <div className="left-panel">
          <h2>Lịch gửi Email</h2>
          <ul className="event-list">
            {scheduleList.map(event => (
              <li
                key={event.id}
                onClick={() => handleSelectEvent(event)}
                className={selectedSchedule?.id === event.id ? 'selected-item' : ''}
              >
                {event.title}
              </li>
            ))}
          </ul>
          <button className="new-button" onClick={handleNewEvent}>+ Tạo mới</button>
        </div>

        <div className="right-panel">
          <h2>Chi tiết sự kiện</h2>
          {selectedSchedule ? (
            <div className="form-email">
              <label>Thời gian gửi:</label>
              <input
                type="datetime-local"
                name="time_sent"
                value={selectedSchedule.time_sent}
                onChange={handleChange}
              />

              <label>Tiêu đề Email:</label>
              <input
                type="text"
                name="title"
                value={selectedSchedule.title || ''}
                onChange={handleChange}
              />

              <label>Nội dung Email:</label>
              <textarea
                className='textarea-email-content'
                name="body"
                rows="14"
                value={selectedSchedule.body || ''}
                onChange={handleChange}
                spellCheck="false"
              ></textarea>
              <button className="save-button" onClick={handleUpdate}>💾 Cập nhật sự kiện</button>
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
