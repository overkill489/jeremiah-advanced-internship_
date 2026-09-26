"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/app/firebase";
import Link from "next/link";
import { CiClock2, CiStar } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MyLibrary() {
  const [user, setUser] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setSavedBooks([]);
        setFinishedBooks([]);
        return;
      }

      const savedBooksRef = collection(db, "users", user.uid, "savedBooks");

      const finishedBooksRef = collection(
        db,
        "users",
        user.uid,
        "finishedBooks",
      );

      const savedSnapshot = await getDocs(savedBooksRef);
      const finishedSnapshot = await getDocs(finishedBooksRef);

      const books = savedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const finished = finishedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSavedBooks(books);
      setFinishedBooks(finished);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto py-6">
      <div className="px-10 w-full">
        <div className="relative w-full">
          <div className="text-xl font-bold text-[#032b41] mb-4">
            Saved Books
          </div>


          <div className="font-extralight text-[#394547] mb-4">
            {savedBooks.length} items
          </div>
          <div ref={emblaRef} className="overflow-hidden mx-12">
            <div className="flex">
              {savedBooks.length === 0 ? (
                <div className="text-[#6b757b] mb-8">
                  You have no current books saved.
                </div>
              ) : (
                <>
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

                  <div ref={emblaRef} className="overflow-hidden mx-12">
                    <div className="flex">
                      {savedBooks.map((book) => (
                        <Link
                          href={`/book/${book.id}`}
                          key={book.id}
                          className="relative flex-[0_0_208px] px-8 py-3 rounded-sm"
                        >
                          {book.subscriptionRequired && (
                            <div className="absolute top-0 right-8 z-10 bg-[#032b41] text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                              Premium
                            </div>
                          )}
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
                </>
              )}
            </div>
          </div>
          <div className="text-xl font-bold text-[#032b41] mb-4">Finished</div>
          <div className="font-extralight text-[#394547] mb-4">
            {finishedBooks.length} items
          </div>

          {finishedBooks.length === 0 ? (
            <div className="text-[#6b757b]">
              You have no finished books yet.
            </div>
          ) : (
            finishedBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                {book.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
