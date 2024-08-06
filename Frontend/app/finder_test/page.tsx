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
             <Searchbar onSearch={handleSearch}/>
            <div className="mt-4 w-full max-w-lg bg-white p-4 rounded shadow-md">
                {results.length > 0 ? (
                    results.map((subject, index) => (
                        <div key={index} className="border-b py-2">
                            <p className="font-bold text-black">{subject.subjectKey}</p>
                            <p className="font-bold text-black">{subject.subjectName}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBarTest;
