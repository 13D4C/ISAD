"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SubjectData } from '../../components/interface';
import CourseDetail from '@/app/components/CourseDetail';
import axios from 'axios';

const Detail: React.FC = () => {
    const { id } = useParams();
    const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjectData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8888/api/fetchSelectedSubject/${id}`);
                    setSubjectData(response.data);
                } catch (error) {
                    console.error('Error fetching subject data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSubjectData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!subjectData) return <div>No data found</div>;

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
            <div className="w-full max-w-7xl">
                <CourseDetail course={subjectData} />
            </div>
        </div>
    );
};

export default Detail;
