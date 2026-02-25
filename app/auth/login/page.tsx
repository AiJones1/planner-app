'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  // Basic state to satisfy props
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Simple handlers you can play with
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log('Changed:', name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData); 
  };

  return (
    <LoginForm 
      formData={formData}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}