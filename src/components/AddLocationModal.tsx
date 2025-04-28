'use client'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { fetchLocationsPost, fetchLocationsPut } from '@/services/fetchLocations';
import { LocationFormData } from '@/types';
import { useLocationStore } from '@/store/location';
import { cepMask, isValidCEP, onlyNumbers } from '@/utils/masks';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    overflow: 'hidden',
};

const headerStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    paddingX: '32px',
    paddingY: '9px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 700,
};

const AddLocationModal: React.FC<{
    open: boolean;
    onClose: () => void;
    initialData?: LocationFormData | null;
    companyId: string;
    locationId?: string;
}> = ({ open, onClose, initialData, companyId, locationId }) => {
    const { fetchLocations } = useLocationStore();

    const [data, setData] = useState<LocationFormData>({
        name: '',
        cep: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        companyId: '',
    });

    useEffect(() => {
        if (open) {
            if (initialData) {
                setData(initialData);
            } else {
                setData({
                    name: '',
                    cep: '',
                    street: '',
                    number: '',
                    district: '',
                    city: '',
                    state: '',
                    companyId: '',
                });
            }
        }
    }, [open, initialData]);

    const handleLocation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        console.log(initialData);

        try {
            if (initialData) {
                await fetchLocationsPut(companyId, locationId || '', data);
            } else {
                await fetchLocationsPost(data, companyId);
            }
            await fetchLocations(companyId);
        } catch (error) {
            console.error('Error while saving location:', error);
        } finally {
            onClose();
        }
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#007BFF',
            },
            '&:hover fieldset': {
                borderColor: '#007BFF',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#007BFF',
            },
        },
    };

    const handleChange = (field: keyof LocationFormData, value: string) => {
        if (field === 'cep') {
            const maskedCep = cepMask(value);
            setData((prev) => ({ ...prev, cep: maskedCep }));
        } 
        else if (field === 'number') {
            const numericValue = onlyNumbers(value);
            setData((prev) => ({ ...prev, number: numericValue }));
        }
        else {
            setData((prev) => ({ ...prev, [field]: value }));
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="location-modal-title"
            aria-describedby="location-modal-description"
            sx={{
                maxWidth: '120vw',
                maxHeight: '120vh',
            }}
        >
            <Box component="form" onSubmit={handleLocation} sx={modalStyle}>
                <Box sx={headerStyle}>
                    <h2 style={{ margin: 0, fontFamily: 'Poppins, sans-serif', color: '#fff', fontWeight: 'bold' }}>
                        {initialData ? `Editar: ${initialData.name}` : 'Adicionar Local'}
                    </h2>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, borderBottom: '1px solid #ccc' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                        <InputLabel htmlFor="name" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#373737' }}>
                            Name
                        </InputLabel>
                        <TextField
                            id="name"
                            variant="outlined"
                            fullWidth
                            value={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            sx={inputStyle}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {[ 
                            { label: 'CEP', field: 'cep' },
                            { label: 'Rua', field: 'street' },
                            { label: 'Número', field: 'number' },
                            { label: 'Bairro', field: 'district' },
                            { label: 'Cidade', field: 'city' },
                            { label: 'Estado', field: 'state' },
                        ].map(({ label, field }) => (
                            <Box key={field} sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 45%' }}>
                                <InputLabel htmlFor={field} sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#373737' }}>
                                    {label}
                                </InputLabel>
                                <TextField
                                    id={field}
                                    variant="outlined"
                                    fullWidth
                                    value={(data as any)[field]}
                                    onChange={(e) => handleChange(field as keyof LocationFormData, e.target.value)}
                                    sx={inputStyle}
                                    error={field === 'cep' && !!data.cep && !isValidCEP(data.cep)}
                                    helperText={field === 'cep' && !!data.cep && !isValidCEP(data.cep) ? 'CEP deve ter 8 dígitos' : ''}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!data.name || !data.cep || !data.street || !data.number || !data.district || !data.city || !data.state || !isValidCEP(data.cep)}
                        sx={{
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                        }}
                    >
                        {initialData ? 'Salvar' : 'Adicionar'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddLocationModal;