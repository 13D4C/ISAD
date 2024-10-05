// pages/Home.tsx
"use client";
import React, { useEffect, useState } from 'react';
import SubjectDetail from '../../static/components/CourseDetail';
import { SubjectData, Section } from '@/app/components/interface';
import axios from 'axios';

const Home: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [course, setCourse] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Simulate fetching course data from API
        const response = await axios.get('http://localhost:8888/api/fetchSubject'); // Replace this with your actual API endpoint
        const data = response.data;
        console.log(params.id);
        // Find the course matching the ID
        const fetchedCourse = data.find((course: any) => String(course.subject_id) === String(params.id));
        setCourse(fetchedCourse);
        console.log(course);
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
        <SubjectDetail course={course} />
      </div>
    </div>
  );
};

export default Home;