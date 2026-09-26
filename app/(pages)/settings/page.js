"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // We'll change this later when your subscription system is connected
  const [subscription, setSubscription] = useState("premium-plus");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl w-full mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto py-6 px-4">
      <div className="px-10 w-full">
        {/* Heading */}
        <div className="text-left border-b border-[#e1e7ea] pb-4">
          Settings
        </div>

        {!user ? (
          // NOT LOGGED IN
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="/assets/login.png"
              alt="Login"
              className="w-64 mb-6"
            />

            <h2 className="text-[#032b41] font-semibold mb-4">
              Log in to your account to see your details.
            </h2>

            <button
              className="bg-[#2bd97c] px-8 py-2 rounded text-[#032b41] font-medium"
            >
              Login
            </button>
          </div>
        ) : (
          // LOGGED IN
          <div className="py-8">
            {/* Subscription */}
            <div className="mb-8">
              <h2 className="text-[#032b41] font-semibold mb-3">
                Your Subscription plan
              </h2>

              <p className="text-[#032b41] mb-3">
                {subscription === "basic" && "Basic"}
                {subscription === "premium" && "Premium"}
                {subscription === "premium-plus" && "Premium-plus"}
              </p>

              {subscription === "basic" && (
                <a
                  href="https://summarist.vercel.app/choose-plan"
                  className="inline-block bg-[#2bd97c] px-5 py-2 rounded text-[#032b41] font-medium"
                >
                  Upgrade to Premium
                </a>
              )}
            </div>

            {/* Email */}
            <div>
              <h2 className="text-[#032b41] font-semibold mb-3">
                Email
              </h2>

              <p className="text-[#032b41]">
                {user.email || "No email available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}