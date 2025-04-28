'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { GenericTable } from '@/components/TableLayout'
import { LocationFormData, Location } from '@/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import DeleteCompanyModal from '@/components/DeleteCompanyModal'
import AddLocationModal from '@/components/AddLocationModal'
import { fetchLocationsGetById } from '@/services/fetchLocations'
import { useLocationStore } from '@/store/location'
import DeleteLocationModal from '@/components/DeleteLocationModal'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { useCompanyStore } from '@/store/company'
import Header from '@/components/Header'

const CenteredBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    gap: 20px;
    max-width: 1200px;
    padding: 20px;
    width: 100%;
    margin: 0 auto;
    font-family: 'Poppins';
  `

const page = () => {
  const { companyId } = useParams();
  const { fetchLocations, locations } = useLocationStore();
  const { fetchCompany, company } = useCompanyStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState<LocationFormData | null>(null);
  const [locationId, setLocationId] = useState<string | undefined>(" ");

  const router = useRouter();

  useEffect(() => {
    if (typeof companyId === 'string') {
      fetchLocations(companyId || '');
      fetchCompany(companyId);
    }
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id: string) => {
    if (typeof companyId === 'string') {
      setLocationId(id);
      fetchLocationsGetById(companyId, id).then((response) => {
        const {
          id,
          name,
          cep,
          street,
          number,
          district,
          city,
          state,
          companyId,
        } = response;
        setEditData({
          name,
          cep,
          street,
          number,
          district,
          city,
          state,
          companyId,
        });
        setIsModalOpen(true);
      });
    }
  };

  const handleDelete = (id: string) => {
    if (typeof companyId === 'string') {
      setLocationId(id);
      fetchLocationsGetById(companyId, id).then((response) => {
        const {
          id,
          name,
          cep,
          street,
          number,
          district,
          city,
          state,
          companyId,
        } = response;
        setEditData({
          name,
          cep,
          street,
          number,
          district,
          city,
          state,
          companyId,
        });
        handleOpenDeleteModal();
      });
    }
  };

  return (
    <div>
      <Header title={company?.name} />
      <CenteredBox>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            marginTop: '80px',
            marginLeft: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/home')}
        >
          <ArrowBackIcon />
          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
            Minhas Empresas
          </Typography>
        </Box>

        {locations.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
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
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                backgroundColor: '#007BFF',
              }}
            >
              Adicionar Local
            </Button>
          </Box>
        )}

        {locations.length > 0 ? (
          <GenericTable
            data={locations as Location[]}
            columns={[{ key: 'name', label: 'Local' }]}
            onEdit={(row) => handleEdit(row.id)}
            onDelete={(row) => handleDelete(row.id)}
          />

        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              width: '100%',
              maxWidth: 600,
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
              Nenhum local cadastrado!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
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
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                backgroundColor: '#007BFF',
                padding: '10px 20px',
              }}
            >
              Adicionar Local
            </Button>
          </Box>
        )}

        <AddLocationModal
          open={isModalOpen}
          onClose={() => {
            handleCloseModal();
            setEditData(null);
          }}
          initialData={editData}
          companyId={typeof companyId === 'string' ? companyId : ''}
          locationId={locationId}
        />

        <DeleteLocationModal
          open={isDeleteModalOpen}
          onClose={
            () => {
              handleCloseDeleteModal();
              setEditData(null);
            }
          }
          initialData={editData}
          companyId={typeof companyId === 'string' ? companyId : ''}
          locationId={locationId}
        />
      </CenteredBox>
    </div>
  );
};

export default page

