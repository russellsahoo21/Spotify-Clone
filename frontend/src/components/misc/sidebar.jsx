export default function Sidebar() {
  return (
    <div className="w-80 h-full bg-[#121212] p-4 flex flex-col gap-4 overflow-y-auto">

      <h1 className="text-lg font-bold mb-2">Your Library</h1>

      {/* Create playlist card */}
      <div className="bg-[#1f1f1f] p-4 rounded-lg">
        <h2 className="font-semibold">Create your first playlist</h2>
        <p className="text-sm text-gray-400">It's easy, we'll help you</p>
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold mt-3">
          Create playlist
        </button>
      </div>

      {/* Podcasts card */}
      <div className="bg-[#1f1f1f] p-4 rounded-lg">
        <h2 className="font-semibold">Let's find some podcasts to follow</h2>
        <p className="text-sm text-gray-400">We'll keep you updated on new episodes</p>
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold mt-3">
          Browse podcasts
        </button>
      </div>

      {/* Footer links */}
      <div className="mt-auto text-xs text-gray-400 space-y-2">
        <div className="flex gap-4 flex-wrap">
          <span>Legal</span>
          <span>Privacy Policy</span>
          <span>Cookies</span>
          <span>About Ads</span>
          <span>Accessibility</span>
        </div>

        <button className="border px-3 py-1 rounded-full mt-4 flex items-center gap-2">
          🌐 English
        </button>
      </div>
    </div>
  );
}
    