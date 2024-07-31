"use client";

import {useState, useEffect} from 'react';
import io, {Socket} from 'socket.io-client';
import {useRouter} from 'next/navigation';

let socket: Socket;

const Home = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState<string[]>([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        socket = io();
        if (!socket) return;

        socket.on('roomList', (rooms: string[]) => {
            setRooms(rooms);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const createRoom = () => {
        if (!roomName || !socket) {
            return;
        }
        if (!roomName.trim()) {
            setError("Le nom de la room ne peut pas être vide.");
            return;
        }
        if (!rooms.includes(roomName)) {
            setError("ce nom est déjà utilisé.");
            return;
        }
        socket.emit('createRoom', roomName);
        router.push(`/room/${roomName}`);
    };

    const joinRoom = () => {
        if (!roomName || !socket) {
            return;
        }
        if (!roomName.trim()) {
            setError("Le nom de la room ne peut pas être vide.");
            return;
        }
        if (!rooms.includes(roomName)) {
            setError("Cette room n'existe pas.");
            return;
        }
        socket.emit('joinRoom', roomName);
        router.push(`/room/${roomName}`);
    };

    return (
        <div className="w-full flex flex-col flex-grow mt-20 sm:mt-20">
            <h1 className="mb-16 text-5xl text-[hsl(var(--foreground))] md:text-6xl text-center font-extrabold">
                Jouer à <span className="text-[hsl(var(--primary))]">Hot Combien</span> en ligne
            </h1>
            <div className="flex flex-row mt-20 items-center">
                <div className="w-2/5 py-10">
                    <h2 className="mb-10 text-3xl text-[hsl(var(--foreground))] md:text-4xl text-center font-extrabold">
                        Crée ta partie
                    </h2>
                    <div className="mx-auto max-w-[24rem]">
                        <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
                        <div className="flex rounded-lg shadow-sm">
                            <input type="text" id="hs-trailing-button-add-on"
                                   name="hs-trailing-button-add-on"
                                   className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   value={roomName}
                                   onChange={(e) => setRoomName(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={createRoom}
                                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-[hsl(var(--primary))] text-white hover:opacity-75 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Jouer
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-1/5 mx-4 text-center">
                    <span className="text-[hsl(var(--foreground))] text-2xl md:text-4xl font-extrabold">OU</span>
                </div>

                <div className="w-2/5 py-10">
                    <h2 className="mb-10 text-3xl text-[hsl(var(--foreground))] md:text-4xl text-center font-extrabold">
                        Rejoins une partie
                    </h2>
                    <div className="mx-auto max-w-[24rem]">
                        <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
                        <div className="flex rounded-lg shadow-sm">
                            <input type="text" id="hs-trailing-button-add-on"
                                   name="hs-trailing-button-add-on"
                                   className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                   value={roomName}
                                   onChange={(e) => setRoomName(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={joinRoom}
                                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-[hsl(var(--primary))] text-white hover:opacity-75 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Rejoindre
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {error && (
                <div className="mt-6 text-red-500 text-2xl text-center">
                   ccc {error}
                </div>
            )}
        </div>
    );
};

export default Home;
