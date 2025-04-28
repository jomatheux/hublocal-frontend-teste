"use client";

import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation'
import { title } from 'process';

const HeaderProps = {
  title: 'Minhas Empresas',
}

interface HeaderProps {
  title?: string | undefined;
  isHome?: boolean;
}

const Header = ({ title, isHome = false }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElTwo, setAnchorElTwo] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openTwo = Boolean(anchorElTwo);
  const router = useRouter();
  const username = sessionStorage.getItem('username');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleClickTwo = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTwo(event.currentTarget);
  };

  const handleCloseTwo = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElTwo(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#fff',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        height: '60px',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
        {isHome ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#000', height: '100%', width: '20%', pl: 2 }}
          >
            <BusinessIcon sx={{ mr: 1 }} onClick={() => router.push('/home')} />
            <Typography
              variant="h6"
              component="div"
              onClick={() => router.push('/home')}
              sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif', color: '#000', fontWeight: 'bold' }}
            >
              {title}
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleClickTwo}
            sx={{ cursor: 'pointer', fontFamily: 'Poppins, sans-serif', backgroundColor: '#EAEAEA', color: '#000', height: '100%', width: '15%', pl: 2 }}
          >
            <BusinessIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'Poppins, sans-serif',
                color: '#000',
                fontWeight: 'bold',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {title && title.length > 20 ? `${title.slice(0, 17)}...` : title || ''}
            </Typography>
            <ExpandMoreIcon sx={{ mr: 2 }} />
          </Box>
        )}

        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer', fontFamily: 'Poppins, sans-serif', backgroundColor: '#EAEAEA', color: '#000', height: '100%' }}
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" sx={{ ml: 2, mr: 1 }} />
          <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {username}
          </Typography>
          <ExpandMoreIcon sx={{ mr: 2 }} />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem sx={{ fontFamily: 'Poppins' }}>{username}</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ fontFamily: 'Poppins' }}>Sair</MenuItem>
        </Menu>

        <Menu
          anchorEl={anchorElTwo}
          open={openTwo}
          onClose={handleCloseTwo}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => router.push('/home')} sx={{ fontFamily: 'Poppins' }}>Ir para home</MenuItem>
        </Menu>
      </Box>
    </AppBar>

  );
};

export default Header;