import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import './CommentsModal.css';

const CommentsModal = ({ postId, username, onClose, user }) => {
    const [comments, setComments] = useState([]);

    // Fetch comments when component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
                const data = await response.json();

                // Log the users to check the data
                // const usersList = data.map(comment => comment.username);
                // console.log("Lista de usuarios:", usersList);

                // Save the comments to state
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    // Function to add a new comment
    const handleAddComment = async (commentText) => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments-send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    comment: commentText
                })
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments([...comments, newComment]);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comments-modal">
            <div className="comments-modal-content">
                <CommentList comments={comments} />
                <CommentInput
                    username={username}
                    onSubmit={handleAddComment}
                />

            </div>
        </div>
    );
};

export default CommentsModal;