"use client";

import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

import RecommendedBooks from "@/app/components/RecommendedBooks";
import SuggestedBooks from "@/app/components/Suggested";

export default function ForYou() {
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Selected Book
        const selectedResponse = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
        );

        const selectedData = await selectedResponse.json();
        setSelectedBook(selectedData[0]);

        // Recommended Books
        const recommendedResponse = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
        );

        const recommendedData = await recommendedResponse.json();
        setRecommendedBooks(recommendedData);

        // Suggested Books
        const suggestedResponse = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
        );

        const suggestedData = await suggestedResponse.json();
        setSuggestedBooks(suggestedData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto py-6">
      <div className="px-4 sm:px-6 lg:px-10 w-full">
        <div>
          <div className="text-xl font-bold text-[#032b41] pb-4">
            Selected just for you
          </div>
          {loading ? (
            <div className="flex flex-col md:flex-row md:justify-between w-full lg:w-2/3 bg-[#fbefd6] rounded-md p-4 sm:p-6 mb-6 gap-5 md:gap-6 animate-pulse">
              {/* Subtitle */}
              <div className="w-2/5">
                <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-11/12 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>

              {/* Divider */}
              <div className="w-0.5 bg-[#bac8ce]" />

              <div className="flex gap-4 w-7/12">
                {/* Book cover */}
                <div className="h-32 w-32 min-w-32 bg-gray-300 rounded"></div>

                <div className="w-full">
                  {/* Title */}
                  <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

                  {/* Author */}
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-5"></div>

                  {/* Audio */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <a
              href=""
              className="flex flex-col md:flex-row md:justify-between w-full lg:w-2/3 bg-[#fbefd6] rounded-md p-4 sm:p-6 mb-6 gap-5 md:gap-6"
            >
              <div className="text-[#032b41]  w-full md:w-2/5">
                {selectedBook?.subTitle}
              </div>

              <div className="w-full h-0.5 md:w-0.5 md:h-auto bg-[#bac8ce]" />

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-7/12">
                <figure className="h-32 w-32 min-w-32 mx-auto sm:mx-0">
                  <img
                    src={selectedBook?.imageLink}
                    alt=""
                    className="w-full h-full"
                  />
                </figure>

                <div className="w-full">
                  <div className="font-semibold text-[#032b41] mb-2">
                    {selectedBook?.title}
                  </div>

                  <div className="text-sm text-[#394547] mb-4">
                    {selectedBook?.author}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center w-10 min-w-10 h-10">
                      <FaPlayCircle className="w-full h-full flex justify-center items-center p-1" />
                    </div>

                    <div className="text-sm font-medium text-[#032b41]">
                      3 mins 23 sec
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )}
          <div>
            <div className="text-xl font-bold text-[#032b41] mb-4">
              Recommended for you
            </div>
            <div className="font-light text-[#394547] mb-4">
              We think you'll like these
            </div>
            <div className="mb-8">
              {loading ? (
                <div className="flex gap-4 overflow-hidden animate-pulse">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex-[0_0_208px] px-4 py-3">
                      {/* Cover */}
                      <div className="w-44 h-44 bg-gray-300 rounded mb-3"></div>

                      {/* Title */}
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>

                      {/* Author */}
                      <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>

                      {/* Subtitle */}
                      <div className="h-3 bg-gray-300 rounded w-full mb-3"></div>

                      {/* Rating / Time */}
                      <div className="flex gap-3">
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-10"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <RecommendedBooks recommendedBooks={recommendedBooks} />
              )}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#032b41] mb-4">
              Suggested Books
            </div>
            <div className="font-light text-[#394547] mb-4">
              Browse Suggested books
            </div>
            <div className="mb-8">
              {loading ? (
                <div className="flex gap-4 overflow-hidden animate-pulse">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex-[0_0_208px] px-4 py-3">
                      <div className="w-44 h-44 bg-gray-300 rounded mb-3"></div>

                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>

                      <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>

                      <div className="h-3 bg-gray-300 rounded w-full mb-3"></div>

                      <div className="flex gap-3">
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-10"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <SuggestedBooks suggestedBooks={suggestedBooks} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
