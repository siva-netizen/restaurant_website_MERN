import React, { createContext, useEffect, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const newSocket = io('http://localhost:3000'); 
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setConnected(true);
        });

        newSocket.on('disconnect', () => {
            setConnected(false);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
