'use client'
import { useAuth, UserButton } from "@clerk/nextjs";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function VideoNavBar() {
    const { userId } = useAuth()
    const router = useRouter()

    return (
        <Stack direction='row'
            sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.primary.main}`,
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
            <Stack py={2} spacing={1} alignItems='center'>
                <Typography>VideoCall</Typography>
            </Stack>
            <Box>
                <UserButton />
                {
                    !userId && (
                        <Stack direction='row' spacing={2}>
                            <Button variant='outlined' color='warning' onClick={() => router.push('/sign-in')}>
                                Sign in
                            </Button>
                            <Button color='warning' onClick={() => router.push('/sign-up')}>
                                Sign up
                            </Button>
                        </Stack>
                    )
                }
            </Box>
        </Stack>
    )
}