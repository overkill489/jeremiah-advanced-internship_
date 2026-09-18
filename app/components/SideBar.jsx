import { CiBookmark, CiSettings } from "react-icons/ci";
import { FaHome, FaPenAlt } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";

export default function SideBar() {
    return (
        <div className="bg-[#f7faf9] w-[200] mn-w-[200] fixed top-0 left-0 h-dvh z-50 transition duration-300">
            <div className="flex items-center justify-center h-14 pt-4 max-w-40 mx-auto">
                <img className="w-full h-10" src="/assets/logo.png" alt="Logo" />
            </div>
            <div className="flex flex-col justify-between h-[calc(100vh-60px)] pb-5 overflow-y-auto">
                <div className="flex flex-col  mt-10" >
                    <a href="/for-you" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <FaHome className="w-6 h-6"/>
                        </div>
                        <div className="text">For you</div>
                    </a>
                    <a href="/my-library" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <CiBookmark className="w-6 h-6"/>
                        </div>
                        <div className="text">My Library</div>
                    </a>
                    <a href="" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <FaPenAlt className="w-6 h-6"/>
                        </div>
                        <div className="text">Highlights</div>
                    </a>
                    <a href="" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <IoBookSharp className="w-6 h-6"/>
                        </div>
                        <div className="text">Explore</div>
                    </a>
                </div>
                <div className="">
                    <a href="/settings" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <CiSettings className="w-6 h-6"/>
                        </div>
                        <div className="text">Settings</div>
                    </a>
                    <a href="" className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-not-allowed transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <HiOutlineQuestionMarkCircle className="w-6 h-6"/>
                        </div>
                        <div className="text">For you</div>
                    </a>
                    <button className="flex items-center pl-3 w-full h-14 text-[#032b41] mb-2 cursor-pointer transition-colors duration-300 hover:bg-[#f0efef]">
                        <div className=""/>
                        <div className="flex items-center justify-center mr-2">
                            <IoIosLogOut className="w-6 h-6"/>
                        </div>
                        <div className="text">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    )
}