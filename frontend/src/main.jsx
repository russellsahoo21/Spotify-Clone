import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { PlayerProvider } from './context/PlayerContext.jsx'; // <-- Import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PlayerProvider> {/* <-- Add this wrapper */}
        <App />
      </PlayerProvider>
    </AuthProvider>
  </React.StrictMode>,
);