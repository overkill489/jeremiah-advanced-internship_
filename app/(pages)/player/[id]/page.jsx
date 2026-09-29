"use client";

import { useEffect, useRef, useState } from "react";

export default function Player({ params }) {
  const [book, setBook] = useState({});
  async function fetchBook() {
    const { id } = await params;

    const response = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    );

    const book = await response.json();
    setBook(book);
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const audioRef = useRef(null);

  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  return (
    <div className="relative w-full overflow-y-auto h-[calc(100vh-160px)]">
      <div className="whitespace-pre-line p-6 max-w-[800px] mx-auto ">
        <div className="text-[#032b41] text-2xl border-b-2 border-[#e1e7ea] mb-8 pb-4 leading-relaxed">
          {book.title}
        </div>
        <div className="whitespace-pre-line leading-relaxed text-[#032b41]">
          {book.summary}
        </div>
      </div>

      <div className="w-full mt-auto flex items center justify-between bg-[#042330] py-7 fixed bottom-0 left-0 z-50">
        <audio ref={audioRef} src={book.audioLink} hidden />
        <div className="flex gap-3">
          <figure className="flex max-w-[48px]">
            <img className="w-full h-full" src={book.imageLink} alt="Book" />
          </figure>
          <div className="text-white text-sm flex flex-col gap-1 justify-center">
            <div className="">{book.title}</div>
            <div className="">{book.author}</div>
          </div>
        </div>
        {/* <button onClick={skipBackward}>-10s</button>

        <button onClick={playPause}>Play</button>

        <button onClick={skipForward}>+10s</button> */}
      </div>
    </div>
  );
}
