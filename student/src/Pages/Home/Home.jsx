// File: LandingPage.jsx
import React, { useContext } from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import Features from "../../Components/Features/Features";
import Card from "../../Components/Card/Card"
import Footer from "../../Components/Footer/Footer";
import { StudentContext } from "../../Context/Context";

const Home = () => {
  const { courses } = useContext(StudentContext);

  // Sắp xếp mảng theo giá trị x giảm dần
  courses.sort((a, b) => b.number_student - a.number_student);

  // Lấy 4 phần tử có giá trị x lớn nhất
  let popularCourses = courses.slice(0, 4);
  return (
    <>
      <div className="landing-container">
        <Hero />
        <Features />
        {/* Popular Courses Section */}
        <section id="courses" className="popular-courses">
          <h2>Khóa học phổ biến</h2>
          <div className="courses-grid">
            {popularCourses.map((course) => (
              <Card key={course.id} course={course} type="KHÁM PHÁ NGAY" />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
