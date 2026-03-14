import PlayControls from "./components/music.control";
import TopBar from "./components/Topbar";
import MusicPage from "./components/MusicPage";
import Sidebar from "./components/sidebar";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">

      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <MusicPage />
        </div>

      </div>

      {/* Bottom Player Controls */}
      <PlayControls />
    </div>
  );
}

export default App;
