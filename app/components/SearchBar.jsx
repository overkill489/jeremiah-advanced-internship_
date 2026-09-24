"use client";

import { FaSearch, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({ isOpen, setIsOpen }) {
  return (
    <div className="bg-white border-b border-[#e1e7ea] h-20 z-30">
      <div className="relative flex items-center justify-between py-8 max-w-5xl mx-auto h-full px-4">
        
        <div />

        <div className="flex items-center gap-3 max-w-80 w-full">
          <div className="flex items-center w-full">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for books"
                className="h-10 w-full py-4 px-3 outline-0 bg-[#f1f4f6] text-[#042330] border-2 border-[#e1e7ea] rounded-lg"
              />

              <div className="flex items-center absolute top-0 h-full right-2 justify-end border-l-2 border-[#e1e7ea] pl-2">
                <FaSearch />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center text-[#032b41] lg:hidden"
          >
            {isOpen ? (
              <IoMdClose className="w-7 h-7" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

        </div>
      </div>
    </div>
  );
}