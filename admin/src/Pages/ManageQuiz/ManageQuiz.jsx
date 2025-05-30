import { useState, useEffect } from "react";
import "./ManageQuiz.css";
import ListQuestion from "../../Components/ListQuestion/ListQuestion";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import { authAxios } from "../../services/axios-instance";
import Popup from "../../Components/Popup/Popup";

const ManageQuiz = () => {

    const { id_lesson } = useParams();
    const [quiz, setQuiz] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [imageQuestion, setImageQuestion] = useState(null);
    const [imageUrlQuestion, setImageUrlQuestion] = useState(null);
    const [audioQuestion, setAudioQuestion] = useState(null);
    const [audioUrlQuestion, setAudioUrlQuestion] = useState(null);
    const [audioKey, setAudioKey] = useState(0); // Tạo key mới để ép React render lại thẻ <audio>
    const [loading, setLoading] = useState(false)
    const [statusPopup, setStatusPopup] = useState("")
    const [listQuestions, setListQuestions] = useState([])

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
        if (!currentQuestion.question) {
            alert('Hãy điền đủ câu hỏi')
            return
        }
        setStatusPopup('update-question');
        setLoading(true)
        const formData = new FormData();
        formData.append('question', JSON.stringify(currentQuestion));
        if (imageQuestion) {
            formData.append('image', imageQuestion);
        }
        if (audioQuestion) {
            formData.append('audio', audioQuestion);
        }
        const updatedQuestions = listQuestions.map(q =>
            q.id_question === currentQuestion.id_question ? { ...currentQuestion } : q
        );
        setListQuestions(updatedQuestions);

        await authAxios.post('/question/update-question', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
        // alert(result.data.status)
    };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioUrlQuestion(URL.createObjectURL(file));
            setAudioQuestion(file)
        }
        setAudioKey((prevKey) => prevKey + 1); // Tăng giá trị key để ép cập nhật lại
    };

    const createAIQuestion = async () => {
        setStatusPopup('create-question-by-ai')
        setLoading(true)
        if (currentQuestion.type_question === 'listening') {
            const formData = new FormData();
            formData.append('typeQuestion', JSON.stringify(currentQuestion.type_question));
            if (audioQuestion) {
                formData.append('audio', audioQuestion);
            }
            const question = await authAxios.post('/question/create-question-by-ai', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(question.data)
            setCurrentQuestion(prev => ({ ...prev, ...question.data }))
        } else {
            console.log(currentQuestion.type_question)
            const question = await authAxios.post('/question/create-question-by-ai', { typeQuestion: currentQuestion.type_question })
            console.log(question.data)
            setCurrentQuestion(prev => ({ ...prev, ...question.data }))
        }
        setLoading(false)
    }

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const quiz = await authAxios.post('/quiz/get-quiz-by-id-lesson', { idLesson: id_lesson });
            setQuiz(quiz.data);
            if (quiz.data.id_quiz) {
                const questions = await authAxios.post('/question/get-all-question-by-quiz-id', { idQuiz: quiz.data.id_quiz });
                setListQuestions(questions.data);
                console.log(questions.data);
                setCurrentQuestion(questions.data[0]);
                setImageUrlQuestion(questions.data[0]?.link_image);
                setAudioUrlQuestion(questions.data[0]?.link_mp3);
            }
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

    const handleCreateQuestion = async () => {
        const newQuestion = await authAxios.post('/question/create-question', { idQuiz: quiz.id_quiz });
        setCurrentQuestion({ ...newQuestion.data, type_question: 'reading' });
        setListQuestions([...listQuestions, newQuestion.data]);
        console.log(newQuestion.data);
        setImageUrlQuestion('');
        setAudioUrlQuestion('');
    };

    const handleSubmitUpdateQuiz = async (e) => {
        e.preventDefault();
        await authAxios.post('/quiz/update-quiz', { quiz: quiz });
        alert('Cập nhật thông tin quiz thành công');
    };

    const deleteQuestion = async (idQuestion) => {
        const response = await authAxios.post('/question/delete-question', { idQuestion: idQuestion });
        if (response.data.status) {
            setListQuestions(listQuestions.filter((question) => question.id_question !== idQuestion))
            alert('Đã xóa câu thành công');
        } else {
            alert('Xóa không thành công');
        }
    }

    return (
        <div>
            <div className="page-manage-quiz">
                <SideBar />
                <div className="container-manage-quiz">

                    {/* Left Panel */}
                    <div className="left-panel-manage-quiz">
                        <HeaderBackButton
                            button="Quay lại khóa học"
                            title="Quản lý Quiz"
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
                            questions={listQuestions}
                            handleEdit={handleEdit}
                            deleteQuestion={deleteQuestion}
                        />
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
                            handleChangeQuestion={handleChangeQuestion}
                            handleImageUpload={handleImageUpload}
                            imageUrlQuestion={imageUrlQuestion}
                            audioUrlQuestion={audioUrlQuestion}
                            handleAudioUpload={handleAudioUpload}
                            handleSubmitUpdateQuestion={handleSubmitUpdateQuestion}
                            createAIQuestion={createAIQuestion}
                        />
                    </div>
                </div>
            </div>
            {loading ? <Popup type={statusPopup} /> : <></>}
        </div>
    );
};

export default ManageQuiz;
