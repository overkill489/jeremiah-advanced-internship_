"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useLogin } from "@/app/context/AuthContext";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

export default function Settings() {
  const { setLoginOpen, user, authLoading } = useLogin();

  const [subscription, setSubscription] = useState("basic");
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  const [loading, setLoading] = useState(true);

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
        const userData = userSnap.data();

        setSubscription(userData.subscription || "basic");
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
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
      <FaSpinner className="h-10 w-10 animate-spin text-[#2bd97c]" />
    </div>
  );
}

  return (
    <div className="max-w-5xl w-full mx-auto py-6 px-4">
      <div className="px-10 w-full">
        {!user ? (
          // NOT LOGGED IN
          <div className="flex flex-col items-center justify-center py-20">
            <img src="/assets/login.png" alt="Login" className="w-64 mb-6" />

            <h2 className="text-[#032b41] font-semibold mb-4">
              Log in to your account to see your details.
            </h2>

            <button
              onClick={() => setLoginOpen(true)}
              className="bg-[#2bd97c] cursor-pointer px-8 py-2 rounded text-[#032b41] font-medium transition-colors duration-300 hover:bg-[#20a65f]"
            >
              Login
            </button>
          </div>
        ) : (
          // LOGGED IN
          <>
            <div className="text-2xl font-bold text-[#032b41] text-left border-b border-[#e1e7ea] pb-4">
              Settings
            </div>

            <div className="py-8">
              {/* SUBSCRIPTION */}
              <div className="border-b border-[#e1e7ea] pb-8 mb-8">
                <h2 className="text-[#032b41] font-semibold mb-3">
                  Your Subscription plan
                </h2>

                <p className="text-[#032b41] mb-3">
                  {subscription === "basic" && "Basic"}
                  {subscription === "premium" && "premium"}
                  {subscription === "premium-plus" && "premium-plus"}
                </p>

                {subscription === "basic" && (
                  <Link
                    href="/choose-plan"
                    className="inline-block bg-[#2bd97c] px-5 py-2 rounded text-[#032b41] font-medium transition-colors duration-300 hover:bg-[#20a65f]"
                  >
                    Upgrade to Premium
                  </Link>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <h2 className="text-[#032b41] font-semibold mb-3">Email</h2>

                <p className="text-[#032b41]">
                  {user.email || "No email available"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
