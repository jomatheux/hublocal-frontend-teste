'use client'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCompaniesPost, fetchCompaniesPut } from '@/services/fetchCompanies';
import { CompanyFormData } from '@/types';
import { useCompanyStore } from '@/store/company';
import InputLabel from '@mui/material/InputLabel';
import { cnpjMask } from '@/utils/masks';
import { isValidCNPJ } from '@/utils/masks';

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
    fontWidth: 700,
};

const AddCompanyModal: React.FC<{ open: boolean; onClose: () => void, initialData?: CompanyFormData | null; companyId?: string }> = ({ open, onClose, initialData, companyId }) => {
    const { fetchCompanies } = useCompanyStore();

    const [data, setData] = useState<CompanyFormData>({
        name: '',
        website: '',
        cnpj: '',
    });
    const [isCNPJValid, setIsCNPJValid] = useState(false);
    const handleCompany = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (initialData) {
                await fetchCompaniesPut(companyId || '', data);
            } else {
                await fetchCompaniesPost(data);
            }
            await fetchCompanies();
        } catch (error) {
            console.error('Erro ao adicionar empresa:', error);
        } finally {
            onClose();
        }
    };

    useEffect(() => {
        if (open) {
            if (initialData) {
                setData(initialData);
                setIsCNPJValid(isValidCNPJ(initialData.cnpj));
            } else {
                setData({ name: '', website: '', cnpj: '' });
                setIsCNPJValid(false);
            }
        }
    }, [open, initialData]);

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
            <Box component="form" onSubmit={handleCompany} sx={modalStyle}>
                <Box sx={headerStyle}>
                    <h2 style={{ margin: 0, fontFamily: 'Poppins, sans-serif', color: '#fff', fontWeight: 'bold' }}>{initialData ? `Editar: ${initialData.name}` : 'Adicionar'}</h2>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, mt: 2, marginX: '32px' }}>
                        <InputLabel htmlFor="name" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#373737', alignSelf: 'flex-start' }} >Nome</InputLabel>
                        <TextField
                            variant="outlined"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            sx={{
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
                                borderColor: '#007BFF',
                                borderRadius: '4px',
                                borderWidth: 2,
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2, paddingBottom: '100px', borderBottom: '1px solid #ccc', flexDirection: 'row', }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginX: '32px' }}>
                            <InputLabel htmlFor="website" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#373737', alignSelf: 'flex-start' }} >Website</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={data.website}
                                onChange={(e) => setData({ ...data, website: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginX: '32px' }}>
                            <InputLabel htmlFor="cnpj" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#373737', alignSelf: 'flex-start' }} >CNPJ</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={cnpjMask(data.cnpj)}
                                onChange={(e) => {
                                    const cnpj = cnpjMask(e.target.value);
                                    setData({ ...data, cnpj });
                                    setIsCNPJValid(isValidCNPJ(cnpj));
                                }}
                                error={!isCNPJValid}
                                helperText={!isCNPJValid ? 'CNPJ deve ter 14 dígitos' : ''}
                                sx={{
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
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', marginRight: '32px', marginBottom: '16px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!data.name || !data.website || !data.cnpj || !isCNPJValid}
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
            </Box>
        </Modal>
    );
};

export default AddCompanyModal;
