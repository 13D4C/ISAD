// pages/Home.tsx
import React, { useEffect, useState } from 'react';
import CourseDetail from '../components/CourseDetail';

const Home: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Simulate fetching course data from API
        const response = await fetch('/api/course'); // Replace this with your actual API endpoint
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>No course data available</div>;
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
      <div className="w-full max-w-7xl">
        <CourseDetail course={course} />
      </div>
    </div>
  );
};

export default Home;
