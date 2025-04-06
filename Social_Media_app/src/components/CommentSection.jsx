import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments } from '../redux/slices/commentSlice';

const CommentSection = ({ postId }) => {
    const dispatch = useDispatch();
    const { commentsByPost } = useSelector((state) => state.comments);
    const comments = commentsByPost[postId] || [];
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ postId, text }));
        setText('');
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-2">
                <input
                    type="text"
                    value={text}
                    placeholder="Add a comment..."
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="flex-grow px-3 py-1 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                    Post
                </button>
            </form>

            <div className="pl-3">
                {comments.map((comment) => (
                    <div key={comment._id} className="text-sm text-gray-800 mt-1">
                        <strong>{comment.user.name}</strong>: {comment.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
