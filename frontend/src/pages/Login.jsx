import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/'); // Redirect to home on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center p-4">
      <div className="bg-spotify-dark w-full max-w-md p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Log in to Spotify Clone</h1>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white font-bold text-sm block mb-2">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-spotify-grey rounded p-3 text-white focus:border-white focus:outline-none transition"
              placeholder="Email address"
              required
            />
          </div>
          <div>
            <label className="text-white font-bold text-sm block mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-spotify-grey rounded p-3 text-white focus:border-white focus:outline-none transition"
              placeholder="Password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-spotify-green hover:bg-green-400 text-black font-bold py-3 rounded-full mt-4 transition scale-100 hover:scale-105"
          >
            Log In
          </button>
        </form>

        <hr className="border-spotify-light my-8" />
        
        <p className="text-spotify-grey text-center">
          Don't have an account? <Link to="/register" className="text-white hover:text-spotify-green underline hover:no-underline">Sign up for Spotify</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;