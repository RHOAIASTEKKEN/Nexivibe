import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import PostHeader from './PostHeader';
import ActionButtons from './Btn/ActionButtons';
import PostButton from './Btn/PostButton';
import Emojis from './Btn/Emojis';
import './Btn/css/TekkenPost.css';

const TekkenPost = React.memo(function TekkenPost({ user }) {
    const [postText, setPostText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [previews, setPreviews] = useState({
        images: [],
        location: null
    });
    const [files, setFiles] = useState({
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [debugInfo, setDebugInfo] = useState(null);
    const emojiPickerRef = useRef(null);
    const iconBtnRef = useRef(null);

    const handleSelectEmoji = (emoji) => {
        setPostText((prevText) => `${prevText} ${emoji}`);
        // setShowEmojiPicker(false); // Hide after selecting
    };

    // Handle click outside to close emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
                iconBtnRef.current && !iconBtnRef.current.contains(event.target)) {
                setShowEmojiPicker(false); // Close picker if click is outside
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside); // Cleanup on component unmount
        };
    }, []);

    const handleFileSelect = (file) => {
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);

        setPreviews(prev => ({
            ...prev,
            images: [...prev.images, fileUrl]
        }));

        setFiles(prev => ({
            ...prev,
            images: [...prev.images, file]
        }));
    };

    const handlePostSubmit = async () => {
        if (!postText) {
            setMessage('El texto es requerido para crear un post.');
            return;
        }

        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('text', postText);

        files.images.forEach((file) => {
            formData.append('images', file);
        });

        if (previews.location) {
            formData.append('location', previews.location);
        }

        setDebugInfo({
            username: user.username,
            text: postText,
            location: previews.location,
            imageFiles: files.images.map(file => ({
                name: file.name,
                type: file.type,
                size: `${(file.size / 1024).toFixed(2)} KB`
            }))
        });

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPostText('');
            setPreviews({ images: [], location: null });
            setFiles({ images: [] });
            setMessage('Post creado exitosamente');

            setDebugInfo(prev => ({
                ...prev,
                serverResponse: response.data
            }));

        } catch (error) {
            console.error('Error al crear el post:', error);
            setMessage(error.response?.data?.message || 'Hubo un error al crear el post');

            setDebugInfo(prev => ({
                ...prev,
                error: {
                    message: error.message,
                    response: error.response?.data
                }
            }));
        }

        setLoading(false);
    };

    return (
        <div className="tekken-post-container">
            <PostHeader
                postText={postText}
                setPostText={setPostText}
                user={user}
                previews={previews}
                setPreviews={setPreviews}
                files={files}
                setFiles={setFiles}
            />
            <ActionButtons
                onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}  // Toggle picker visibility
                iconBtnRef={iconBtnRef}
                onFileSelect={handleFileSelect}
                setPostText={setPostText}
                setPreviews={setPreviews}
            />
            {showEmojiPicker && (
                <div ref={emojiPickerRef}>
                    <Emojis onSelectEmoji={handleSelectEmoji} />
                </div>
            )}
            <PostButton
                onClick={handlePostSubmit}
                disabled={loading || !postText.trim()}
            />
            {loading && <p className="status-message">Enviando...</p>}
            {message && <p className="status-message">{message}</p>}
            {debugInfo && (
                <div className="debug-panel">
                    <h3>Información de Debug</h3>
                    <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
            )}
        </div>
    );
});

export default TekkenPost;
