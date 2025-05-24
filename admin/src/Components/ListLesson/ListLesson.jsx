import { useEffect, useState } from "react";
import './ListLesson.css'
import { Link, useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";

const ListLesson = () => {

    const [listLesson, setListLesson] = useState([]);
    const { id_course } = useParams();
    const navigate = useNavigate();

    const handleCreateLecture = async () => {
        window.alert("Bạn có muốn tạo Lecture?");
        const idLesson = await authAxios.post('/lecture/create-lecture', {idCourse: id_course});
        console.log(idLesson.data);
        navigate(`/dashboard/manage-video-lesson/${idLesson.data.lessonId}`)
    };

    const handleCreateQuiz = async() => {
        window.alert("Bạn có muốn tạo Quiz?");
        const idLesson = await authAxios.post('/quiz/create-quiz', {idCourse: id_course});
        console.log(idLesson.data);
        navigate(`/dashboard/manage-quiz/${idLesson.data.lessonId}`)
    };

    const deleteLesson = async (idLesson) => {
    const response = await authAxios.post('/lesson/delete-lesson', {idLesson: idLesson});
    if(response.data.status){
      setListLesson(listLesson.filter((lesson) => lesson.id_lesson !== idLesson))
      alert('Đã xóa bài học thành công');
    } else {
      alert('Xóa không thành công');
    }
  }

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
                    {listLesson.map((lesson, index) => (
                        <div key={lesson.id_lesson} className="lesson-item">
                            <span className="icon-name-lesson">
                                {lesson.type_lesson === "video" ? (
                                    <i className="fas fa-video"></i> // Icon video
                                ) : (
                                    <i className="fas fa-pen"></i> // Icon test
                                )}
                                &nbsp;&nbsp;{index + 1}. {lesson.lesson_name}
                            </span>
                            <div className="lesson-icons">
                                <Link to={lesson.type_lesson === 'quiz' ?
                                    `/dashboard/manage-quiz/${lesson.id_lesson}`
                                    : `/dashboard/manage-video-lesson/${lesson.id_lesson}`}>
                                    <i className="fas fa-edit edit-icon"></i>
                                </Link>
                                <i className="fas fa-trash delete-icon"
                                    onClick={() => deleteLesson(lesson.id_lesson)}
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
