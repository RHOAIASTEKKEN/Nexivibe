import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function UnreadCount({ senderId, recipientId, unreadMessages, setUnreadMessages, myUserId }) {
    const [count, setCount] = useState(0);
    const socketRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        if (!senderId || !myUserId) {
            console.log('Valores requeridos faltantes:', { 
                senderId: senderId || 'faltante',
                myUserId: myUserId || 'faltante'
            });
            return;
        }

        const initializeUnreadCount = async () => {
            try {
                // Si ya tenemos el conteo en el cache, usarlo
                if (unreadMessages && typeof unreadMessages[senderId] !== 'undefined') {
                    if (mounted) {
                        setCount(unreadMessages[senderId]);
                    }
                    return;
                }
    
                const response = await fetch('http://localhost:3001/api/messages/unread-count', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senderId,
                        recipientId: myUserId
                    })                    
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error en la respuesta:', errorData);
                    throw new Error(errorData.message || 'Error al cargar notificaciones');
                }
                
                const data = await response.json();
                const unreadCount = data.count || 0;
                
                if (mounted) {
                    setCount(unreadCount);
                    if (setUnreadMessages) {
                        setUnreadMessages(prev => ({
                            ...prev,
                            [senderId]: unreadCount
                        }));
                    }
                }
            } catch (err) {
                console.error('Error fetching unread count:', err);
            }
        };

        // Inicializar Socket.IO solo si no existe
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:3001", {
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                transports: ['websocket', 'polling'],
                closeOnBeforeunload: false
            });

            socketRef.current.on("connect", () => {
                console.log("Socket conectado");
                socketRef.current.emit('register user', myUserId);
                initializeUnreadCount();
            });

            socketRef.current.on("connect_error", (error) => {
                console.error("Error de conexión Socket.IO:", error);
            });

            socketRef.current.on("new message", (message) => {
                if (message.senderId === senderId && message.recipientId === myUserId && mounted) {
                    setCount(prev => {
                        const newCount = prev + 1;
                        if (setUnreadMessages) {
                            setUnreadMessages(prevMessages => ({
                                ...prevMessages,
                                [senderId]: newCount
                            }));
                        }
                        return newCount;
                    });
                }
            });

            socketRef.current.on("update unread count", (data) => {
                if (data.senderId.toString() === senderId && 
                    data.recipientId.toString() === myUserId && 
                    mounted) {
                    const newCount = data.count;
                    setCount(newCount);
                    if (setUnreadMessages) {
                        setUnreadMessages(prev => ({
                            ...prev,
                            [senderId]: newCount
                        }));
                    }
                }
            });
        } else {
            // Si el socket ya existe, solo actualizar el conteo inicial
            initializeUnreadCount();
        }

        // Limpieza al desmontar
        return () => {
            mounted = false;
            
            // Solo desconectar el socket si el componente se está desmontando completamente
            if (socketRef.current) {
                socketRef.current.off("new message");
                socketRef.current.off("update unread count");
                socketRef.current.off("connect");
                socketRef.current.off("connect_error");
                
                // No desconectar el socket aquí, solo remover los listeners
                // socketRef.current.disconnect();
            }
        };
    }, [senderId, myUserId, setUnreadMessages, unreadMessages]);

    if (!senderId || !myUserId) {
        return null;
    }

    return count > 0 ? (
        <div className="unread-count">
            <span className="unread-badge">{count}</span>
        </div>
    ) : null;
}

export default UnreadCount;