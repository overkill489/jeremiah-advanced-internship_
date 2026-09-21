"use client"

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useLogin } from "../context/AuthContext";

export default function Landing() {
  const {user, setLoginOpen } = useLogin();
 
  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
    } else {
      setLoginOpen(true);
    }
  }

  return (
    <section id="landing">
      <div className="px-10 py-0 ">
        <div className="w-full max-w-5xl mx-auto px-0 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center max-w-135 w-full md:w-1/2">
              <div className="text-[#032b41] text-3xl font-bold mb-6">
                Gain more knowledge <br />
                in less time
              </div>
              <div className="text-[#394547] text-xl font-light mb-6 leading-normal">
                Great summaries for busy people,
                <br />
                individuals who barely have time to read,
                <br />
                and even people who don’t like to read.
              </div>
              {/* <button onClick={() => user ? logout() : navigate("/login")} className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full h-10 rounded text-lg transition-colors duration-300 hover:bg-[#209e5b] flex items-center justify-center min-w-44 max-w-72">
               {user ? "Logout" : "Login"}
              </button> */}
              <button onClick={handleAuthClick} className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full h-10 rounded text-lg transition-colors duration-300 hover:bg-[#209e5b] flex items-center justify-center min-w-44 max-w-72">
               {user ? "Logout" : "Login"}
              </button>
            </div>
            <figure className="hidden md:flex w-1/2 justify-end">
              <img className="hidden w-full h-full max-w-96 md:block" src="/assets/landing.png" alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
