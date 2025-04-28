'use client'

import React, { useEffect, useState } from 'react'
import { useCompanyStore } from '@/store/company'
import { GenericTable } from '@/components/TableLayout'
import { Company, CompanyFormData } from '@/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import AddCompanyModal from '@/components/AddCompanyModal'
import { fetchCompaniesGetById } from '@/services/fetchCompanies'
import DeleteCompanyModal from '@/components/DeleteCompanyModal'
import { useRouter } from 'next/navigation'
import Typography from '@mui/material/Typography'
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
  const { fetchCompanies, companies } = useCompanyStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState<CompanyFormData | null>(null);
  const [companyId, setCompanyId] = useState<string | undefined>(" ");

  const router = useRouter();

  useEffect(() => {
    fetchCompanies()
  }, [])

  useEffect(() => {
    console.log(companies)
  }, [companies])

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
    fetchCompaniesGetById(id).then((response) => {
      const { id: companyId, name, website, cnpj } = response;
      setCompanyId(companyId);
      setEditData({ name, website, cnpj });
      setIsModalOpen(true);
    });
  };

  const handleDelete = (id: string) => {
    fetchCompaniesGetById(id).then((response) => {
      const { id: companyId, name, website, cnpj } = response;
      setCompanyId(companyId);
      setEditData({ name, website, cnpj });
      handleOpenDeleteModal();
    });
  };

  const handleEnter = (id: string) => {
    router.push(`/home/${id}`);
  }

  return (
    <div>
      <Header title='Minhas Empresas' isHome={true}/>
      <CenteredBox >
        {companies.length > 0 && (
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
              }}>
              Adicionar Empresa
            </Button>
          </Box>
        )}

        {companies.length ? (
          <GenericTable<Company>
            data={companies as Company[]}
            columns={[
              { key: 'name', label: 'Empresa' },
              { key: 'locations', label: 'Qt de Locais', render: (row) => row.locations.length },
            ]}
            onEdit={(row) => handleEdit(row.id)}
            onEnter={(row) => handleEnter(row.id)}
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
              Nenhuma empresa cadastrada!
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
              Adicionar empresa
            </Button>
          </Box>
        )}

        <AddCompanyModal
          open={isModalOpen}
          onClose={() => {
            handleCloseModal();
            setEditData(null);
          }}
          initialData={editData}
          companyId={companyId}
        />

        <DeleteCompanyModal
          open={isDeleteModalOpen}
          onClose={() => {
            handleCloseDeleteModal();
            setEditData(null);
          }}
          initialData={editData}
          companyId={companyId}
        />

      </CenteredBox>
    </div>
  )
}

export default page