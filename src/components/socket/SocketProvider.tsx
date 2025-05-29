'use client'
import { OngoingCall } from "@/@types/call"
import { ISocketUser } from "@/@types/user"
import { useUser } from "@clerk/nextjs"
import { memoize } from "lodash"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { io, Socket } from "socket.io-client"

interface ISocketContext {
    socket: Socket | null
    isConnected: boolean
    users: ISocketUser[] | [],
    handleCall: (user: ISocketUser) => void
    ongoingCall: OngoingCall | null
    localStream: MediaStream | null
}

export const SocketContext = createContext<ISocketContext | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [users, setUsers] = useState<ISocketUser[]>([])
    const { user } = useUser()
    const [ongoingCall, setOngoingCall] = useState<OngoingCall | null>(null)
    const currentSocketUser = users.find(u => u.userId === user?.id)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)

    const handleCall = useCallback(async (user: ISocketUser) => {
        if (!currentSocketUser || !socket) return
        const stream = await getMediaStream()
        if (!stream) {
            return
        }
        const participants = {
            caller: currentSocketUser, receiver: user
        }
        setOngoingCall({
            participants,
            isRinging: false
        })
        socket?.emit('startCall', participants)

    }, [socket, ongoingCall, currentSocketUser])

    const onIncomingCall = useCallback((participants: { caller: ISocketUser, receiver: ISocketUser }) => {
        console.log(participants)
        setOngoingCall({
            participants,
            isRinging: true
        })
    }, [socket, user, ongoingCall])

    const getMediaStream = useCallback(async (faceMode?: string) => {
        if (localStream) return localStream
        try {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const videoDevices = devices.filter(device => device.kind === 'videoinput')
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 360, ideal: 720, max: 1080 },
                    frameRate: { min: 30, ideal: 45, max: 60 },
                    facingMode: videoDevices.length > 0 ? faceMode : undefined
                }
            })
            setLocalStream(stream)
            return stream
        } catch (error) {
            setLocalStream(null)
            console.error(error)
            return null
        }
    }, [localStream])

    useEffect(() => {
        const newSocket = io('ws://127.0.0.1:4001', { withCredentials: true });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.on('connected', (data) => {
            setIsConnected(true)
            console.log(data)
        });
        socket.on('disconnected', (data) => {
            setIsConnected(false)
            console.log(data)
        });
        return () => {
            socket.off('connected', (data) => {
                setIsConnected(true)
                console.log(data)
            });
            socket.off('disconnected', (data) => {
                setIsConnected(false)
                console.log(data)
            });
        }
    }, [socket])

    useEffect(() => {
        if (!socket) return
        console.log('user added')
        socket.emit('userJoin', user)
        socket.on('getUsers', (data) => {
            console.log(data)
            setUsers(data)
        })
        // socket.on('incomingCall', onIncomingCall)
        return () => {
            socket.off('getUsers', (data) => setUsers(data))
            // socket.off('incomingCall', onIncomingCall)
        }
    }, [socket, user, isConnected])

    useEffect(() => {
        if (!socket || !isConnected) return
        socket.on('incomingCall', onIncomingCall)
        return () => {
            socket.off('incomingCall', onIncomingCall)
        }
    }, [socket, user, isConnected, onIncomingCall])

    const memoizedValue = useMemo(() => ({
        socket,
        isConnected,
        users,
        handleCall,
        ongoingCall,
        localStream
    }), [users, socket, isConnected, ongoingCall, localStream])

    return (
        <SocketContext.Provider value={memoizedValue}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error("use socket must be used within a SocketProvider")
    }
    return context
}