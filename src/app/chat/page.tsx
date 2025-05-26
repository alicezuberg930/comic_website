'use client';
import { FormEvent, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function ChatTest() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [chats, setChats] = useState<{ chat: string, message: string }[]>([]);
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        const newSocket = io('ws://127.0.0.1:4001', { withCredentials: true });
        newSocket.on('connect', () => console.log('Connected'));
        newSocket.on('onCreateChat', (chat) => setChats((prev) => [...prev, chat]));
        setSocket(newSocket);
        return () => { newSocket.disconnect() }
    }, [])

    const sendMessageSocket = (test: string) => {
        if (socket) {
            socket.emit('createChat', { test });
        }
    }
    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessageSocket(message)
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <input type='text' onChange={(e) => setMessage(e.target.value)} />
                <button>Fetch Chats</button>
            </form>
            <ul>
                {chats.map((chat, index) => (
                    <li key={index}>{JSON.stringify(chat)}</li>
                ))}
            </ul>
        </div>
    );
}