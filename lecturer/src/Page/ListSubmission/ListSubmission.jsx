import React, { useState } from 'react';
import './ListSubmission.css';
import SideBar from '../../Components/SideBar/SideBar';
import ItemSubmission from '../../Components/ItemSubmission/ItemSubmission';

const submissions = [
  { studentName: 'Nguyễn Minh Anh', lessonName: 'Speaking Practice 1', courseName: 'English for Beginners', isGraded: true, typeSubmission: "speaking" },
  { studentName: 'Trần Mai Nhi', lessonName: 'Grammar Exercise 4', courseName: 'Advanced English Grammar', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Lê Hoàng Nam', lessonName: 'Business Writing Techniques 7', courseName: 'English for Business', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Phạm Thu Phương', lessonName: 'Conversation Skills 2', courseName: 'Conversational English', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Trần Duy Đức', lessonName: 'Speaking Practice 1', courseName: 'English for Beginners', isGraded: true, typeSubmission: "writing" },
  { studentName: 'Phan Thanh Tùng', lessonName: 'Travel English Vocabulary 3', courseName: 'English for Travel', isGraded: true, typeSubmission: "writing" },
  { studentName: 'Trần Thảo Nhi', lessonName: 'Grammar Exercise 4', courseName: 'Advanced English Grammar', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Nguyễn Thị Linh', lessonName: 'IELTS Speaking Simulation 5', courseName: 'IELTS Preparation', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Vũ Hồng Quân', lessonName: 'Business English Presentation 6', courseName: 'English for Business', isGraded: true, typeSubmission: "speaking" },
  { studentName: 'Lê Thanh Mai', lessonName: 'Advanced Grammar Review 7', courseName: 'Advanced English Grammar', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Nguyễn Phương Linh', lessonName: 'IELTS Speaking Simulation 5', courseName: 'IELTS Preparation', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Đặng Minh Quân', lessonName: 'Business English Presentation 6', courseName: 'English for Business', isGraded: true, typeSubmission: "speaking" },
  { studentName: 'Lê Thanh Hoa', lessonName: 'Advanced Grammar Review 7', courseName: 'Advanced English Grammar', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Nguyễn Khánh Linh', lessonName: 'IELTS Writing Task 5', courseName: 'IELTS Preparation', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Phạm Duy Hải', lessonName: 'Business English Email Writing 6', courseName: 'English for Business', isGraded: true, typeSubmission: "writing" },
  { studentName: 'Phạm Phương Mai', lessonName: 'Advanced Writing Skills 7', courseName: 'Advanced English Grammar', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Nguyễn Phương Hằng', lessonName: 'IELTS Writing Task 5', courseName: 'IELTS Preparation', isGraded: false, typeSubmission: "writing" },
  { studentName: 'Vũ Hồng Quân', lessonName: 'Business English Email Writing 6', courseName: 'English for Business', isGraded: true, typeSubmission: "writing" },
  { studentName: 'Phạm Thu Hương', lessonName: 'Conversational English Skills 2', courseName: 'Conversational English', isGraded: false, typeSubmission: "speaking" },
  { studentName: 'Hoàng Gia Bảo', lessonName: 'Travel English Dialogue 3', courseName: 'English for Travel', isGraded: true, typeSubmission: "speaking" },
];



const SubmissionList = ({ type }) => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (event) => setFilter(event.target.value);

  const typeSubmission = submissions.filter((submission) => {
    if (type === null) {
      return true
    }
    else {
      return submission.typeSubmission === type
    }
  })



  const filteredSubmissions = typeSubmission.filter((submission) => {
    if (filter === 'graded') return submission.isGraded;
    if (filter === 'ungraded') return !submission.isGraded;
    return true;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const currentSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className='submission-list-container'>
      <SideBar />
      <div className="submission-list">
        {/* Tiêu đề và filter */}
        <div className="header-submission-list">
          <h2>Danh sách bài làm</h2>
          <select className="filter-dropdown" value={filter} onChange={handleFilterChange}>
            <option value="all">Tất cả</option>
            <option value="graded">Đã chấm</option>
            <option value="ungraded">Chưa chấm</option>
          </select>
        </div>

        {/* Danh sách bài làm */}
        <div className="items-grid">
          {currentSubmissions.map((submission, index) => (
            <ItemSubmission submission={submission} index={index} />
          ))}
        </div>

        {/* Nút chuyển trang */}
        <div className="pagination">
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Trang trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
            Trang sau
          </button>
        </div>
      </div>
    </div>


  );
};

export default SubmissionList;
