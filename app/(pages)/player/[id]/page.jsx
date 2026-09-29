"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdForward10, MdReplay10 } from "react-icons/md";

export default function Player({ params }) {
  const [book, setBook] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative w-full overflow-y-auto h-[calc(100vh-160px)]">
      <div className="whitespace-pre-line p-6 max-w-[800px] mx-auto ">
        <div className="text-[#032b41] font-bold text-2xl border-b-2 border-[#e1e7ea] mb-8 pb-4 leading-relaxed">
          {book.title}
        </div>
        <div className="whitespace-pre-line leading-relaxed text-[#032b41]">
          {book.summary}
        </div>
      </div>

      <div className="w-full mt-auto flex items center justify-between bg-[#042330] py-7 fixed bottom-0 left-0 z-50">
        <audio
          ref={audioRef}
          src={book.audioLink}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          onEnded={() => setIsPlaying(false)}
          hidden
        />
        <div className="flex gap-3">
          <figure className="flex max-w-[48px]">
            <img className="w-full h-full" src={book.imageLink} alt="Book" />
          </figure>
          <div className="text-white text-sm flex flex-col gap-1 justify-center">
            <div className="">{book.title}</div>
            <div className="">{book.author}</div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex items-center justify-center gap-5">
            <button
              className="text-white cursor-pointer"
              onClick={skipBackward}
            >
              <MdReplay10 className="w-7 h-7 " />
            </button>
            <button className="text-white cursor-pointer" onClick={playPause}>
              {isPlaying ? (
                <FaPause className="w-7 h-7 " />
              ) : (
                <FaPlay className="w-7 h-7 " />
              )}
            </button>
            <button className="text-white cursor-pointer" onClick={skipForward}>
              <MdForward10 className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div className="">
          <div className="w-full flex items-center gap-3">
            <span className="text-xs text-gray-500 font-mono">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0365f2]"
            />

            <span className="text-xs text-gray-500 font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
