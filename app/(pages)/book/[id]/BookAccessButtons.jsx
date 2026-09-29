"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useLogin } from "@/app/context/AuthContext";
import Link from "next/link";
import { FaMicrophone } from "react-icons/fa";
import { PiBookOpenText } from "react-icons/pi";

export default function BookAccessButtons({
  bookId,
  subscriptionRequired,
}) {
  const { user, authLoading, setLoginOpen } = useLogin();

  const [subscription, setSubscription] = useState("basic");
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const getSubscription = async () => {
      if (!user) {
        setSubscription("basic");
        setSubscriptionLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setSubscription(
            userSnap.data().subscription || "basic"
          );
        } else {
          setSubscription("basic");
        }
      } catch (error) {
        console.error("Error getting subscription:", error);
        setSubscription("basic");
      } finally {
        setSubscriptionLoading(false);
      }
    };

    getSubscription();
  }, [user, authLoading]);

  if (authLoading || subscriptionLoading) {
    return (
      <div className="flex gap-4 mb-6 animate-pulse">
        <div className="w-36 h-12 bg-gray-300 rounded-sm" />
        <div className="w-36 h-12 bg-gray-300 rounded-sm" />
      </div>
    );
  }

  
  const hasPremium =
    subscription === "premium" ||
    subscription === "premium-plus";

  const hasAccess =
    !subscriptionRequired || hasPremium;

  if (hasAccess) {
    return (
      <div className="flex gap-4 mb-6">
        <Link
          href={`/player/${bookId}`}
          className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-300 hover:opacity-70"
        >
          <PiBookOpenText />
          <span>Read</span>
        </Link>

        <Link
          href={`/player/${bookId}`}
          className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-300 hover:opacity-70"
        >
          <FaMicrophone />
          <span>Listen</span>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => setLoginOpen(true)}
        className="mb-6 bg-[#032b41] text-white px-5 h-12 rounded-sm cursor-pointer transition-opacity duration-300 hover:opacity-70"
      >
        Login to access this book
      </button>
    );
  }

  return (
    <Link
      href="/choose-plan"
      className="inline-flex mb-6 items-center justify-center bg-[#2bd97c] text-[#032b41] font-medium px-5 h-12 rounded-sm transition-opacity duration-300 hover:opacity-70"
    >
      Premium subscription required
    </Link>
  );
}