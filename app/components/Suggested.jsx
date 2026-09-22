"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { CiClock2, CiStar } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SuggestedBooks({ suggestedBooks }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    watchDrag: true,
  });

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full bg-white shadow-md
                   flex items-center justify-center
                   text-[#032b41]"
      >
        <FaChevronLeft />
      </button>
      <div
        ref={emblaRef}
        className="overflow-hidden mx-12"
      >
        <div className="flex">
          {suggestedBooks.map((book) => (
            <Link
              href={`/book/${book.id}`}
              key={book.id}
              className="relative flex-[0_0_208px] px-8 py-3 rounded-sm"
            >
              <figure className="w-44 h-44">
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="w-full h-full"
                />
              </figure>

              <div className="text-base font-bold text-[#032b41] mb-2">
                {book.title}
              </div>

              <div className="text-sm text-[#6b757b] font-light mb-2">
                {book.author}
              </div>

              <div className="text-sm text-[#394547] mb-2">
                {book.subTitle}
              </div>

              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
                  <CiClock2 className="w-4 h-4" />
                  <div>03:24</div>
                </div>

                <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
                  <CiStar className="w-4 h-4" />
                  <div>{book.averageRating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full bg-white shadow-md
                   flex items-center justify-center
                   text-[#032b41]"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}