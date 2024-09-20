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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Blue Bar */}
        <div className="bg-blue-700 h-10 w-full fixed top-0 left-0 z-10"></div>

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

            {/* Navigation Links */}
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 p-4 md:p-0 rounded-lg border border-gray-100 md:border-0 dark:border-gray-700">
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
            <div className="flex space-x-3 md:space-x-0">
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
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
          <div className="w-full max-w-screen-xl mx-auto p-4">
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
