"use client";

import React from 'react';
import { Card, CardContent, TextField, Button, Box, InputLabel } from '@mui/material';
import Image from 'next/image';
import { apiFetch } from '@/services/api';
import { AxiosError } from 'axios';
import { RegisterFormData } from '@/types/index';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

const RegisterForm = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            useToast("Preencha todos os campos", "error");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            useToast("E-mail inválido", "error");
            return;
        }
        if (password !== confirmPassword) {
            useToast("As senhas não coincidem", "error");
            return;
        }
        if (password.length < 6) {
            useToast("A senha deve ter pelo menos 6 caracteres", "error");
            return;
        }
        const data: RegisterFormData = { name, email, password, confirmPassword };

        try {
            const response = await apiFetch('POST', 'auth/register', data);
            console.log('Registration successful:', response.message);
            router.push('/login');
        } catch (error: AxiosError | Error | unknown) {
            console.error('Registration failed:', error);
            useToast(error instanceof Error ? error.message : String(error), "error");
            alert('Erro ao realizar cadastro!');
        }
    };

    return (
        <Card elevation={0} sx={{ border: 'none' }}>
            <CardContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image src={'/image 2.svg'} alt={'hublocal'} width={300} height={100} style={{ marginBottom: '24px' }} />
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Box sx={{ mb: 2 }}>
                            <InputLabel htmlFor="name" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }}>Name</InputLabel>
                            <TextField
                                fullWidth
                                type="text"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <InputLabel htmlFor="email" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }}>Email</InputLabel>
                            <TextField
                                fullWidth
                                type="email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <InputLabel htmlFor="password" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }}>Password</InputLabel>
                            <TextField
                                fullWidth
                                type="password"
                                required
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <InputLabel htmlFor="confirmPassword" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }}>Confirm Password</InputLabel>
                            <TextField
                                fullWidth
                                type="password"
                                required
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007BFF',
                                            borderWidth: 2,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            sx={{
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif',
                                mb: 2,
                                '&:hover': {
                                    backgroundColor: '#0056b3',
                                },
                            }}
                        >
                            Registrar
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            color="secondary"
                            size="large"
                            onClick={() => router.push('/login')}
                            sx={{
                                backgroundColor: '#00C7A5',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif',
                                '&:hover': {
                                    backgroundColor: '#00a78b',
                                },
                            }}
                        >
                            Logar
                        </Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;

