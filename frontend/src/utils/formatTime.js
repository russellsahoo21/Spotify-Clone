export const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "0:00";
  
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  // .padStart(2, '0') ensures 5 seconds shows as "05" instead of "5"
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};