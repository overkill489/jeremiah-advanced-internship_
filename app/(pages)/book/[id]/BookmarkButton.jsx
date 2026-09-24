"use client";

import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/app/firebase";

export default function BookmarkButton({ book, bookId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const bookRef = doc(
        db,
        "users",
        user.uid,
        "savedBooks",
        String(bookId)
      );

      const bookSnapshot = await getDoc(bookRef);

      if (bookSnapshot.exists()) {
        setSaved(true);
      }
    };

    checkSaved();
  }, [bookId]);

  const handleBookmark = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const bookRef = doc(
      db,
      "users",
      user.uid,
      "savedBooks",
      String(bookId)
    );

    try {
      if (saved) {
        await deleteDoc(bookRef);
        setSaved(false);
      } else {
        await setDoc(bookRef, {
          ...book,
          savedAt: new Date(),
        });

        setSaved(true);
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div
      onClick={handleBookmark}
      className="flex items-center gap-2 text-[#0365f2] font-medium cursor-pointer mb-10 text-lg"
    >
      <div className="w-5 h-5">
        {saved ? (
          <FaBookmark className="w-full h-full text-[#0365f2]" />
        ) : (
          <CiBookmark className="w-full h-full text-[#0365f2]" />
        )}
      </div>

      <span>
        {saved ? "Saved to your Library" : "Add title to My Library"}
      </span>
    </div>
  );
}