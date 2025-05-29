'use client'
import ConfirmDialog from "@/components/confirm-dialog";
import { CustomAvatar, CustomAvatarGroup } from "@/components/custom-avatar";
import Iconify from "@/components/iconify";
import { useSocket } from "@/components/socket/SocketProvider";
import VideoNavBar from "@/layouts/video/VideoNavBar";
import VideoCallContainer from "@/sections/video/VideoCallContainer";
import { useUser } from "@clerk/nextjs";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { alpha } from '@mui/material/styles';

export default function page() {
    const { user } = useUser()
    const { users, handleCall, ongoingCall, localStream } = useSocket()
    const [microphoneOn, setMicrophoneOn] = useState<boolean>(false)
    const [cameraOn, setCameraOn] = useState<boolean>(false)
    const [isCalling, setIsCalling] = useState<boolean>(false)

    const handleCloseConfirm = () => {
        setIsCalling(false)
    }

    useEffect(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            setCameraOn(videoTrack.enabled)
            const audioTrack = localStream.getAudioTracks()[0]
            setMicrophoneOn(audioTrack.enabled)
        }
    }, [localStream])

    useEffect(() => {
        if (ongoingCall?.isRinging) setIsCalling(true)
    }, [ongoingCall])

    const toggleCamera = useCallback(() => () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            videoTrack.enabled = !videoTrack.enabled
            setCameraOn(videoTrack.enabled)
        }
    }, [localStream])

    const toggleMicrophone = useCallback(() => () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0]
            audioTrack.enabled = !audioTrack.enabled
            setMicrophoneOn(audioTrack.enabled)
        }
    }, [localStream])

    return (
        <Container maxWidth='xl'>
            <VideoNavBar />
            <Stack direction='row'
                sx={{
                    flexWrap: 'wrap',
                    borderBottom: (theme) => `solid 1px ${theme.palette.primary.main}`,
                    py: 2,
                }}
            >
                {
                    users.map(user => (
                        <Stack alignItems='center' spacing={1} key={user.userId} p={1}>
                            <Tooltip title={user.profile.username} arrow placement='top'>
                                <CustomAvatar src={user.profile.imageUrl} alt={user.profile.imageUrl} onClick={() => handleCall(user)} />
                            </Tooltip>
                        </Stack>
                    ))
                }
            </Stack>
            {
                localStream && (
                    <VideoCallContainer {...{ stream: localStream, isLocalStream: true, isOnCall: false }} />
                )
            }
            <Stack direction='row' mt={2} justifyContent='center' spacing={2}>
                {/* <Button variant="contained" onClick={() => { }} color='error'>
                    Kết thúc
                </Button> */}
                <IconButton onClick={toggleMicrophone} color="error">
                    <Iconify icon="eva:phone-call-outline" width={30} />
                </IconButton>
                <IconButton onClick={toggleMicrophone} color="inherit">
                    {microphoneOn ? (
                        <Iconify icon="eva:mic-outline" width={30} />
                    ) : (
                        <Iconify icon="eva:mic-off-outline" width={30} />
                    )}
                </IconButton>
                <IconButton onClick={toggleCamera} color="inherit">
                    {microphoneOn ? (
                        <Iconify icon="lucide:camera" width={30} />
                    ) : (
                        <Iconify icon="lucide:camera-off" width={30} />
                    )}
                </IconButton>
            </Stack>

            <ConfirmDialog
                open={isCalling}
                onClose={handleCloseConfirm}
                title='Cuộc gọi đến'
                content={`Bạn có cuộc gọi đến từ ${ongoingCall?.participants.caller.profile.fullName}`}
                action={
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                        }}
                    >
                        Chấp nhận
                    </Button>
                }
            />
        </Container >
    )
}