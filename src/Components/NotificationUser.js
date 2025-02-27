import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/NotificationUser.css";

function NotificationUser({ user }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.username) {
            const fetchRequests = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(
                        `http://localhost:3001/api/friendships/requests?user_username=${user.username}`
                    );
                    setRequests(response.data);
                } catch (err) {
                    setError("Error al cargar las solicitudes de amistad.");
                } finally {
                    setLoading(false);
                }
            };
            fetchRequests();
        }
    }, [user]);

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/friendships/${id}/accept`);
            setRequests((prev) => prev.filter((req) => req.friendship_id !== id));
        } catch (err) {
            setError("Error al aceptar la solicitud.");
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/friendships/${id}/reject`);
            setRequests((prev) => prev.filter((req) => req.friendship_id !== id));
        } catch (err) {
            setError("Error al rechazar la solicitud.");
        }
    };

    if (loading) return <p className="loading">Cargando solicitudes...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!loading && requests.length === 0) return <p>No tienes notificaciones.</p>;

    return (
        <div className="notification-user">
            <h2>Solicitudes de Amistad</h2>
            <ul className="friend-requests-list">
                {requests.map((request) => (
                    <li key={request.friendship_id} className="friend-request-item">
                        <section>
                            <img
                                src={`http://localhost:3001${request.profile_photo}`}
                                alt={`${request.name}'s avatar`}
                                className="friend-request-photo"
                            />
                            <div className="friend-request-info">
                                <h3>{request.name}</h3>
                                <p>@{request.username}</p>
                            </div>
                        </section>
                        <div className="friend-request-actions">
                            <button
                                className="accept-button"
                                onClick={() => handleAccept(request.friendship_id)}
                            >
                                Aceptar
                            </button>
                            <button
                                className="reject-button"
                                onClick={() => handleReject(request.friendship_id)}
                            >
                                Rechazar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationUser;
