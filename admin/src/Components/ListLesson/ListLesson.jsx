import { useEffect, useState } from "react";
import './ListLesson.css'
import { Link, useParams, useNavigate } from "react-router-dom";
import { publicAxios } from "../../services/axios-instance";

const ListLesson = () => {

    const navigate = useNavigate();

    const [listLesson, setListLesson] = useState([]);
    const { id_course } = useParams();

    const handleDeleteLesson = (lessonId) => {
        // console.log(`Xóa bài học ${lessonId}`);
    };

    const handleCreateLecture = () => {
        window.alert("Bạn có muốn tạo Lecture?");
        // navigate('/dashboard/manage-video-lesson');
    };

    const handleCreateQuiz = () => {
        window.alert("Bạn có muốn tạo Quiz?");
        // navigate('/dashboard/manage-quiz/0');
    };

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const response2 = await publicAxios.post('/lesson/get-list-lessons-by-id-course', { idCourse: id_course });
            setListLesson(response2.data);
            console.log(response2.data);
        };
        fetchDetailCourses();
    }, [id_course]);

    return (
        <>
            <div className="lesson-list">
                <h3>Danh Sách Lesson</h3>
                <div className="lessons">
                    {listLesson.map((lesson) => (
                        <div key={lesson.id_lesson} className="lesson-item">
                            <span className="icon-name-lesson">
                                {lesson.type_lesson === "video" ? (
                                    <i className="fas fa-video"></i> // Icon video
                                ) : (
                                    <i className="fas fa-pen"></i> // Icon test
                                )}
                                &nbsp;&nbsp;{lesson.order_lesson}. {lesson.lesson_name}
                            </span>
                            <div className="lesson-icons">
                                <Link to={lesson.type_lesson === 'quiz' ?
                                    `/dashboard/manage-quiz/${lesson.id_lesson}`
                                    : `/dashboard/manage-video-lesson/${lesson.id_lecture_quiz}`}>
                                    <i className="fas fa-edit edit-icon"></i>
                                </Link>
                                <i className="fas fa-trash delete-icon"
                                    onClick={() => handleDeleteLesson(0 + 1)}
                                ></i>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lesson-actions">
                    <button className="btn-create" onClick={handleCreateLecture}>Tạo Lecture</button>
                    <button className="btn-create" onClick={handleCreateQuiz}>Tạo Quiz</button>
                </div>
            </div>
        </>
    );
}

export default ListLesson;
