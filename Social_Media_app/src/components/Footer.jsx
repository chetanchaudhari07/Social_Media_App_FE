import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">


                <div>
                    <h2 className="text-2xl font-bold mb-2">MySocialApp</h2>
                    <p className="text-gray-400">Connect. Share. Grow.</p>
                </div>


                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Navigation</h3>
                    <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                    <Link to="/posts" className="text-gray-400 hover:text-white">Posts</Link>
                    <Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link>
                    <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
                </div>


                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Facebook />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Twitter />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
                &copy; {new Date().getFullYear()} MySocialApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
