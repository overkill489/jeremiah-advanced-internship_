import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="bg-white border-b-[#e1e7ea] h-20 z-1">
      <div className="relative flex items-center justify-between py-8 max-w-5xl mx-auto h-full">
        <div />
        <div className="flex items-center gap-6 max-w-80 w-full">
          <div className="flex items-center w-full">
            <div className="relative w-full gap-2">
              <input
                type="search"
                placeholder="Search for books"
                className="h-10 w-full py-4 outline-0 bg-[#f1f4f6] text-[#042330] border-2 border-[#e1e7ea] rounded-lg"
              />
              <div className="flex items-center absolute top-0 h-full right-2 justify-end border-l-2 border-[#e1e7ea] pl-2">
                <FaSearch className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
