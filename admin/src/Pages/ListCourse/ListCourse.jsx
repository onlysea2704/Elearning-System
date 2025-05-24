import { useState, useEffect } from 'react';
import './ListCourse.css';
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from "react-router-dom";
import ItemCardCourse from '../../Components/ItemCardCourse/ItemCardCourse';
import Pagination from '../../Components/Pagination/Pagination';
import { authAxios } from '../../services/axios-instance';

const ListCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [idNewCourse, setIdNewCourse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCourses = async () => {
      const response = await authAxios('/course/public-api-get-all-course');
      console.log(response.data);
      setAllCourses(response.data);
    };
    fetchAllCourses();
  }, []);

  const CreateNewCourse = async () => {
    const response = await authAxios.post('/course/create-course');
    navigate(`/dashboard/manage-course/${response.data.id_course}`);
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
