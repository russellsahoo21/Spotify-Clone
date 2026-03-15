export default function TopBar() {
  return (
    <div className="w-full bg-black text-white flex items-center justify-between px-4 md:px-6 py-3">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">

        {/* Spotify Logo */}
        <h1 className="text-green-400 font-bold text-xl md:text-2xl">Spotify</h1>

        {/* Home Icon (hidden on mobile) */}
        <div className="hidden md:flex bg-neutral-900 p-2 rounded-full cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z" />
          </svg>
        </div>

        {/* SEARCH BAR */}
        <div
          className="
            flex flex-1 items-center bg-neutral-900 px-3 md:px-4 py-2 rounded-full
            w-full md:w-80 lg:w-96
          "
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-300">
            <path d="M10 2a8 8 0 105.293 14.293l5.147 5.147 1.414-1.414-5.147-5.147A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>

          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent ml-2 md:ml-3 outline-none w-full placeholder-gray-400 text-sm"
          />

          <svg viewBox="0 0 24 24" className="hidden md:block w-5 h-5 fill-gray-400">
            <path d="M17 8h-1V6a4 4 0 00-8 0v2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2zm-3 0H10V6a2 2 0 014 0v2z" />
          </svg>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button className="text-gray-300 hover:text-white">Premium</button>
        <button className="text-gray-300 hover:text-white">Support</button>
        <button className="text-gray-300 hover:text-white">Download</button>

        <div className="h-5 w-px bg-gray-600"></div>

        <button className="text-gray-300 hover:text-white">Install App</button>
        <button className="text-gray-300 hover:text-white">Sign up</button>

        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200">
          Log in
        </button>
      </div>
    </div>
  );
}
