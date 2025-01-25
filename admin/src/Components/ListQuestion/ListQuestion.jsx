import React from "react";
import './ListQuestion.css';
import { useParams } from "react-router-dom";

const ListQuestion = ({ handleEdit, handleDelete, handleCreateQuestion }) => {
    const { id_quiz } = useParams();
    const questions = Array.from({ length: id_quiz }, (_, i) => ({
        id: i + 1,
        text: `Câu hỏi  ${i + 1}`
    }));
    console.log(questions)
    return (
        <>
            <h3 className="title-list-question">Danh sách câu hỏi</h3>
            <div className="question-list">
                {questions.map((question) => (
                    <div className="question" key={question.id}>
                        <span>{question.text}</span>
                        <div className="icons">
                            <i className="fas fa-edit" onClick={() => handleEdit(question.id)}></i>
                            <i className="fas fa-trash" onClick={() => handleDelete(question.id)}></i>
                        </div>
                    </div>
                ))}
            </div>
            <button className="create-button" onClick={handleCreateQuestion}>Tạo câu hỏi</button>
        </>
    );
}

export default ListQuestion;