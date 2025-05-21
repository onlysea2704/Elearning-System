import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Activity, Users, BookOpen, Book, FileText } from 'lucide-react';
import './Report.css';
import SideBar from '../../Components/SideBar/SideBar';
import { authAxios } from '../../services/axios-instance';

const StatisticsDashboard = () => {

    const [cards, setCards] = useState([]);
    const [revenueByDay, setRevenueByDay] = useState([]);
    const [revenueByCourse, setRevenueByCourse] = useState([]);

    useEffect(() => {
        const fetchAllLecturers = async () => {
            const data = await authAxios.get('/report/get-report');
            const cards = data.data.cards;
            const stats = [
                { title: 'Doanh thu', value: `${cards.revenue / 1000000}tr`, icon: Activity, color: '#3b82f6' },
                { title: 'Giao dịch', value: cards.transactions, icon: FileText, color: '#22c55e' },
                { title: 'Học viên', value: cards.students, icon: Users, color: '#a855f7' },
                { title: 'Khóa học', value: cards.courses, icon: Book, color: '#f97316' },
                { title: 'Bài học', value: cards.lessons, icon: BookOpen, color: '#ef4444' }
            ];
            setCards(stats);
            setRevenueByDay(data.data.revenueByDay);
            const revenueByCourse = data.data.revenueByCourse.map(item => ({
                id: item.id_course,
                name: item.name_course,
                revenue: Number(item.total_revenue)
            }));
            setRevenueByCourse(revenueByCourse);
            console.log(revenueByCourse);
        };
        fetchAllLecturers();
    }, []);

    return (
        <div className='page-report'>
            <SideBar />
            <div className="dashboard">
                <h1 className="dashboard-title">Báo Cáo Thống Kê</h1>

                <div className="stats-container">
                    {cards.map((stat, index) => (
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
                            <LineChart data={revenueByDay}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"
                                    tickFormatter={(dateStr) => {
                                        const parts = dateStr.split('-'); // ["2025","05","21"]
                                        return `${parts[2]}/${parts[1]}`; // "21/05"
                                    }} />
                                <YAxis tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}tr`} />
                                <Tooltip 
                                    formatter={(value) => [`${Number(value).toLocaleString()} VND`, 'Doanh thu']}
                                />
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
                            <BarChart data={revenueByCourse} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="id" 
                                type="category" 
                                width={80} 
                                tickFormatter={(value) => `ID Course${value}`}/>
                                <Tooltip
                                    formatter={(value) => [`${Number(value).toLocaleString()} VND`, 'Doanh thu']}
                                    labelFormatter={(label) => {
                                        const course = revenueByCourse.find(item => item.id === Number(label));
                                        return course ? `${course.name}` : '';
                                    }}
                                />
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