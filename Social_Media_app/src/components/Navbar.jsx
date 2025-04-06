import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProfile } from '../redux/slices/profileSlice';

function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const profile = useSelector((state) => state.profile.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchProfile());
        }
    }, [user, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
            <Link to="/" className="text-white text-xl font-bold">MySocialApp</Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
                        <Link to="/posts" className="text-white hover:text-gray-300">Post</Link>

                        {profile?.profilePicture && (
                            <img
                                src={profile.profilePicture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                            />
                        )}

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                        <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
