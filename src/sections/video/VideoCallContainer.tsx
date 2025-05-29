import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface IVideoCallProps {
    stream: MediaStream | null
    isLocalStream: boolean
    isOnCall: boolean
}

export default function VideoCallContainer({ stream, isLocalStream, isOnCall }: IVideoCallProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream
        }
    }, [stream])

    return (
        <Box sx={{
            aspectRatio: '16/9',
            width: '100%',
            borderRadius: 2,
            mt: 2
        }}>
            <video ref={videoRef} autoPlay playsInline muted={isLocalStream} width='100%' />
        </Box>
    )
}