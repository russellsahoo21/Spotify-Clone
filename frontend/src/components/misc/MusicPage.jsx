export default function MusicPage() {
  return (
    <div className="flex-1 h-full overflow-y-auto p-6 bg-gradient-to-b from-[#1d1d1d] to-[#0a0a0a]">

      {/* Trending Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trending songs</h2>
        <button className="text-gray-300 hover:text-white text-sm">Show all</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-10">

        {/* 8 Sample Song Cards */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="cursor-pointer">
            <img
              src={`https://picsum.photos/200?random=${i}`}
              className="rounded-lg mb-3"
              alt="Song"
            />
            <h3 className="font-semibold">Sample Song {i + 1}</h3>
            <p className="text-sm text-gray-400">Artist Placeholder</p>
          </div>
        ))}

      </div>

      {/* Popular Artists */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Popular artists</h2>
        <button className="text-gray-300 hover:text-white text-sm">Show all</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-6">

        {/* 8 Sample Artist Cards */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="cursor-pointer text-center">
            <img
              src={`https://picsum.photos/200?random=${i + 20}`}
              className="rounded-full mb-3 w-full h-auto"
              alt="Artist"
            />
            <h3 className="font-semibold">Artist {i + 1}</h3>
          </div>
        ))}

      </div>
    </div>
  );
}
