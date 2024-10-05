import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITNextReg",
  description: "IT Timetable Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Blue Bar */}
        <div className="bg-blue-700 h-10 w-full fixed top-0 left-0 z-10"></div>
        {/* End Blue Bar */}

        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-2 start-0 border-b border-gray-200 dark:border-gray-600">
          {/* Box NavBar */}
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* logo IT kmitl*/}
            <Link
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse">
              <Image
                src="https://cmms.kmitl.ac.th/uploads/uploads/9b5d8ffe-78d9-463b-9286-f66f27e0d91b-1686793377632.png"
                className="h-12"
                width={50}
                height={50}
                alt="IT kmitl logo"/>
            </Link>
            {/* Middle of Nav Bar */}
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                  aria-current="page">
                  ค้นหาวิชาเรียน
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors">
                  จัดตารางเรียน
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
            </ul>
            {/* Right Side (Login) */}
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors">
                    เข้าสู่ระบบ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navigation Bar */}
        
        {children}

        {/* Footer of page */}
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              &copy; 2025 IT next. School of Information Technology KMITL.
            </span>
          </div>
        </footer>
        {/* End Footer of page */}
      </body>
    </html>
  );
}
