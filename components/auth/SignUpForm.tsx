'use client';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link
} from '@mui/material';

interface SignUpFormProps {
    formData: {
        email: string;
        password: string;
        name: string;
    }
}

export const SignUpForm = ({
    formData
}: SignUpFormProps) =>{
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 2
                }}
                >
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                >
                    Sign Up For Plan 4 Me
                </Typography>
                <Box>
                    <Typography></Typography>
                    <TextField></TextField>
                    <TextField></TextField>
                    <TextField></TextField>
                    <TextField></TextField>
                    {/* Conditional display if passwords don't match */}
                    <Typography></Typography>
                    <Button></Button>
                </Box>
            </Paper>
        </Box>
    );
};