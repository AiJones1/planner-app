'use client';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link
} from '@mui/material';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  formData,
  errors,
  onChange,
  onSubmit
}: LoginFormProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: '#f5f5f5' 
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
          gutterBottom 
          align="center"
          sx={{ mb: 3 }}
        >
          Login To Plan 4 Me
        </Typography>
        {/* <Typography
            variant="h6"
        >
            Your personal meal planning assistant
        </Typography> */}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email Account
          </Typography>
          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={onChange}
            size="small"
            margin="dense"
            variant="outlined"
          />

          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
            Your Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            size="small"
            margin="dense"
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOG IN
          </Button>

          <Typography variant="body2" align="center">
            Don't Have an Account?{' '}
            <Link href="/auth/signup" underline="hover">
              Sign up Now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};