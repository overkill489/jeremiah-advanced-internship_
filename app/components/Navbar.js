import { signOut } from "firebase/auth";

export default function Navbar({ user, setLoginOpen, auth }) {
  return (
    <>
      <nav className="h-20">
        <div className="flex justify-between items-center w-full h-full max-w-5xl mx-auto py-0 px-6">
          <a href="/" className="max-w-52">
            <img className="w-full h-full" src="/assets/logo.png" alt="logo" />
          </a>
          <ul className="flex gap-6">
            <button
              onClick={() => {
                if (user) {
                  signOut(auth);
                } else {
                  setLoginOpen(true);
                }
              }}
              className="cursor-pointer text-[#032b41] transition-colors duration-300 hover:text-[#2bd97c]"
            >
              {user ? "Logout" : "Login"}
            </button>
            <li className="hidden cursor-not-allowed text-[#032b41] transition-colors duration-300 hover:text-[#2bd97c] sm:block">
              About
            </li>
            <li className="hidden cursor-not-allowed text-[#032b41] transition-colors duration-300 hover:text-[#2bd97c] sm:block">
              Contact
            </li>
            <li className="hidden cursor-not-allowed text-[#032b41] transition-colors duration-300 hover:text-[#2bd97c] sm:block">
              Help
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}