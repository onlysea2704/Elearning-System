import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AccountManage from './Pages/AccountManage/AccountManage';
import ListLecturer from './Pages/ListLecturer/ListLecturer';
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit';
import ListCourse from './Pages/ListCourse/ListCourse';
import ManageCourse from './Pages/ManageCourse/ManageCourse';
import ManagementVideoLesson from './Pages/ManageVideoLesson/ManageVideoLesson';
import ManageQuiz from './Pages/ManageQuiz/ManageQuiz';
import StatisticsDashboard from './Pages/Report/Report';
import EmailScheduler from './Pages/Schedule/EmailScheduler';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/dashboard/account-manage' element={<AccountManage />} />
        <Route path='/dashboard/list-teacher' element={<ListLecturer />} />
        <Route path='/dashboard/manage-teacher/:id_lecturer' element={<ProfileEdit />} />
        <Route path='/dashboard/list-course' element={<ListCourse />} />
        <Route path='/dashboard/manage-course/:id_course' element={<ManageCourse />} />
        <Route path='/dashboard/manage-video-lesson/:id_lesson' element={<ManagementVideoLesson />} />
        <Route path='/dashboard/manage-quiz/:id_lesson' element={<ManageQuiz />} />
        <Route path='/dashboard/schedule' element={<EmailScheduler />} />
        <Route path='/dashboard/report' element={<StatisticsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
