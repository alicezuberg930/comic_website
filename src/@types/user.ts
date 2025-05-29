import { User } from '@clerk/nextjs/server'

export type ISocketUser = {
    userId: string
    socketId: string
    profile: User
}