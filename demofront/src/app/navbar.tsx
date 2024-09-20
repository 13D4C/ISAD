"use client"; // Mark this as a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
    const [linkText, setLinkText] = useState('เข้าสู่ระบบ');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLinkText("ออกจากระบบ");
        }
    }, []);
    const handleNavigation = (path: string) => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push(path); // Navigate to search if the token exists
        } else {
            router.push("/"); // Redirect to login if the token does not exist
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLinkText("เข้าสู่ระบบ");
        router.push("/");
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-2 start-0 border-b border-gray-200 dark:border-gray-600">
            {/* Box NavBar */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* logo IT kmitl*/}
                <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">

                </Link>
                {/* Middle of Nav Bar */}
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <button
                            onClick={() => handleNavigation('/search')}
                            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                        >
                            ค้นหาวิชาเรียน
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/timetable')}
                            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                        >
                            จัดตารางเรียน
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                        >
                            เกี่ยวกับเรา
                        </button>
                    </li>
                </ul>
                {/* Right Side (Login) */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <button
                                onClick={linkText === "ออกจากระบบ" ? handleLogout : () => router.push("http://localhost:3000/")}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                            >
                                {linkText}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
