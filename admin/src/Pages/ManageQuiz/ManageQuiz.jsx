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
    const [quizName, setQuizName] = useState(""); // Quản lý tên của quiz
    const [quiz, setQuiz] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("")

    const [quizCategory, setQuizCategory] = useState("reading"); // Quản lý thể loại của quiz

    const [audioKey, setAudioKey] = useState(0); // Tạo key mới để ép React render lại thẻ <audio>

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
        console.log(question)
    };

    const handleDelete = (id) => {
        console.log(`Xóa câu hỏi ${id}`);
    };

    const handleCreateQuestion = () => {
        console.log("Tạo câu hỏi mới");
    };

    const handleSave = () => {
    };

    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedAudio, setUploadedAudio] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const audioUrl = URL.createObjectURL(file);
            setUploadedAudio(audioUrl);
        }
        setAudioKey((prevKey) => prevKey + 1); // Tăng giá trị key để ép cập nhật lại
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
                                value={quiz.name_quiz}
                                onChange={(e) => setQuizName(e.target.value)}
                                placeholder="Nhập tên quiz"
                            />
                        </div>

                        {/* Chọn thể loại Quiz */}
                        <div className="input-group">
                            <label htmlFor="quiz-category">Thể loại</label>
                            <select
                                id="quiz-category"
                                value={quizCategory}
                                onChange={(e) => setQuizCategory(e.target.value)}
                            >
                                <option value="reading">Reading</option>
                                <option value="listening">Listening</option>
                                <option value="writing">Writing</option>
                                <option value="speaking">Speaking</option>
                            </select>
                        </div>
                    </div>

                    {/* Danh sách câu hỏi */}
                    <ListQuestion
                        setCurrentQuestion={setCurrentQuestion}
                        idQuiz={quiz?.id_quiz}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleCreateQuestion={handleCreateQuestion}
                    />
                </div>

                {/* Right Panel */}
                <div className="right-panel-manage-quiz">
                    <CreateQuestion
                        currentQuestion={currentQuestion}
                        audioKey={audioKey}
                        handleImageUpload={handleImageUpload}
                        uploadedImage={uploadedImage}
                        handleAudioUpload={handleAudioUpload}
                        uploadedAudio={uploadedAudio}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageQuiz;
