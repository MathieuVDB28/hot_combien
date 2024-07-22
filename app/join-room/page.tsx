"use client";

import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';

let socket : Socket;

const Home = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const router = useRouter();

    useEffect(() => {
        socket = io();

        socket.on('roomList', (rooms) => {
            setRooms(rooms);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const createRoom = () => {
        if (roomName) {
            socket.emit('createRoom', roomName);
            router.push(`/rooms/${roomName}`);
        }
    };

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room} onClick={() => router.push(`/rooms/${room}`)}>
                        {room}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
};

export default Home;
