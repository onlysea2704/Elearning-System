import React, { useContext, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import './Progress.css';
import { Link, useParams } from 'react-router-dom';
import { StudentContext } from '../../Context/Context';
import Footer from '../../Components/Footer/Footer';

const Progress = () => {
    const { courses, lessons, progress } = useContext(StudentContext);
    const { id_course } = useParams();
    const course = courses.find(course => course.id_course === Number(id_course));
    const lessons_course = lessons.filter(lesson => lesson.id_course === Number(id_course));

    const lessons_status = lessons_course.map((lesson) => {
        const lessonProgress = progress.find(
            (p) => p.id_lesson === lesson.id_lesson && p.id_student === Number(1)
        );
        return {
            ...lesson,
            status: lessonProgress ? lessonProgress.status : "not-started", // Default status
        };
    });

    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {

        if (e) {
            setTooltipPos({ x: e.clientX, y: e.clientY });
        }
    };
    // Progress data
    const progressData = [
        { name: 'Đã Học', value: 70, color: '#2067b2' },
        { name: 'Chưa Học', value: 30, color: 'gray' }
    ];

    return (
        <>
            <div className="learning-progress-dashboard" onMouseMove={handleMouseMove}>
                <div className="left-panel">
                    <h2 className="course-name">{course.name_course}</h2>

                    {/* Biểu đồ tròn tiến độ */}
                    <div className="progress-pie-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={progressData}
                                    cx="50%" // Căn giữa
                                    cy="50%" // Căn giữa
                                    outerRadius="80%" // Bán kính ngoài
                                    dataKey="value" // Sử dụng thuộc tính 'value' làm giá trị biểu đồ
                                    labelLine={false} // Tắt đường nối với nhãn
                                    activeIndex={-1} // Tắt ô vuông khi click
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Hiển thị phần trăm
                                >
                                    {progressData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend
                                    layout="horizontal" // Đặt Legend theo chiều ngang
                                    verticalAlign="bottom" // Đặt Legend ở phía trên biểu đồ
                                    align="center" // Căn giữa
                                    iconType="circle"
                                    payload={progressData.map((item) => ({
                                        value: `${item.name}: ${item.value}%`,
                                        type: 'circle',
                                        color: item.color
                                    }))}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }} // Để không có ảnh hưởng khi hover
                                    content={({ payload }) => {
                                        if (payload && payload.length) {
                                            return (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: tooltipPos.x - 120,
                                                        top: tooltipPos.y - 160,
                                                        width: "120px",
                                                        backgroundColor: '#fff',
                                                        border: "2px solid #4caf50",
                                                        padding: '0 5px',
                                                        borderRadius: '5px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                        pointerEvents: 'none', // Đảm bảo không cản trở tương tác chuột
                                                    }}
                                                >
                                                    <p>{`${payload[0].name}: ${(payload[0].value)}%`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="vertical-divider"></div>

                <div className="right-panel">
                    <h2 className="lessons-title">Danh Sách Bài Học</h2>
                    <div className="lessons-list-container">
                        <ul className="lessons-list-progress">
                            {lessons_status.map(lesson => (
                                <li key={lesson.id} className={`lesson-item-progress ${lesson.status === 'completed' ? 'completed' : ''}`} >
                                    <Link to={`/lessons/${lesson.id}`} className="lesson-link">
                                        {lesson.name_lesson}
                                    </Link>
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

export default Progress;