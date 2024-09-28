import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import AuthProvider from "./AuthProvider";

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
        {/* Navigation Bar */}
        <Navbar/>
        <main className="pt-24">
          {children}
        </main>

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

