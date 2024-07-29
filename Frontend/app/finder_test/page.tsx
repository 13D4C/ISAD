"use client";
import React, { useState } from 'react';
import Searchbar from './components/Searchbar';

interface Subject {
    subjectKey: string;
    subjectName: string;
}

const SearchBarTest: React.FC = () => {
    const [results, setResults] = useState<Subject[]>([]);

    const handleSearch = async (query: string) => {
        try {
            const res = await fetch(`http://localhost:8888/api/search?q=${query}`); // backend req
            console.log(res);
            const data: Subject[] = await res.json();
            setResults(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a73e8'
    };
  
    return (
        <div style={containerStyle}>
            <h1>หารายวิชาที่อยากลงไอสัส</h1>
             <Searchbar onSearch={handleSearch}/>
            
        </div>
    );
};

export default SearchBarTest;
