import { ISocketUser } from "./user"

export type OngoingCall = {
    participants: {
        caller: ISocketUser
        receiver: ISocketUser
    }
    isRinging: boolean
    
}