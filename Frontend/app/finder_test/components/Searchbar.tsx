import React, { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

interface Suggestion {
    subjectKey: string;
    subjectName: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchSuggestions = async (query: string) => {
        if (query.length > 0) {
            try {
                const res = await fetch(`http://localhost:8888/api/search?q=${query}`);
                const data: Suggestion[] = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error: any) {
                console.error('Error fetching suggestions:', error);
                setError(error.message);
                setShowSuggestions(false);
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: string) => { 
        setQuery(suggestion);
        onSearch(suggestion);
        setShowSuggestions(false);
    };

    const handleClickOutside = (event: MouseEvent) => { //เอาไว้กดข้างนอก
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    className="text-black rounded border-2 p-2 flex-grow"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="ค้นหารหัสวิชา / ชื่อวิชา"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2">
                    Search
                </button>
            </form>
            {showSuggestions && (
                <ul className="absolute text-black bg-white border rounded shadow-md mt-1 w-full z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion.subjectName)}
                        >
                            {suggestion.subjectName}
                        </li>
                    ))}
                </ul>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default SearchBar;
