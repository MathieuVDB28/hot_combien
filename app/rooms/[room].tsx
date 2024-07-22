import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

const Room = () => {
    const params = useParams();
    const room = params?.room as string | undefined;

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        if (!room) return;

        socket = io();

        socket.emit('joinRoom', room);

        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userJoined', (room: string) => {
            setMessages((prevMessages) => [...prevMessages, `User joined ${room}`]);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    const sendMessage = () => {
        if (message && room) {
            socket.emit('message', { room, message });
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage('');
        }
    };

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Room: {room}</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Room;
