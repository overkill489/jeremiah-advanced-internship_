"use client";

import { CiBookmark, CiSettings } from "react-icons/ci";
import { FaHome, FaPenAlt } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function SideBar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}
      <div
        className={`
          bg-[#f7faf9]
          w-[200px]
          min-w-[200px]
          fixed
          top-0
          left-0
          h-dvh
          z-50
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <a href="/" className="flex items-center justify-center h-14 pt-4 max-w-40 mx-auto">
          <img
            className="w-full h-10"
            src="/assets/logo.png"
            alt="Logo"
          />
        </a>

        <div className="flex flex-col justify-between h-[calc(100vh-60px)] pb-5 overflow-y-auto">

          {/* Main Navigation */}
          <div className="flex flex-col mt-10">

            <a
              href="/for-you"
              onClick={() => setIsOpen(false)}
              className={`flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef] border-l-4 ${
                pathname === "/for-you"
                  ? "border-green-400"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-center mr-2">
                <FaHome className="w-6 h-6" />
              </div>

              <div>For you</div>
            </a>

            <a
              href="/my-library"
              onClick={() => setIsOpen(false)}
              className={`flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef] border-l-4 ${
                pathname === "/my-library"
                  ? "border-green-400"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-center mr-2">
                <CiBookmark className="w-6 h-6" />
              </div>

              <div>My Library</div>
            </a>

            <a
              href=""
              className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]"
            >
              <div className="flex items-center justify-center mr-2">
                <FaPenAlt className="w-6 h-6" />
              </div>

              <div>Highlights</div>
            </a>

            <a
              href=""
              className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]"
            >
              <div className="flex items-center justify-center mr-2">
                <IoBookSharp className="w-6 h-6" />
              </div>

              <div>Explore</div>
            </a>

          </div>
          <div>

            <a
              href="/settings"
              onClick={() => setIsOpen(false)}
              className={`flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef] border-l-4 ${
                pathname === "/settings"
                  ? "border-green-400"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-center mr-2">
                <CiSettings className="w-6 h-6" />
              </div>

              <div>Settings</div>
            </a>

            <a
              href=""
              className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]"
            >
              <div className="flex items-center justify-center mr-2">
                <HiOutlineQuestionMarkCircle className="w-6 h-6" />
              </div>

              <div>For you</div>
            </a>

            <button className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef]">
              <div className="flex items-center justify-center mr-2">
                <IoIosLogOut className="w-6 h-6" />
              </div>

              <div>Logout</div>
            </button>

          </div>

        </div>
      </div>
    </>
  );
}