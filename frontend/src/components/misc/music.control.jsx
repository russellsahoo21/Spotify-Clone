export default function PlayControls() {
  return (
    <div className="w-full bg-neutral-900 text-white px-4 py-3 flex items-center justify-between">

      {/* LEFT SIDE – Track Info */}
      <div className="flex items-center gap-3 w-1/3">
        <div className="w-14 h-14 bg-gray-700 rounded-md"></div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Song Title</span>
          <span className="text-xs text-gray-400">Artist Name</span>
        </div>
      </div>

      {/* CENTER – Main Playback Controls */}
      <div className="flex flex-col items-center w-1/3">

        {/* ICON ROW */}
        <div className="flex items-center gap-5 mb-2">

          {/* Shuffle */}
          <button className="opacity-60 hover:opacity-100 transition">
            <i className="fa-solid fa-shuffle text-lg"></i>
          </button>

          {/* Previous */}
          <button className="opacity-60 hover:opacity-100 transition">
            <i className="fa-solid fa-backward-step text-xl"></i>
          </button>

          {/* Play */}
          <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition">
            <i className="fa-solid fa-play text-base opacity-80"></i>
          </button>

          {/* Next */}
          <button className="opacity-60 hover:opacity-100 transition">
            <i className="fa-solid fa-forward-step text-xl"></i>
          </button>

          {/* Repeat */}
          <button className="opacity-60 hover:opacity-100 transition">
            <i className="fa-solid fa-repeat text-lg"></i>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">1:23</span>
          <div className="w-full h-1 bg-gray-600 rounded-full">
            <div className="h-full w-1/3 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>

      {/* RIGHT SIDE – Volume */}
      <div className="flex items-center gap-3 w-1/3 justify-end">

        {/* Volume Icon */}
        <i className="fa-solid fa-volume-high text-lg opacity-60 hover:opacity-100 transition"></i>

        {/* Volume Bar */}
        <div className="w-24 h-1 bg-gray-600 rounded-full">
          <div className="w-2/3 h-full bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
