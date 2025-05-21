import React, { useState, useEffect } from 'react';
import './ListLecturer.css';
import SideBar from '../../Components/SideBar/SideBar'
import ItemCardLecturer from '../../Components/ItemCardLecturer/ItemCardLecturer';
import av from '../../Assets/Image/BG.png'
import av1 from '../../Assets/Image/BG1.png'
import av2 from '../../Assets/Image/BG2.png'
import av3 from '../../Assets/Image/BG3.png'
import Pagination from '../../Components/Pagination/Pagination';
import { authAxios, publicAxios } from '../../services/axios-instance';

const lecturers = [
  { id: '10001', name: 'Nguyễn Văn Hải Đăng', email: 'haidung@gmail.com', avatar: av },
  { id: '10002', name: 'Trần Thị Bích Ngọc', email: 'bichngoc@gmail.com', avatar: av1 },
  { id: '10003', name: 'Lê Hoàng Nam', email: 'hoangnam@gmail.com', avatar: av2 },
  { id: '10004', name: 'Phạm Thu Hương', email: 'thuhuong@gmail.com', avatar: av3 },
  { id: '10005', name: 'Hoàng Gia Bảo', email: 'giabao@gmail.com', avatar: av },
  { id: '10006', name: 'Nguyễn Khánh Linh', email: 'khanhlinh@gmail.com', avatar: av1 },
  { id: '10007', name: 'Vũ Hồng Quân', email: 'hongquan@gmail.com', avatar: av2 },
  { id: '10008', name: 'Lê Thanh Mai', email: 'thanhmai@gmail.com', avatar: av3 },
  { id: '10009', name: 'Đặng Minh Châu', email: 'minhchau@gmail.com', avatar: av },
  { id: '10010', name: 'Nguyễn Thảo Vy', email: 'thaovy@gmail.com', avatar: av1 },
  { id: '10011', name: 'Phan Bảo Long', email: 'baolong@gmail.com', avatar: av2 },
  { id: '10012', name: 'Lý Minh Tú', email: 'minhtu@gmail.com', avatar: av3 },
];


const ListLecturer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const fetchAllLecturers = async () => {
      const lecturers = await publicAxios.get('/lesson/get-all-lecturer');
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
