import React from 'react';
import '../../../Styles/Emojis.css';

const Emojis = ({ onSelectEmoji }) => {
    const emojiList = [
        { emoji: '🙂', tooltip: 'Smile' },
        { emoji: '😂', tooltip: 'Laugh' },
        { emoji: '😍', tooltip: 'Love' },
        { emoji: '😎', tooltip: 'Cool' },
        { emoji: '🤔', tooltip: 'Think' },
        { emoji: '😭', tooltip: 'Cry' },
        { emoji: '🥳', tooltip: 'Party' },
        { emoji: '🤩', tooltip: 'Starstruck' },
        { emoji: '😡', tooltip: 'Angry' },
        { emoji: '😴', tooltip: 'Sleepy' },
        { emoji: '🤤', tooltip: 'Drool' },
        { emoji: '🙃', tooltip: 'Upside Down' },
        { emoji: '😜', tooltip: 'Wink' },
        { emoji: '😱', tooltip: 'Shocked' },
        { emoji: '😅', tooltip: 'Sweat' },
        { emoji: '😏', tooltip: 'Smirk' },
        { emoji: '🤓', tooltip: 'Nerd' },
        { emoji: '🥺', tooltip: 'Pleading' },
        { emoji: '💪', tooltip: 'Strong' },
        { emoji: '🧐', tooltip: 'Inspect' },
        { emoji: '😇', tooltip: 'Angel' },
        { emoji: '🔥', tooltip: 'Fire' },
        { emoji: '😈', tooltip: 'Devil' },
        { emoji: '❤️', tooltip: 'Heart' },
        { emoji: '👍', tooltip: 'Like' },
        { emoji: '🙌', tooltip: 'High Five' },
        { emoji: '👏🏻', tooltip: 'Cheer' },
        { emoji: '🎉', tooltip: 'Celebrate' },
        { emoji: '✨', tooltip: 'Appreciate' },
        { emoji: '💀', tooltip: 'Skull' },
        { emoji: '👀', tooltip: 'Eyes' },
        { emoji: '🙈', tooltip: 'See No Evil' },
        { emoji: '🙉', tooltip: 'Hear No Evil' },
        { emoji: '🙊', tooltip: 'Speak No Evil' },
        { emoji: '🤷‍♂️', tooltip: 'Shrug' },
        { emoji: '✌️', tooltip: 'Peace' },
        { emoji: '👌', tooltip: 'Okay' },
        { emoji: '🙏', tooltip: 'Pray' },
        { emoji: '💥', tooltip: 'Explosion' },
        { emoji: '🎯', tooltip: 'Target' }
    ];

    return (
        <div className="emoji-picker">
            <div className="emoji-grid">
                {emojiList.map((item, index) => (
                    <span
                        key={index}
                        className="emoji-item"
                        data-tooltip={item.tooltip}
                        onClick={() => onSelectEmoji(item.emoji)}
                    >
                        {item.emoji}
                    </span>
                ))}
            </div>

            <style>{`
                .emoji-picker {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #1a1a1a;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                    z-index: 10;
                }

                .emoji-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    gap: 8px;
                }

                .emoji-item {
                    font-size: 24px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .emoji-item:hover {
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
};

export default Emojis;
