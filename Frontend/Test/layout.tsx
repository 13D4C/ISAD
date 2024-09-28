'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Blue Bar */}
        <div className="bg-blue-700 h-10 w-full fixed top-0 left-0 z-20"></div>

        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-2 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            {/* Logo */}
            <Link href="#" className="flex items-center space-x-3">
              <Image
                src="https://cmms.kmitl.ac.th/uploads/uploads/9b5d8ffe-78d9-463b-9286-f66f27e0d91b-1686793377632.png"
                className="h-12"
                width={50}
                height={50}
                alt="IT kmitl logo"
              />
            </Link>

            {/* Hamburger button for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center p-2 text-gray-900 dark:text-gray-400 hover:text-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <ul
              className={`${
                menuOpen ? "block" : "hidden"
              } md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 p-4 md:p-0 rounded-lg border border-gray-100 md:border-0 dark:border-gray-700`}
            >
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition-colors"
                >
                  ค้นหาวิชาเรียน
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition-colors"
                >
                  จัดตารางเรียน
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition-colors"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
            </ul>

            {/* Login Link */}
            <div className="hidden md:block">
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 bottom-0">
          <div className="mx-auto p-4 w-screen">
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
              &copy; 2025 IT next. School of Information Technology KMITL.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
