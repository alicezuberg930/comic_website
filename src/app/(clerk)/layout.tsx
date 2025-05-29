import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function ClerkLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth='lg' sx={{ alignContent: 'center', height: '100%' }}>
            <Stack alignItems='center'>
                {children}
            </Stack>
        </Container>
    )
}