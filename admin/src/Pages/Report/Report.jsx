import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Activity, Users, BookOpen, Book, FileText } from 'lucide-react';
import './Report.css';
import SideBar from '../../Components/SideBar/SideBar';

const StatisticsDashboard = () => {
    const revenueData = [
        { date: '01/12', revenue: 1200 },
        { date: '02/12', revenue: 1900 },
        { date: '03/12', revenue: 1500 },
        { date: '04/12', revenue: 2100 },
        { date: '05/12', revenue: 2400 },
        { date: '06/12', revenue: 1200 },
        { date: '07/12', revenue: 1900 },
        { date: '08/12', revenue: 1500 },
    ];

    const courseRevenueData = [
        { course: 'Lập trình Web', revenue: 15000 },
        { course: 'JavaScript', revenue: 12000 },
        { course: 'React Native', revenue: 9000 },
        { course: 'Python', revenue: 7500 },
        { course: 'NodeJS', revenue: 6500 },
    ];

    const stats = [
        { title: 'Doanh thu', value: '45.5M', icon: Activity, color: '#3b82f6' },
        { title: 'Giao dịch', value: '156', icon: FileText, color: '#22c55e' },
        { title: 'Học viên', value: '1.2K', icon: Users, color: '#a855f7' },
        { title: 'Khóa học', value: '24', icon: Book, color: '#f97316' },
        { title: 'Bài học', value: '386', icon: BookOpen, color: '#ef4444' }
    ];

    return (
        <div className='page-report'>
            <SideBar />
            <div className="dashboard">
                <h1 className="dashboard-title">Báo Cáo Thống Kê</h1>

                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-content">
                                <stat.icon className="stat-icon" style={{ color: stat.color }} />
                                <h2 className="stat-title">{stat.title}</h2>
                                <p className="stat-value">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="charts-container">
                    <div className="chart-card">
                        <h3 className="chart-title">Doanh Thu Theo Ngày</h3>
                        <ResponsiveContainer width="100%" height={355}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h3 className="chart-title">Doanh Thu Theo Khóa Học</h3>
                        <ResponsiveContainer width="100%" height={355}>
                            <BarChart
                                data={courseRevenueData}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="course" type="category" width={100} />
                                <Tooltip />
                                <Bar
                                    dataKey="revenue"
                                    fill="#3b82f6"
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsDashboard;