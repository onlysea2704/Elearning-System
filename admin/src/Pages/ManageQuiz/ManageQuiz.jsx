import React, { useState, useEffect } from "react";
import "./ManageQuiz.css";
import ListQuestion from "../../Components/ListQuestion/ListQuestion";
import SideBar from "../../Components/SideBar/SideBar";
// import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import { useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import { authAxios } from "../../services/axios-instance";

const ManageQuiz = () => {

    const { id_lesson } = useParams();
    const [quiz, setQuiz] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [imageQuestion, setImageQuestion] = useState(null);
    const [imageUrlQuestion, setImageUrlQuestion] = useState(null);
    const [audioQuestion, setAudioQuestion] = useState(null);
    const [audioUrlQuestion, setAudioUrlQuestion] = useState(null);
    const [audioKey, setAudioKey] = useState(0); // Tạo key mới để ép React render lại thẻ <audio>

    const handleChangeQuiz = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const handleChangeQuestion = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion({ ...currentQuestion, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageQuestion(file);
            setImageUrlQuestion(URL.createObjectURL(file));
        }
    };

    const handleSubmitUpdateQuestion = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('question', JSON.stringify(currentQuestion));
            if (imageQuestion) {
                formData.append('image', imageQuestion);
            }
            if (audioQuestion) {
                formData.append('audio', audioQuestion);
            }

            await authAxios.post('/course/update-question', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioUrlQuestion(URL.createObjectURL(file));
            setAudioQuestion(file)
        }
        setAudioKey((prevKey) => prevKey + 1); // Tăng giá trị key để ép cập nhật lại
    };

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const quiz = await authAxios.post('/lesson/get-quiz-by-id-lesson', { idLesson: id_lesson });
            setQuiz(quiz.data);
            console.log(quiz.data);
        };
        fetchDetailCourses();
    }, [id_lesson]);

    const handleEdit = (question) => {
        setCurrentQuestion(question)
        setImageUrlQuestion(question.link_image);
        setAudioUrlQuestion(question.link_mp3);
        setAudioKey((prevKey) => prevKey + 1); // cần phải update audiokey để react render lại 
        console.log(question)
    };

    const handleDelete = (id) => {
        console.log(`Xóa câu hỏi ${id}`);
    };

    const handleCreateQuestion = () => {
        console.log("Tạo câu hỏi mới");
    };

    const handleSubmitUpdateQuiz = async (e) => {
        e.preventDefault();
        await authAxios.post('/course/update-quiz', { quiz: quiz });
        alert('Cập nhật thông tin quiz thành công');
    };

    return (
        <div className="page-manage-quiz">
            <SideBar />
            <div className="container-manage-quiz">

                {/* Left Panel */}
                <div className="left-panel-manage-quiz">
                    <HeaderBackButton
                        button="Quay lại khóa học"
                        title="Quản lý Quiz"
                        dest="/dashboard/manage-course"
                    />
                    {/* Thông tin Quiz */}
                    <div className="info">
                        <div className="info-row">
                            <p>ID Quiz: {quiz.id_quiz}</p>
                            <p>Score: {quiz.score}</p>
                        </div>

                        {/* Nhập tên Quiz */}
                        <div className="input-group">
                            <label htmlFor="quiz-name">Tên Quiz</label>
                            <input
                                type="text"
                                id="quiz-name"
                                name="name_quiz"
                                value={quiz.name_quiz}
                                onChange={handleChangeQuiz}
                                placeholder="Nhập tên quiz"
                            />
                        </div>

                        {/* Viết mô tả Quiz */}
                        <div className="input-group">
                            <label htmlFor="quiz-description">Mô tả</label>
                            <textarea
                                id="quiz-description"
                                name="description"
                                value={quiz.description}
                                onChange={handleChangeQuiz}
                                placeholder="Nhập mô tả quiz"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Danh sách câu hỏi */}
                    <ListQuestion
                        setCurrentQuestion={setCurrentQuestion}
                        idQuiz={quiz?.id_quiz}
                        setImageUrlQuestion={setImageUrlQuestion}
                        setAudioUrlQuestion={setAudioUrlQuestion}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                    {/* <button className="create-button" onClick={handleCreateQuestion}>Tạo câu hỏi</button> */}
                    <div className="button-group">
                        <button className="create-button" onClick={handleSubmitUpdateQuiz}>Lưu Quiz</button>
                        <button className="create-button" onClick={handleCreateQuestion}>Tạo câu hỏi</button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="right-panel-manage-quiz">
                    <CreateQuestion
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        audioKey={audioKey}
                        // setAudioKey={setAudioKey}
                        handleChangeQuestion={handleChangeQuestion}
                        handleImageUpload={handleImageUpload}
                        imageUrlQuestion={imageUrlQuestion}
                        audioUrlQuestion={audioUrlQuestion}
                        handleAudioUpload={handleAudioUpload}
                        handleSubmitUpdateQuestion={handleSubmitUpdateQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageQuiz;
