import { useState, useEffect } from 'react';
import '../../Styles/ArtisRegistration.css';
import MusicPlatform from './MusicPlatform';
import Sectbar from '../Sectbar';
import MusicUploadWrapper from './MusicUploadWrapper';
import RegistrationForm from './ArtistRegistration/RegistrationForm';
import ConfirmationMessage from './ArtistRegistration/ConfirmationMessage';

const ArtistRegistrationForm = ({ leftSidebarVisible, rightSidebarVisible, user }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    };

    useEffect(() => {
        const checkRegistrationAndApproval = async () => {
            setIsLoading(true);
            try {
                // Check registration status
                const registrationResponse = await fetch('http://localhost:3003/api/artists/check-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: user.username })
                });

                if (registrationResponse.ok) {
                    const registrationData = await registrationResponse.json();
                    if (registrationData.registered) {
                        setIsRegistered(true);
                        setIsFormVisible(false);

                        // Only check approval if registered
                        try {
                            const approvalResponse = await fetch('http://localhost:3003/api/artists/check-status', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ username: user.username })
                            });

                            if (approvalResponse.ok) {
                                const approvalData = await approvalResponse.json();
                                setIsApproved(approvalData.status === 'APPROVED');
                            }
                        } catch {
                            // Silently handle approval check errors
                            setIsApproved(false);
                        }
                    }
                }
            } catch {
                // Silently handle registration check errors
                setIsRegistered(false);
                setIsApproved(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkRegistrationAndApproval();
    }, [user.username]);

    if (isLoading) {
        return (
            <Sectbar
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
            >
                <div className="form-container">
                    {/* You can add a loading spinner or placeholder here if desired */}
                </div>
            </Sectbar>
        );
    }

    return (
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
        >
            <div className="form-container">
                {isApproved ? (
                    <MusicUploadWrapper user={user} />
                ) : (
                    <>
                        {isRegistered ? (
                            <ConfirmationMessage />
                        ) : (
                            <button
                                className="neon-button2"
                                onClick={toggleFormVisibility}
                            >
                                <span className="neon-text">
                                    {isFormVisible ? 'Ocultar' : `Unete como creador ${user.username}`}
                                </span>
                            </button>
                        )}

                        {isFormVisible && !isRegistered && (
                            <RegistrationForm user={user} />
                        )}
                    </>
                )}
                <MusicPlatform />
            </div>
        </Sectbar>
    );
};

export default ArtistRegistrationForm;