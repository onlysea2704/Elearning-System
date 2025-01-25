import React, { useState, useEffect } from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Cập nhật activeSection dựa trên URL hiện tại
    const path = location.pathname;
    if (path.includes('/account-manage')) {
      setActiveSection('account');
    } else if (path.includes('/list-progress')) {
      setActiveSection('progress');
    } else if (path.includes('/list-submission')) {
      if (path.includes('/speaking')) {
        setActiveSection('grading-speaking');
      } else if (path.includes('/writing')) {
        setActiveSection('grading-writing');
      } else {
        setActiveSection('grading');
      }
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
        <li className={activeSection === 'progress' ? 'active' : ''}>
          <Link to='/dashboard/list-progress'>
            <i className="fas fa-chart-line icon"></i>
            Xem tiến trình học
          </Link>
        </li>
        <li className={activeSection === 'grading' ? 'active' : ''}>
          <Link to='/dashboard/list-submission'>
            <i className="fas fa-edit icon"></i>
            Chấm điểm
          </Link>
        </li>
        {(activeSection === 'grading' || activeSection === 'grading-speaking' || activeSection === 'grading-writing') && (
          <ul className="grading-options">
            <li className={activeSection === 'grading-speaking' ? 'active' : ''}>
              <Link to='/dashboard/list-submission/speaking'>
                <i className="fas fa-book-open icon"></i>
                Chấm bài nói
              </Link>
            </li>
            <li className={activeSection === 'grading-writing' ? 'active' : ''}>
              <Link to='/dashboard/list-submission/writing'>
                <i className="fas fa-pen icon"></i>
                Chấm bài viết
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default SideBar;