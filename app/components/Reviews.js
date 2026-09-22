"use client";

import { BsStarFill } from "react-icons/bs";
import { useLogin } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Reviews() {
  const { user, setLoginOpen } = useLogin();

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <section id="reviews">
      <div className="max-w-5xl w-full mx-auto px-0 py-6">
        <div className="px-10 py-0 w-full">
          <div className="text-3xl text-[#032b41] text-center mb-8 font-bold">
            What our members say
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-medium">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="review__name">Hanna M.</div>
                <div className="flex mt-1">
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                </div>
              </div>
              <div className="text-[#394547] tracking-wide text-sm/normal">
                This app has been a <b>game-changer</b> for me! It's saved me so
                much time and effort in reading and comprehending books. Highly
                recommend it to all book lovers.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-medium">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="review__name">David B.</div>
                <div className="flex mt-1">
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                </div>
              </div>
              <div className="text-[#394547] tracking-wide text-sm/normal">
                I love this app! It provides
                <b>concise and accurate summaries</b> of books in a way that is
                easy to understand. It's also very user-friendly and intuitive.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-medium">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="review__name">Nathan S.</div>
                <div className="flex mt-1">
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                </div>
              </div>
              <div className="text-[#394547] tracking-wide text-sm/normal">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.
                <b>The summaries are well-written and informative.</b>
                Definitely worth downloading.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-medium">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="review__name">Ryan R.</div>
                <div className="flex mt-1">
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                  <BsStarFill className="w-4 h-4 fill-[#0564f1]" />
                </div>
              </div>
              <div className="text-[#394547] tracking-wide text-sm/normal">
                If you're a busy person who
                <b>loves reading but doesn't have the time</b> to read every
                book in full, this app is for you! The summaries are thorough
                and provide a great overview of the book's content.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAuthClick}
              className="bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-sm text-base transition-colors duration-300 hover:bg-[#26a862] cursor-pointer flex items-center justify-center min-w-[180] max-w-[500]"
            >
             {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
