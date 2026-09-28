"use client";

import { useRef } from "react";

export default function Player({ book }) {
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
      <audio
        ref={audioRef}
        src={book.audioLink}
        hidden
      />

      <div>
        <button onClick={skipBackward}>-10s</button>

        <button onClick={playPause}>Play</button>

        <button onClick={skipForward}>+10s</button>
      </div>
    </div>
  );
}