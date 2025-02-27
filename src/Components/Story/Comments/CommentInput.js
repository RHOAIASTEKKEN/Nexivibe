import React, { useState } from 'react';
import Button from './Button';

const CommentInput = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-input-container">
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
            />
            {/* <button type="submit" className="comment-submit-btn">Sender</button> */}
            <Button />
        </form>
    );
};

export default CommentInput;