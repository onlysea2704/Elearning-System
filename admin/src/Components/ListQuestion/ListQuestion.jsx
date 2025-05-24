import React, { useEffect, useState } from "react";
import './ListQuestion.css';
import { authAxios } from "../../services/axios-instance";

const ListQuestion = ({
    handleEdit,
    deleteQuestion,
    questions,
}) => {

    return (
        <>
            <h3 className="title-list-question">Danh sách câu hỏi</h3>
            <div className="question-list">
                {questions.map((question) => (
                    <div className="question" key={question.id}>
                        <span>Question: {question.id_question}</span>
                        <div className="icons">
                            <i className="fas fa-edit" onClick={() => handleEdit(question)}></i>
                            <i className="fas fa-trash" onClick={() => deleteQuestion(question.id_question)}></i>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button className="create-button" onClick={handleCreateQuestion}>Tạo câu hỏi</button> */}
        </>
    );
}

export default ListQuestion;