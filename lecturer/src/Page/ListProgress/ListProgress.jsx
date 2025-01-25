import React, { useState } from 'react';
import './ListProgress.css';
import SideBar from '../../Components/SideBar/SideBar'
import ItemProgress from '../../Components/ItemProgress/ItemProgress';
import av from '../../Assets/Image/BG.png'
import av1 from '../../Assets/Image/BG1.png'
import av2 from '../../Assets/Image/BG2.png'
import av3 from '../../Assets/Image/BG3.png'

const students = [
  { id: 1, name: 'Nguyễn Văn Hải Đăng', course: 'English for Beginners', progress: '75%', avatar: av },
  { id: 2, name: 'Trần Thị Bích Ngọc', course: 'Advanced English Grammar', progress: '50%', avatar: av1 },
  { id: 3, name: 'Lê Hoàng Nam', course: 'English for Business', progress: '85%', avatar: av2 },
  { id: 4, name: 'Phạm Thu Hương', course: 'Conversational English', progress: '60%', avatar: av3 },
  { id: 5, name: 'Hoàng Gia Bảo', course: 'English for Travel', progress: '90%', avatar: av },
  { id: 6, name: 'Nguyễn Khánh Linh', course: 'IELTS Preparation', progress: '40%', avatar: av1 },
  { id: 7, name: 'Vũ Hồng Quân', course: 'English for Business', progress: '78%', avatar: av2 },
  { id: 8, name: 'Lê Thanh Mai', course: 'Advanced English Grammar', progress: '67%', avatar: av3 },
  { id: 9, name: 'Đặng Minh Châu', course: 'English for Beginners', progress: '82%', avatar: av },
  { id: 10, name: 'Nguyễn Thảo Vy', course: 'Conversational English', progress: '55%', avatar: av1 },
  { id: 11, name: 'Phan Bảo Long', course: 'IELTS Preparation', progress: '66%', avatar: av2 },
  { id: 12, name: 'Lý Minh Tú', course: 'English for Travel', progress: '72%', avatar: av3 },

];

const ListProgress = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='student-progress-list-container'>
      <SideBar/>
      <div className="student-list">
        <h2 className="title">Tiến Độ Học Tập</h2>
        <div className="student-items">
          {paginatedStudents.map((student) => (
            <ItemProgress student={student}/>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage * itemsPerPage >= students.length}
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>

  );
};

export default ListProgress;
