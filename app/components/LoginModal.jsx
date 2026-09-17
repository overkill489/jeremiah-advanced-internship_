import React from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const LoginModal = ({
  creatingAccount,
  handleGuestLogin,
  handleGoogleLogin,
  email,
  password = "",
  handleForgotPassword,
  setLoginOpen,
  setPassword,
  setEmail,
  setCreatingAccount,
  auth
}) => {
  return (
    <div className="w-full z-10 fixed inset-0 flex items-center justify-center bg-gray-500/50">
      <div className="relative max-w-98 bg-white rounded-lg shadow-md">
        <div className="px-12 py-8">
          <div className="text-center text-xl font-normal text-[#032b41] mb-6">
            {creatingAccount ? "Create you account" : "Login to Summarist"}
          </div>
          <button
            onClick={handleGuestLogin}
            className="cursor-pointer relative flex items-center gap-3 bg-[#3a579d] text-white justify-center w-full"
          >
            <FaUser />
            <div>Login as Guest</div>
          </button>
          <div className="flex items-center gap-3 mb-2 mt-2">
            <div className="flex-1 h-px bg-gray-800" />
            <span>or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <button
            onClick={handleGoogleLogin}
            className="cursor-pointer flex items-center gap-3 relative bg-[#3a579d] text-white justify-center w-full"
          >
            <FcGoogle />
            <div>Login with Google</div>
          </button>
          <div className="flex items-center gap-3 mb-2 mt-2">
            <div className="flex-1 h-px bg-gray-800" />
            <span>or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                if (creatingAccount) {
                  await createUserWithEmailAndPassword(auth, email, password);
                  console.log("Account created!");
                } else {
                  await signInWithEmailAndPassword(auth, email, password);
                  console.log("Email login successful!");
                }

                setLoginOpen(false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 border-2 border-[#bac8ce] text-[#394547] py-3"
              placeholder="Email Address"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border-2 border-[#bac8ce] text-[#394547] py-3"
              placeholder="Password"
            />

            <button
              type="submit"
              className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full h-7 rounded-sm text-base transition-colors duration-200 hover:bg-[#1ea15b] flex items-center justify-center min-w-44"
            >
              {creatingAccount ? "Create Account" : "Login"}
            </button>
          </form>
        </div>
        {!creatingAccount && (
          <button
            onClick={handleForgotPassword}
            className="cursor-pointer h-10 text-center text-[#116be9] w-full mb-2"
          >
            Forgot your password?
          </button>
        )}
        <button
          onClick={() => setCreatingAccount(true)}
          className="cursor-pointer h-10 text-center bg-[#f1f6f4] text-[#116be9] w-full "
        >
          {creatingAccount
            ? "Already have an account"
            : "Don't have an account?"}
        </button>
        <button
          onClick={() => setLoginOpen(false)}
          className="text-3xl absolute top-3 right-3 flex cursor-pointer transition duration-200 opacity-15"
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
