"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaSpinner } from "react-icons/fa";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useLogin } from "@/app/context/AuthContext";
import Link from "next/link";

export default function Player({ params }) {
  const { user, authLoading, setLoginOpen } = useLogin();

  const [book, setBook] = useState(null);
  const [subscription, setSubscription] = useState("basic");
  const [accessLoading, setAccessLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (authLoading) return;

    const loadPlayer = async () => {
      setAccessLoading(true);

      try {
        const { id } = await params;

        // Get the book
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );

        const bookData = await response.json();
        setBook(bookData);

        // No subscription required
        if (!bookData.subscriptionRequired) {
          setAccessLoading(false);
          return;
        }

        // Premium book but user isn't logged in
        if (!user) {
          setSubscription("basic");
          setAccessLoading(false);
          return;
        }

        // Premium book, so check Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setSubscription(userSnap.data().subscription || "basic");
        } else {
          setSubscription("basic");
        }
      } catch (error) {
        console.error("Error loading player:", error);
      } finally {
        setAccessLoading(false);
      }
    };

    loadPlayer();
  }, [user, authLoading, params]);

  // useEffect(() => {
  //   fetchBook();
  // }, []);

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

  const hasPremium =
    subscription === "premium" || subscription === "premium-plus";

  const hasAccess = book && (!book.subscriptionRequired || hasPremium);

  if (authLoading || accessLoading || !book) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
        <FaSpinner className="h-10 w-10 animate-spin text-[#2bd97c]" />
      </div>
    );
  }

  if (book.subscriptionRequired && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <h1 className="text-2xl font-bold text-[#032b41] mb-3">
          Login required
        </h1>

        <p className="text-[#394547] mb-6 text-center">
          Log in to access this Premium book.
        </p>

        <button
          onClick={() => setLoginOpen(true)}
          className="bg-[#2bd97c] px-8 py-3 rounded text-[#032b41] font-medium cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          Login
        </button>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <h1 className="text-2xl font-bold text-[#032b41] mb-3">
          Premium subscription required
        </h1>

        <p className="text-[#394547] mb-6 text-center">
          Upgrade your subscription to read or listen to this book.
        </p>

        <Link
          href="/choose-plan"
          className="bg-[#2bd97c] px-8 py-3 rounded text-[#032b41] font-medium transition-opacity duration-300 hover:opacity-70"
        >
          Upgrade to Premium
        </Link>
      </div>
    );
  }

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
