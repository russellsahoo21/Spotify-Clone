import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      navigate('/'); // Redirect to home on successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account');
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center p-4">
      <div className="bg-spotify-dark w-full max-w-md p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Sign up to start listening</h1>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white font-bold text-sm block mb-2">What should we call you?</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border border-spotify-grey rounded p-3 text-white focus:border-white focus:outline-none transition"
              placeholder="Enter a profile name."
              required
            />
          </div>
          <div>
            <label className="text-white font-bold text-sm block mb-2">What's your email?</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-spotify-grey rounded p-3 text-white focus:border-white focus:outline-none transition"
              placeholder="Enter your email."
              required
            />
          </div>
          <div>
            <label className="text-white font-bold text-sm block mb-2">Create a password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-spotify-grey rounded p-3 text-white focus:border-white focus:outline-none transition"
              placeholder="Create a password."
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-spotify-green hover:bg-green-400 text-black font-bold py-3 rounded-full mt-4 transition scale-100 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <hr className="border-spotify-light my-8" />
        
        <p className="text-spotify-grey text-center">
          Already have an account? <Link to="/login" className="text-white hover:text-spotify-green underline hover:no-underline">Log in here.</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;