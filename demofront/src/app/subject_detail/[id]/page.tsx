"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SubjectData } from '../../components/interface';
import CourseDetail from '@/app/components/CourseDetail';
import axios from 'axios';

const Detail: React.FC = () => {
    const { id } = useParams();
    const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchSubjectData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8888/api/fetchSubject/${id}`);
                    let subjectsFromDB = response.data as SubjectData[];
                    if (typeof subjectsFromDB === 'object' && !Array.isArray(subjectsFromDB)) {
                        subjectsFromDB = [subjectsFromDB]; // ถ้าไม่ใช่แปลงเป็นอาร์เรย์
                    }
                    const subjectsWithSections = await Promise.all(subjectsFromDB.map(async (subject) => {
                        const sections = await fetchSections(subject.subject_id);
                        return { ...subject, sections };
                    }));
                    setSubjectData(subjectsWithSections);
                } catch (error) {
                    console.error('Error fetching subject data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        const fetchSections = async (subject_id: String) => {
            try {
                const response = await axios.get(`http://localhost:8888/api/fetchSections/${subject_id}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching sections for subject_id ${subject_id}:`, error);
                return []; // ในกรณีที่เกิด error, ส่งค่าเป็น array ว่างกลับ
            }
        }

        fetchSubjectData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!subjectData) return <div>No data found</div>;

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
            <div className="w-full max-w-7xl">
                {subjectData.length > 0 ? (
                    <CourseDetail course={subjectData[0]} />
                ) : (
                    <div>No data found</div>
                )}
            </div>
        </div>
    );
};

export default Detail;
