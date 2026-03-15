import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Import Layout
import Layout from './components/layout/Layout';

// Import Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSong from './pages/AddSong';

// A simple wrapper component that checks for a logged-in user
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return null; // Wait for local storage check to finish
  if (!user) return <Navigate to="/login" replace />; // Bounce to login if not authenticated
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PROTECTED ROUTES (Have Sidebar and Player) --- */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* These pages render inside the <Outlet /> of your Layout.jsx */}
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="add-song" element={<AddSong />} />
        </Route>
        
        {/* --- PUBLIC ROUTES (No Sidebar, No Player) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;