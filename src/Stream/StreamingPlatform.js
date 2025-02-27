import React, { useState, useRef, useEffect } from 'react';
import { Send, Gift, DollarSign, MessageSquare, Plus } from 'lucide-react';
import './StreamingPlatform.css';
import Button from './Button';
import PaymentModal from './PaymentModal';
import Sectbar from '../Components/Sectbar';

const StreamingPlatform = ({leftSidebarVisible, rightSidebarVisible}) => {
    const [balance, setBalance] = useState(500);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showRechargeOptions, setShowRechargeOptions] = useState(false);
    const [showGifts, setShowGifts] = useState(false);
    const [customDonation, setCustomDonation] = useState('');
    const chatRef = useRef(null);
    const [showDonations, setShowDonations] = useState(false);

    const gifts = [
        { id: 1, name: 'Super Star', cost: 50, icon: '⭐', color: 'yellow' },
        { id: 2, name: 'Heart', cost: 20, icon: '❤️', color: 'pink' },
        { id: 3, name: 'Trophy', cost: 100, icon: '🏆', color: 'purple' },
        { id: 4, name: 'Crown', cost: 200, icon: '👑', color: 'orange' }
    ];

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, {
                text: newMessage,
                user: 'Usuario',
                time: new Date(),
                type: 'message'
            }]);
            setNewMessage('');
        }
    };

    const handleDonation = (amount) => {
        if (amount <= balance) {
            setBalance(prev => prev - amount);
            setMessages([...messages, {
                text: `ha donado $${amount}`,
                user: 'Usuario',
                time: new Date(),
                type: 'donation',
                amount
            }]);
        }
    };

    const handleCustomDonation = (e) => {
        e.preventDefault();
        const amount = parseFloat(customDonation);
        if (amount && amount <= balance) {
            handleDonation(amount);
            setCustomDonation('');
        }
    };

    const handleGiftPurchase = (gift) => {
        if (balance >= gift.cost) {
            setBalance(prev => prev - gift.cost);
            setMessages([...messages, {
                text: `ha enviado un ${gift.name} ${gift.icon}`,
                user: 'Usuario',
                time: new Date(),
                type: 'gift',
                gift
            }]);
        }
    };



    return (
        <Sectbar

            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}>
            <div className="streaming-container">
                <div className="header">
                    <div className="header-content">
                        <h1 className="logo">StreamPro</h1>
                        <div className="balance-container">
                            <button
                                onClick={() => setShowRechargeOptions(!showRechargeOptions)}
                                className="balance-button"
                            >
                                <DollarSign className="icon green" />
                                <span className="balance-amount">${balance}</span>
                                <Plus className="icon green" />
                            </button>
                            <PaymentModal
                                showRechargeOptions={showRechargeOptions}
                                setShowRechargeOptions={setShowRechargeOptions}
                            />
                        </div>
                    </div>
                </div>

                <div className="main-content">
                    <div className="stream-section">
                        <div className="stream-container">
                            <div className="stream-placeholder">
                                <p>Transmisión en vivo</p>
                            </div>
                        </div>
                        <div className="gifts-section">
                            <button
                                onClick={() => setShowGifts(!showGifts)}
                                className="gifts-toggle"
                            >
                                <div className="gifts-header">
                                    <Gift className="icon purple" />
                                    <span>Regalos</span>
                                </div>
                                <span className={`arrow ${showGifts ? 'rotate' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {showGifts && (
                                <div className="gifts-grid">
                                    {gifts.map(gift => (
                                        <button
                                            key={gift.id}
                                            onClick={() => handleGiftPurchase(gift)}
                                            className="gift-button"
                                            disabled={balance < gift.cost}
                                        >
                                            <span className="gift-icon">{gift.icon}</span>
                                            <span className={`gift-cost ${gift.color}`}>${gift.cost}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="donation-container">
                            <Button onClick={() => setShowDonations(!showDonations)} />

                            {showDonations && (
                                <div className="donation-section">
                                    <div className="quick-donations">
                                        {[5, 10, 20].map(amount => (
                                            <button
                                                key={amount}
                                                onClick={() => handleDonation(amount)}
                                                className="donation-button"
                                                disabled={balance < amount}
                                            >
                                                Donar ${amount}
                                            </button>
                                        ))}
                                    </div>
                                    <form onSubmit={handleCustomDonation} className="custom-donation">
                                        <input
                                            type="number"
                                            value={customDonation}
                                            onChange={(e) => setCustomDonation(e.target.value)}
                                            placeholder="Monto personalizado"
                                            className="custom-donation-input"
                                        />
                                        <button
                                            type="submit"
                                            className="custom-donation-button"
                                        >
                                            Donar
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="interaction-section">

                        <div className="chat-section">
                            <div className="chat-header">
                                <h2>
                                    <MessageSquare className="icon blue" />
                                    Chat en vivo
                                </h2>
                            </div>

                            <div ref={chatRef} className="chat-messages">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`message ${msg.type}`}
                                    >
                                        <div className="message-content">
                                            {msg.type === 'donation' && (
                                                <DollarSign className="icon green" />
                                            )}
                                            <span className="username">{msg.user}</span>
                                            <span className="message-text">{msg.text}</span>
                                        </div>
                                        <span className="message-time">
                                            {msg.time.toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="chat-input">
                                <form onSubmit={handleSendMessage} className="message-form">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Escribe un mensaje..."
                                        className="message-input"
                                    />
                                    <button
                                        type="submit"
                                        className="send-button"
                                    >
                                        <Send className="icon" />
                                    </button>
                                </form>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </Sectbar>
    );
};

export default StreamingPlatform;