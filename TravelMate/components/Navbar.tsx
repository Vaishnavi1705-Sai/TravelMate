import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane } from 'lucide-react';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">TravelMate</span>
          </Link>

          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/#features" className="hover:text-blue-400 transition">Features</Link>
            <Link to="/#popular-places" className="hover:text-blue-400 transition">Popular Places</Link>
            <Link to="/#testimonials" className="hover:text-blue-400 transition">Testimonials</Link>
            <Link to="/#contact" className="hover:text-blue-400 transition">Contact</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-blue-400 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;