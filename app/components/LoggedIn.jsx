import SearchBar from "@/app/components/SearBar";
import SideBar from "@/app/components/SideBar";
import React from "react";

const LoggedIn = () => {
  return (
    <section id="for-you">
      <div className="relative flex flex-col ml-48 w-[calc(100%-200px)] transition duration-300">
        <SearchBar />
        <div className="fixed top-0 left-0 w-full h-full bg-[#3a4649] transition-opacity duration-400 ease-in-out z-10 opacity-0 pointer-none:" />
        <SideBar />
      </div>
    </section>
  );
};

export default LoggedIn;
