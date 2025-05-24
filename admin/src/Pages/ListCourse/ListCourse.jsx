import { useState, useEffect } from 'react';
import './ListCourse.css';
import SideBar from '../../Components/SideBar/SideBar';
import ItemCardCourse from '../../Components/ItemCardCourse/ItemCardCourse';
import Pagination from '../../Components/Pagination/Pagination';
import { authAxios } from '../../services/axios-instance';

// const initialCourses = [
//   { courseId: "C001", courseName: "Mastering English Grammar", category: "Writing", lessonCount: 20, instructor: "John Smith", imageUrl: tb1 },
//   { courseId: "C002", courseName: "Effective Communication Skills", category: "Speaking", lessonCount: 15, instructor: "Sarah Johnson", imageUrl: tb2 },
//   { courseId: "C003", courseName: "Academic Reading Strategies", category: "Reading", lessonCount: 18, instructor: "Emily Brown", imageUrl: tb3 },
//   { courseId: "C004", courseName: "Listening Comprehension for TOEFL", category: "Listening", lessonCount: 25, instructor: "Michael Williams", imageUrl: tb4 },
//   { courseId: "C005", courseName: "Creative Writing Workshop", category: "Writing", lessonCount: 12, instructor: "Anna Davis", imageUrl: tb5 },
//   { courseId: "C006", courseName: "Public Speaking Mastery", category: "Speaking", lessonCount: 10, instructor: "David Wilson", imageUrl: tb6 }
// ];

const ListCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [idNewCourse, setIdNewCourse] = useState();

  useEffect(() => {
    const fetchAllCourses = async () => {
      const response = await authAxios('/course/public-api-get-all-course');
      console.log(response.data);
      setAllCourses(response.data);
    };
    fetchAllCourses();
  }, []);

  const CreateNewCourse = async () => {
    const response = await authAxios('/course/create-')
  }

  const itemsPerPage = 6;
  const filteredCourses = allCourses.filter(course =>
    course.name_course.toLowerCase().includes(searchQuery.toLowerCase())
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
          <button className="create-course-btn" onClick={CreateNewCourse}>
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
      </div>
    </div>
  );
};

export default ListCourse;
