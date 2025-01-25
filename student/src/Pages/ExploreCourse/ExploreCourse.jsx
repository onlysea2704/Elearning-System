import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import "./ExploreCourse.css";
import Footer from "../../Components/Footer/Footer";
import { StudentContext } from "../../Context/Context";

const filters = [
  "listening",
  "writing",
  "speaking",
  "reading",
  "listening + reading",
  "speaking + writing",
  "all skill",
];

const ExploreCourse = () => {

  const {courses,myCourses} = useContext(StudentContext);
  const availableCourses = courses.filter(course => 
    !myCourses.some(my => my.id_course === course.id_course && my.id_student === 1)
    // Lấy ra khóa học mà Student 1 chưa mua
  );

  const [selectedFilter, setSelectedFilter] = useState("all skill");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset về trang đầu
  };

  const filteredCourses = availableCourses.filter((course) =>
    (selectedFilter === "all skill" && course.id_course !== 0) ? true : course.type_course === selectedFilter
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="courses-page">
        <h1 className="page-title">Danh sách các khóa học</h1>
        <div className="page-content">
          <div className="filter-section">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-button ${
                  selectedFilter === filter ? "active" : ""
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="courses-container">
            {displayedCourses.map((course) => (
              <Card key={course.id} course={course} type="KHÁM PHÁ NGAY" />
            ))}
            {filteredCourses.length > itemsPerPage && (
              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                <button
                  className="pagination-button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreCourse;
