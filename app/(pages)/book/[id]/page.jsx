import { CiBookmark, CiClock2 } from "react-icons/ci";
import { FaMicrophone, FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiBookOpenText } from "react-icons/pi";
import BookmarkButton from "./BookmarkButton";

export default async function BookPage({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );

  const book = await response.json();

  console.log(book);

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8">
          {/* Book information */}
          <div className="flex-1">
            <h1 className="text-2xl text-[#032b41] font-semibold mb-3">
              {book.title}
            </h1>

            <div className="text-[#032b41] mb-3 font-semibold">
              {book.author}
            </div>

            <div className="text-[#032b41] mb-4">{book.subTitle}</div>

            <div className="border-t-2 border-[#e1e7ea] border-b-2 px-4 mb-6">
              <div className="grid grid-cols-2 gap-y-3 py-4">
                {/* Rating */}
                <div className="flex items-center text-[#032b41] font-medium text-sm">
                  <FaRegStar className="w-6 h-6 mr-1" />
                  <span>{book.averageRating}</span>
                  <span className="ml-1">({book.totalRating} ratings)</span>
                </div>

                {/* Duration */}
                <div className="flex items-center text-[#032b41] font-medium text-sm">
                  <CiClock2 className="w-6 h-6 mr-1" />
                  <span>03:24</span>
                </div>

                {/* Audio & Text */}
                <div className="flex items-center text-[#032b41] font-medium text-sm">
                  <FaMicrophone className="w-6 h-6 mr-1" />
                  <span>Audio & Text</span>
                </div>

                {/* Key Ideas */}
                <div className="flex items-center text-[#032b41] font-medium text-sm">
                  <HiOutlineLightBulb className="w-6 h-6 mr-1" />
                  <span>{book.keyIdeas} Key Ideas</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <button className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-300 hover:opacity-70 ">
                <PiBookOpenText className="w-1/7 h-1/2" />
                <span>Read</span>
              </button>
              <button className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-300 hover:opacity-70 ">
                <FaMicrophone />
                <span>Listen</span>
              </button>
            </div>
            <BookmarkButton book={book} bookId={id} />
            <div className="text-lg text-[#032b41] mb-4 font-semibold">
              What's it about
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-[#f1f6f4] p-4 h-12 flex items-center cursor-not-allowed text-[#032b41] font-medium rounded-sm transition-colors duration-300 hover:bg-[#afb1b0]">
                {book.tags[0]}
              </div>
              <div className="bg-[#f1f6f4] p-4 h-12 flex items-center cursor-not-allowed text-[#032b41] font-medium rounded-sm transition-colors duration-300 hover:bg-[#afb1b0]">
                {book.tags[1]}
              </div>
            </div>
            <div className="text-[#032b41] mb-4 leading-6">
              {book.bookDescription}
            </div>
            <h2 className="text-lg text-[#032b41] mb-4 font-semibold">
              About the author
            </h2>
            <div className="text-[#032b41] mb-4 leading-6">
              {book.authorDescription}
            </div>
          </div>

          {/* Book cover */}
          <div className="w-[200px]">
            <img src={book.imageLink} alt={book.title} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
