"use client";

import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function ForYou() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    )
      .then((res) => res.json())
      .then((data) => {
        setBook(data[0]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto py-6">
      <div className="px-10 w-full">
        <div>
          <div className="text-xl font-bold text-[#032b41] pb-4">
            Selected just for you
          </div>
          <a
            href=""
            className="flex justify-between w-2/3 bg-[#fbefd6] rounded-md p-6 mb-6 gap-6"
          >
            <div className="text-[#032b41] w-2/5">
              {loading ? "loading..." : book?.subTitle}
            </div>
            <div className="w-0.5 bg-[#bac8ce]" />
            <div className="flex gap-4 w-7/12">
              <figure className="h-32 w-32 min-w-32">
                <img src={book?.imageLink} alt="" className="w-full h-full" />
              </figure>
              <div className="w-full">
                <div className="font-semibold text-[#032b41] mb-2">
                  {book?.title}
                </div>
                <div className="text-sm text-[#394547] mb-4">
                  {book?.author}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center w-10 min-w-10 h-10">
                    <FaPlayCircle className="w-full h-full flex justify-center items-center p-1" />
                  </div>
                  <div className="text-sm font-medium text-[#032b41]">3 mins 23 sec </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
