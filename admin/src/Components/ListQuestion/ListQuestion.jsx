import React, { useEffect, useState } from "react";
import './ListQuestion.css';
import { useParams } from "react-router-dom";
import { authAxios } from "../../services/axios-instance";

const ListQuestion = ({ idQuiz, setCurrentQuestion, handleEdit, handleDelete, handleCreateQuestion }) => {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        const fetchDetailCourses = async () => {
            // vì component này được load cùng với ManageQuiz, mà ManageQuiz có thể sẽ chưa lấy được quizid
            // => idQuiz truyền vào có thể bị lỗi => cần phải check trước
            if (idQuiz) {
                const questions = await authAxios.post('/question/get-all-question-by-quiz-id', { idQuiz: idQuiz });
                setQuestions(questions.data);
                console.log(questions.data);
                setCurrentQuestion(questions.data[0])
            }
        };
        fetchDetailCourses();
    }, [idQuiz]);

    return (
        <>
            <h3 className="title-list-question">Danh sách câu hỏi</h3>
            <div className="question-list">
                {questions.map((question) => (
                    <div className="question" key={question.id}>
                        <span>Question: {question.id_question}</span>
                        <div className="icons">
                            <i className="fas fa-edit" onClick={() => handleEdit(question)}></i>
                            <i className="fas fa-trash" onClick={() => handleDelete(question)}></i>
                        </div>
                    </div>
                ))}
            </div>
            <button className="create-button" onClick={handleCreateQuestion}>Tạo câu hỏi</button>
        </>
    );
}

export default ListQuestion;