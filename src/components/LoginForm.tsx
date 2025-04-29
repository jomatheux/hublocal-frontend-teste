"use client";

import React from 'react';
import { Card, CardContent, TextField, Button, Box, InputLabel } from '@mui/material';
import Image from 'next/image';
import { apiFetch } from '@/services/api';
import { useRouter } from 'next/navigation';
import { LoginFormData } from '@/types';

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: LoginFormData = { email, password };

        try {
            const response = await apiFetch('POST', 'auth/login', data);
            if (response.error) {
                throw new Error(response.error);
            }
            console.log('Login feito com sucesso:', response);

            if (typeof window !== 'undefined') {
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('username', response.user.name);
            }

            router.push('/home');
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                console.error('Falha no login:', error.message);
            } else {
                console.error('Falha no login:', error);
            }
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
                    <Image src={'/image 2.svg'} alt={'hublocal'} width={300} height={100} style={{ marginBottom: '24px' }}></Image>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Box sx={{ mb: 2 }}>
                            <InputLabel htmlFor="email" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }}>Email</InputLabel>
                            <TextField
                                fullWidth
                                type="email"
                                required
                                name='email'
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
                        <Box sx={{ mb: 3 }}>
                            <InputLabel htmlFor="password" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', color: '#373737' }} >Senha</InputLabel>
                            <TextField
                                fullWidth
                                type="password"
                                required
                                name='password'
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
                            Logar
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            color="secondary"
                            size="large"
                            onClick={() => router.push('/register')}
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
                            Criar conta
                        </Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
