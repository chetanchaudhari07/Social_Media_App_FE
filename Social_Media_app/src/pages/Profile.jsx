import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, changePassword, deleteProfile, clearMessage, } from '../redux/slices/profileSlice';

function Profile() {
    const dispatch = useDispatch();
    const { profile, message, error } = useSelector((state) => state.profile);

    const [form, setForm] = useState({ name: '', email: '', profilePicture: null });
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setForm({ name: profile.name, email: profile.email, profilePicture: null });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm((prev) => ({ ...prev, profilePicture: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        if (form.profilePicture) {
            formData.append('profilePicture', form.profilePicture);
        }
        dispatch(updateProfile(formData));
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword(passwords));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            dispatch(deleteProfile());
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {profile?.profilePicture && (
                <div className="mb-6 flex justify-center">
                    <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
                    />
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4 mb-8">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    required
                />
                <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Update Profile
                </button>
            </form>

            <form onSubmit={handleChangePassword} className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold">Change Password</h3>
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    required
                />
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                    Change Password
                </button>
            </form>

            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
            >
                Delete Account
            </button>
        </div>
    );
}

export default Profile;
