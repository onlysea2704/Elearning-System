// File: LandingPage.jsx
import { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import Features from "../../Components/Features/Features";
import Card from "../../Components/Card/Card"
import Footer from "../../Components/Footer/Footer";
import { publicAxios } from "../../services/axios-instance";

const Home = () => {

  const [popularCourses, setPopularCourses] = useState([])
  useEffect(() => {
    const loadPopularCourses = async () => {
      const courses = await publicAxios('/course/get-popular-courses')
      setPopularCourses(courses.data);
      console.log(courses.data)
    }
    loadPopularCourses();
  }, []);

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
