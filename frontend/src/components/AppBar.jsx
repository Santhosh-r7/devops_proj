import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../pages/auth/UserContext';

const AppBar = () => {

  const { user } = useUser()
  const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth)
          navigate('/login');
        } catch(error) {
          console.log("log out error", error)
        }
      }
    return (
        
    <nav>
        <div className="bg-slate-800 p-6" >
            <Link to="/home" className="text-3xl py-4 pr-4 font-bold text-blue-700 align-middle"><span className='text-blue-600'>Tax</span>Track</Link>
            <Link to="/home" className="text-white p-4 align-middle">Home</Link>
            {user ? (
            <Link to={`/history/${user.email}`} className="text-white p-4 align-middle">History</Link>
              ) : (
            <Link to="/" className="text-white p-4 align-middle">History</Link>
            )}
            
            <Link to="/news" className="text-white p-4 align-middle">News</Link>
            <Link to="/faq" className="text-white p-4 align-middle">FAQ</Link>
            <Link to="/login" className="text-white p-1 float-right align-middle" onClick={handleLogout}>Log out</Link>
            </div>
    </nav>
    );
};

export default AppBar;