// components/auth/LoginForm.tsx
'use client';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Container
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
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 5 },
            borderRadius: 3
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center"
            sx={{ 
              mb: 1,
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            Plan 4 Me
          </Typography>

          <Typography 
            variant="h6" 
            component="h2"
            align="center"
            sx={{ mb: 1 }}
          >
            Login
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 4 }}
          >
            Your personal meal planning assistant
          </Typography>

          <Box component="form" onSubmit={onSubmit} noValidate>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={onChange}
              size="small"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />

            <Typography variant="body2" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
              size="small"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, mb: 2, py: 1.5 }}
            >
              LOG IN
            </Button>

            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link href="/auth/signup" underline="hover" fontWeight={600}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};