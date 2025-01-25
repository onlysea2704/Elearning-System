import React, { useState, useEffect } from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Cập nhật activeSection dựa trên URL hiện tại
    const path = location.pathname;
    if (path.includes('/dashboard/account-manage')) {
      setActiveSection('account');
    } else if (path.includes('/dashboard/list-teacher') || path.includes('/dashboard/manage-teacher')) {
      setActiveSection('teacher');
    } else if (path.includes('/dashboard/list-course') || path.includes('/dashboard/manage-course') || path.includes('/dashboard/manage-video-lesson') || path.includes('/dashboard/manage-quiz')) {
      setActiveSection('course');
    } else if (path.includes('/dashboard/report')) {
      setActiveSection('report');
    }
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Dashboard</h1>
      </div>
      <ul>
        <li className={activeSection === 'account' ? 'active' : ''}>
          <Link to='/dashboard/account-manage'>
            <i className="fas fa-user icon"></i>
            Quản lý tài khoản
          </Link>
        </li>
        <li className={activeSection === 'teacher' ? 'active' : ''}>
          <Link to='/dashboard/list-teacher'>
            <i className="fas fa-chalkboard-teacher icon"></i>
            Quản lý giảng viên
          </Link>
        </li>
        <li className={activeSection === 'course' ? 'active' : ''}>
          <Link to='/dashboard/list-course'>
            <i className="fas fa-book icon"></i>
            Quản lý khóa học
          </Link>
        </li>
        <li className={activeSection === 'report' ? 'active' : ''}>
          <Link to='/dashboard/report'>
            <i className="fas fa-chart-bar icon"></i>
            Báo cáo thống kê
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
