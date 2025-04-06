import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, toggleLike } from '../redux/slices/postSlice';
import { Heart } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import NewPost from '../components/NewPost';

const PostList = () => {
    const dispatch = useDispatch();
    const { posts = [], currentPage = 1, totalPages = 1, loading, error } = useSelector(
        (state) => state.posts || {}
    );

    useEffect(() => {
        dispatch(fetchPosts(currentPage));
    }, [dispatch, currentPage]);

    const handleLike = (postId) => {
        dispatch(toggleLike(postId));
    };

    const handlePageChange = (page) => {
        dispatch(fetchPosts(page));
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-semibold text-center mb-6">Posts</h1>

            <NewPost />

            {posts.map(post => (
                <div key={post._id} className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="mb-2">{post.content}</p>
                    {post.image && (
                        <img
                            src={post.image}
                            alt="Post"
                            className="w-full max-w-md rounded mb-3 mx-auto"
                        />
                    )}


                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        <button onClick={() => handleLike(post._id)} className="hover:scale-105 transition">
                            <Heart size={20} />
                        </button>
                        <span>{post.likes?.length || 0}</span>
                    </div>


                    <CommentSection postId={post._id} />
                </div>
            ))}


            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-black'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;
