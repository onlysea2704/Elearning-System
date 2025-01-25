import React, { useContext, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import './PieDiagram.css';
import { Link, useParams } from 'react-router-dom';
import { StudentContext } from '../../Context/Context';

const PieDiagram = () => {
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
            {/* Biểu đồ tròn tiến độ */}
            <div className="progress-pie-chart" onMouseMove={handleMouseMove}>
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
                                                top: tooltipPos.y - 130,
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
        </>
    );
};

export default PieDiagram;