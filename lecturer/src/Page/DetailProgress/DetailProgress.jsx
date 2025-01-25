import React, { useContext, useState } from 'react';
import './DetailProgress.css';
import { StudentContext } from '../../Context/Context';
import Footer from '../../Components/Footer/Footer';
import PieDiagram from '../../Components/PieDiagram/PieDiagram';
import ItemProgress from '../../Components/ItemProgress/ItemProgress';
import av from '../../Assets/Image/BG.png'
import { Link } from 'react-router-dom';

const DetailProgress = () => {
    const { courses, lessons, progress } = useContext(StudentContext);
    // const { id_course } = useParams();
    const id_course = 1;

    const student = { id: 1, name: '1 Nguyen Van A', course: 'ReactJS Basics', progress: '80%', avatar: av }

    const course = courses.find(course => course.id_course === Number(id_course));
    const lessons_course = lessons.filter(lesson => lesson.id_course === Number(id_course));
    console.log(123456789)
    const lessons_status = lessons_course.map((lesson) => {
        const lessonProgress = progress.find(
            (p) => p.id_lesson === lesson.id_lesson && p.id_student === Number(1)
        );
        return {
            ...lesson,
            status: lessonProgress ? lessonProgress.status : "not-started", // Default status
        };
    });

    // Progress data
    const progressData = [
        { name: 'Đã Học', value: 70, color: '#2067b2' },
        { name: 'Chưa Học', value: 30, color: 'gray' }
    ];

    return (
        <>
            {/* <div className="learning-progress-dashboard" onMouseMove={handleMouseMove}> */}
            <div className="learning-progress-dashboard">
                <div className="left-panel">
                    <div className='container-button-back'>
                        <Link to='/dashboard/list-progress' className='button-back'> Quay lại danh sách</Link>
                    </div>
                    {/*Thẻ thông tin học sinh*/}
                    <div className="student-item-full" key={student.id}>
                        <img src={student.avatar} alt={student.name} className="student-avatar" />
                        <div className="student-info">
                            <h3 className="student-name">{student.name}</h3>
                            <p className="student-course">{student.course}</p>
                            <p className="student-progress">Tiến độ: {student.progress}</p>
                        </div>
                    </div>
                    {/* <h2 className="course-name">{course.name_course}</h2> */}

                    {/* Biểu đồ tròn tiến độ */}
                    <PieDiagram />
                </div>

                <div className="vertical-divider"></div>

                <div className="right-panel">
                    <h2 className="lessons-title">Danh Sách Bài Đã Học</h2>
                    <div className="lessons-list-container">
                        <ul className="lessons-list-progress">
                            {lessons_status.map(lesson => (
                                <li key={lesson.id} className={`lesson-item-progress ${lesson.status === 'completed' ? 'completed' : ''}`} >
                                    {lesson.name_lesson}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailProgress;