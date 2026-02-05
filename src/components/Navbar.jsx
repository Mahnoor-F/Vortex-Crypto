import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-5 px-5 md:px-10 bg-slate-900/40 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center font-black text-white text-lg">
          <img src="/favicon.png" alt="" />
        </div>
        <h1 className="text-xl font-bold text-white uppercase italic">
          Vortex<span className="text-indigo-500 text-not-italic">Crypto</span>
        </h1>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer  text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-md shadow-indigo-600/20">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        
        <SignedIn>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 font-medium hidden sm:block">Market Live</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;