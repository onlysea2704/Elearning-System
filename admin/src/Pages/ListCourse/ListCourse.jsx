import React, { useState } from 'react';
import './ListCourse.css';
import SideBar from '../../Components/SideBar/SideBar';
import ItemCardCourse from '../../Components/ItemCardCourse/ItemCardCourse';
import tb1 from '../../Assets/Image/thumbnail1.jpg';
import tb2 from '../../Assets/Image/thumbnail2.jpg';
import tb3 from '../../Assets/Image/thumbnail3.jpg';
import tb4 from '../../Assets/Image/thumbnail4.jpg';
import tb5 from '../../Assets/Image/thumbnail5.jpg';
import tb6 from '../../Assets/Image/thumbnail6.jpg';
import PopupAddCourse from '../../Components/PopupAddCourse/PopupAddCourse';
import Pagination from '../../Components/Pagination/Pagination';

const initialCourses = [
  { courseId: "C001", courseName: "Mastering English Grammar", category: "Writing", lessonCount: 20, instructor: "John Smith", imageUrl: tb1 },
  { courseId: "C002", courseName: "Effective Communication Skills", category: "Speaking", lessonCount: 15, instructor: "Sarah Johnson", imageUrl: tb2 },
  { courseId: "C003", courseName: "Academic Reading Strategies", category: "Reading", lessonCount: 18, instructor: "Emily Brown", imageUrl: tb3 },
  { courseId: "C004", courseName: "Listening Comprehension for TOEFL", category: "Listening", lessonCount: 25, instructor: "Michael Williams", imageUrl: tb4 },
  { courseId: "C005", courseName: "Creative Writing Workshop", category: "Writing", lessonCount: 12, instructor: "Anna Davis", imageUrl: tb5 },
  { courseId: "C006", courseName: "Public Speaking Mastery", category: "Speaking", lessonCount: 10, instructor: "David Wilson", imageUrl: tb6 }
];

const ListCourse = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseId: '',
    courseName: '',
    category: '',
    lessonCount: '',
    instructor: '',
    imageUrl: null
  });

  const itemsPerPage = 6;
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewCourse(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCourse = () => {
    if (newCourse.courseId && newCourse.courseName && newCourse.category && newCourse.lessonCount && newCourse.instructor) {
      setCourses(prev => [newCourse, ...prev]);
      setShowPopup(false);
      setNewCourse({ courseId: '', courseName: '', category: '', lessonCount: '', instructor: '', imageUrl: null });
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className='submission-list-container'>
      <SideBar />

      <div className="submission-list">
        {/* Tiêu đề, thanh search, nút tạo khóa học */}
        <div className="header-submission-list">
          <h2>Danh sách khóa học</h2>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button className="create-course-btn" onClick={() => setShowPopup(true)}>
            <i className="fas fa-plus"></i>
            Tạo khóa học
          </button>
        </div>

        {/* Danh sách khóa học */}
        <div className="items-grid">
          {currentCourses.map((course, index) => (
            <ItemCardCourse course={course} key={index} />
          ))}
        </div>

        {/* Nút chuyển trang */}
        <Pagination currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        {/* Popup thêm khóa học */}
        {showPopup && (
          <PopupAddCourse newCourse={newCourse}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleSaveCourse={handleSaveCourse}
            setShowPopup={setShowPopup}
          />
        )}
      </div>
    </div>
  );
};

export default ListCourse;
