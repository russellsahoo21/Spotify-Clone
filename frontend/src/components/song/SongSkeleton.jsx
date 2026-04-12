const SongSkeleton = () => {
  return (
    <div className="bg-[#181818] p-4 rounded-md animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full aspect-square bg-[#282828] rounded-md mb-4"></div>
      {/* Title Placeholder */}
      <div className="h-4 bg-[#282828] rounded w-3/4 mb-2"></div>
      {/* Artist Placeholder */}
      <div className="h-3 bg-[#282828] rounded w-1/2"></div>
    </div>
  );
};

export default SongSkeleton;