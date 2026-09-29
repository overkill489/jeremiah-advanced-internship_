"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            search,
          )}`,
        );

        const data = await response.json();

        setBooks(data);
      } catch (error) {
        console.error("Error searching for books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    // Cancel the previous timer whenever search changes
    return () => clearTimeout(timeout);
  }, [search]);

  const closeSearch = () => {
    setSearch("");
    setBooks([]);
  };

  return (
    <div className="relative bg-white border-b border-[#e1e7ea] h-20 z-30">
      <div className="relative flex items-center justify-between py-8 max-w-5xl mx-auto h-full px-4">
        <div />

        <div className="flex items-center gap-3 max-w-80 w-full">
          <div className="relative w-full">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for books"
                className="h-10 w-full py-4 pl-3 pr-12 outline-0 bg-[#f1f4f6] text-[#042330] border-2 border-[#e1e7ea] rounded-lg"
              />

              <div className="flex items-center absolute top-0 h-full right-2 justify-end border-l-2 border-[#e1e7ea] pl-2">
                <FaSearch />
              </div>
            </div>

            {/* Search Results */}
            {search && (
              <div className="absolute top-12 right-0 w-full bg-white border border-[#e1e7ea] rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {/* Loading */}
                {loading && (
                  <div className="p-4 text-sm text-[#6b757b]">
                    Searching...
                  </div>
                )}

                {/* Results */}
                {!loading &&
                  books.map((book) => (
                    <Link
                      href={`/book/${book.id}`}
                      key={book.id}
                      onClick={closeSearch}
                      className="flex gap-3 p-3 border-b border-[#e1e7ea] last:border-b-0 hover:bg-[#f1f4f6] transition-colors"
                    >
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        className="w-12 h-16 object-cover"
                      />

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#032b41]">
                          {book.title}
                        </div>

                        <div className="text-xs text-[#6b757b] mt-1">
                          {book.author}
                        </div>
                      </div>
                    </Link>
                  ))}

                {/* No results */}
                {!loading && books.length === 0 && (
                  <div className="p-4 text-sm text-[#6b757b]">
                    No books found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Sidebar Button */}
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