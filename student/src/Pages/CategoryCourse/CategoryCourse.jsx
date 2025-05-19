import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import "./CategoryCourse.css";
import Footer from "../../Components/Footer/Footer";
import { authAxios, publicAxios } from "../../services/axios-instance";

const filters = [
    "Listening",
    "Writing",
    "Speaking",
    "Reading",
    "Listening + Reading",
    "Speaking + Writing",
    "All Skill",
];

const CategoryCourse = ({ isPurchase }) => {

    const [allCourse, setAllCourse] = useState([])

    useEffect(() => {
        const fetchAllCourses = async () => {
            const token = sessionStorage.getItem('authToken');
            let response = []
            if (token) {
                response = await authAxios(isPurchase ? '/course/my-course' : '/course/all-course')
                setAllCourse(response.data);
            } else if (!isPurchase) {
                response = await publicAxios('/course/public-api-get-all-course')
                setAllCourse(response.data);
            } else {
                setAllCourse([]);
            }
        };

        fetchAllCourses(); // Gọi API khi component được mount
    }, [isPurchase]); // gọi khi isPurchase bị thay đổi giá trị

    const [selectedFilter, setSelectedFilter] = useState("All Skill");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        setCurrentPage(1); // Reset về trang đầu
    };

    const filteredCourses = allCourse.filter((course) =>
        (selectedFilter === "All Skill" && course.id_course !== 0) ? true : course.type_course === selectedFilter
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
                <h1 className="page-title">{isPurchase ? "Khóa Học Của Tôi" : "Khám Phá Các Khóa Học Mới !!!"}</h1>
                <div className="page-content">
                    <div className="filter-section">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`filter-button ${selectedFilter === filter ? "active" : ""
                                    }`}
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="courses-container">
                        {displayedCourses.map((course) => (
                            <Card key={course.id} course={course} type={isPurchase ? "Bắt Đầu Vào Học" : "Khám Phá Nội Dung"} />
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

export default CategoryCourse;
