import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";
import LoginForm from "./Pages/LoginForm/LoginForm";
import RegisterForm from "./Pages/RegisterForm/RegisterForm";
import CategoryCourse from "./Pages/CategoryCourse/CategoryCourse";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import Home from "./Pages/Home/Home";
import Lesson from "./Pages/Lesson/Lesson";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import ProfileEdit from "./Pages/ProfileEdit/ProfileEdit";
import Checkout from "./Pages/Checkout/Checkout";
import Progress from "./Pages/Progress/Progress";
// import AdminLogin from "./Pages/AdminLogin/AdminLogin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/admin-login" element={<AdminLogin/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/my-course" element={<CategoryCourse isPurchase={true}/>} />
        <Route path="/explore-course" element={<CategoryCourse isPurchase={false}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/coursedetail">
          <Route path=":id_course" element={<CourseDetail />} />
          <Route path=":id_course/lesson/:id_lesson" element={<Lesson />} />
        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/checkout/:id_course" element={<Checkout />} />
        <Route path="/progress/:id_course" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;
