"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  onAuthStateChanged,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import LoginModal from "../components/LoginModal";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider } from "../context/AuthContext";
import LoggedIn from "../components/LoggedIn";

const AppLayout = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const pathname = usePathname();
  const hideLayout = ["/for-you", "/settings"].some((p) => pathname.startsWith(p))
  const hideLayout2 = pathname.startsWith("/")

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      setLoginOpen(false);
      console.log("Guest logged in!");
      router.push("/for-you");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setLoginOpen(false);
      router.push("/for-you");
      console.log("Google login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!hideLayout && (
        <Navbar setLoginOpen={setLoginOpen} user={user} auth={auth} />
      )}

      {!hideLayout2 && (<LoggedIn />)}

      <AuthProvider value={{ setLoginOpen }}>{children}</AuthProvider>
      {!hideLayout && <Footer />}
      {loginOpen && (
        <LoginModal
          auth={auth}
          setLoginOpen={setLoginOpen}
          creatingAccount={creatingAccount}
          handleGuestLogin={handleGuestLogin}
          email={email}
          password={password}
          handleForgotPassword={handleForgotPassword}
          handleGoogleLogin={handleGoogleLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          setCreatingAccount={setCreatingAccount}
        />
      )}
    </div>
  );
};

export default AppLayout;
