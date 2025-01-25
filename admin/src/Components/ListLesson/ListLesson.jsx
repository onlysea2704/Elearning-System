import React from "react";
import './ListLesson.css'
import { Link, useNavigate } from "react-router-dom";

const ListLesson = ({ handleCreateLesson, handleCreateQuiz, handleEditLesson, handleDeleteLesson }) => {
    

    return (
        <>
            <div className="lesson-list">
                <h3>Danh Sách Lesson</h3>
                <div className="lessons">
                    {[...Array(20).keys()].map((_, index) => (
                        <div key={index} className="lesson-item">
                            Lesson {index + 1}
                            <div className="lesson-icons">
                                <Link to={index % 2 === 0 ? `/dashboard/manage-quiz/${index+1}` : '/dashboard/manage-video-lesson'}>
                                    <i className="fas fa-edit edit-icon" onClick={() => handleEditLesson(index + 1)}>
                                    </i>
                                </Link>
                                <i
                                    className="fas fa-trash delete-icon"
                                    onClick={() => handleDeleteLesson(index + 1)}
                                ></i>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lesson-actions">
                    <button className="btn-create" onClick={handleCreateLesson}>Tạo Lesson</button>
                    <button className="btn-create" onClick={handleCreateQuiz}>Tạo Quiz</button>
                </div>
            </div>
        </>
    );
}

export default ListLesson;
