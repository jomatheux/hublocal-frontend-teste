import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Image from 'next/image'
import RegisterForm from '@/components/RegisterForm'

export default function RegisterPage() {
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
            alt="Imagem de Registro"
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
          <RegisterForm />
        </Box>
      </Grid>
    </Grid>
  )
}