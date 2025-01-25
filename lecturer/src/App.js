import './App.css';
// import { Route, Router, Routes } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './Page/AdminLogin/AdminLogin';
import AccountManage from './Page/AccountManage/AccountManage';
import ListProgress from './Page/ListProgress/ListProgress';
import DetailProgress from './Page/DetailProgress/DetailProgress';
import SubmissionList from './Page/ListSubmission/ListSubmission';
import DetailSubmission from './Page/DetailSubmission/DetailSubmission';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard/account-manage" element={<AccountManage />} />
        <Route path="/dashboard/list-progress" element={<ListProgress />} />
        <Route path="/dashboard/detail-progress" element={<DetailProgress />} />
        <Route path="/dashboard/list-submission" element={<SubmissionList type={null}/>} />
        <Route path="/dashboard/list-submission/speaking" element={<SubmissionList type={'speaking'}/>} />
        <Route path="/dashboard/list-submission/writing" element={<SubmissionList type={'writing'}/>} />
        <Route path="/dashboard/detail-submission/:id_submission" element={<DetailSubmission />} />

      </Routes>
    </Router>
  );
}

export default App;
