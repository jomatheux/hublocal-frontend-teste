'use client'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Image from 'next/image'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <Grid container sx={{ minHeight: '100vh' }} spacing={2}>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            height: '100%',
            position: 'relative',
          }}
        >
          <Image
            src="/Mask group.svg"
            alt="Imagem de login"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ width: '100%', maxWidth: 400, p: 4 }}>
          <LoginForm />
        </Box>
      </Grid>

    </Grid>
  )
}