import { useState, useEffect } from 'react';
import './ListLecturer.css';
import SideBar from '../../Components/SideBar/SideBar'
import ItemCardLecturer from '../../Components/ItemCardLecturer/ItemCardLecturer';
import Pagination from '../../Components/Pagination/Pagination';
import { publicAxios } from '../../services/axios-instance';

const ListLecturer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const fetchAllLecturers = async () => {
      const lecturers = await publicAxios.post('/lecturer/public-api-get-all-lecturers');
      setLecturers(lecturers.data);
      console.log(lecturers.data);
    };
    fetchAllLecturers();
  }, []);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };
  const totalPages = Math.ceil(lecturers.length / itemsPerPage);

  const paginatedlecturers = lecturers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='student-progress-list-container'>
      <SideBar />
      <div className="student-list">
        <h2 className="title">Danh Sách Giảng Viên</h2>
        <div className="student-items">
          {paginatedlecturers.map((lecturer) => (
            <ItemCardLecturer lecturer={lecturer} />
          ))}
        </div>

        <Pagination currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

      </div>
    </div>

  );
};

export default ListLecturer;
