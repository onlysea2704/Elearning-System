import React from "react";
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <>
            <div className="pagination">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                    Trang trước
                </button>
                <span className="pagination-text">
                    Trang {currentPage} / {totalPages}
                </span>
                <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                    Trang sau
                </button>
            </div>
        </>
    )
}
export default Pagination;