'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchLocationsDelete } from '@/services/fetchLocations';
import { useLocationStore } from '@/store/location';
import { LocationFormData } from '@/types';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    overflow: 'hidden',
};

const headerStyle = {
    backgroundColor: '#FF0000',
    color: '#fff',
    paddingX: '32px',
    paddingY: '9px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWidth: 700,
};

const DeleteLocationModal: React.FC<{ open: boolean; onClose: () => void; initialData?: LocationFormData | null; locationId?: string, companyId?: string }> = ({ open, onClose, initialData, locationId, companyId }) => {
    const { fetchLocations } = useLocationStore();

    const handleDelete = async () => {
        try {
            if (locationId) {
                console.log(companyId);
                await fetchLocationsDelete(companyId || '', locationId);
                await fetchLocations(companyId || '');
            }
        } catch (error) {
            console.error('Error deleting location:', error);
        } finally {
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                maxWidth: '120vw',
                maxHeight: '120vh',
            }}
        >
            <Box sx={modalStyle}>
                <Box sx={headerStyle}>
                    <h2 style={{ margin: 0, fontFamily: 'Poppins, sans-serif', color: '#fff', fontWeight: 'bold' }}>Confirmar exclusão</h2>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: '64px', paddingX: '32px', paddingTop: '16px' }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', color: '#373737' }}>O local <span style={{ fontWeight: 'bold' }}>{initialData?.name}</span> será excluido. Tem certeza dessa ação?</p>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: '16px', paddingX: '32px' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{
                            backgroundColor: '#FF0000',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                            '&:hover': {
                                backgroundColor: '#cc0000',
                            },
                        }}
                    >
                        Excluir
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteLocationModal;
