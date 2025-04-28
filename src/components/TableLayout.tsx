'use client';

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Box, Typography, Select, MenuItem, Button, SelectChangeEvent,
  ButtonGroup
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mdi/react';
import { mdiOfficeBuildingMarker } from '@mdi/js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  title?: string;
  onEnter?: (row: T) => void;
  rowsPerPageOptions?: number[];
};

export function GenericTable<T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onEnter,
  title,
  rowsPerPageOptions = [5, 10, 25],
}: Props<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, borderRadius: 3 }}>
      {title && (
        <Box p={2}>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>
            {title}
          </Typography>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
                  {col.label}
                </TableCell>
              ))}
              {(onEdit || onDelete || onEnter) && (
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Ações</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)} sx={{ fontFamily: 'Poppins' }}>
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </TableCell>
                ))}
                {(onEdit || onDelete || onEnter) && (
                  <TableCell>
                    {onEdit && (
                      <IconButton onClick={() => onEdit(row)}>
                        <EditIcon sx={{ color: 'black', '&:hover': { color: '#007BFF' } }} />
                      </IconButton>
                    )}
                    {onEnter && (
                      <IconButton onClick={() => onEnter(row)}>
                        <Icon path={mdiOfficeBuildingMarker} size={1} color="black" />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton onClick={() => onDelete(row)}>
                        <DeleteIcon sx={{ color: 'red', '&:hover': { color: 'black' } }} />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} >
        <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1} >
          <Box borderRight="1px solid #ccc">
            <Typography sx={{ fontFamily: 'Poppins', paddingY: 1, paddingX: 3 }}>
              Página: {page + 1}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography sx={{ fontFamily: 'Poppins', paddingLeft: 3 }}>
              Qt por página:
            </Typography>

            <Select

              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              IconComponent={ExpandMoreIcon}
              size="small"
              sx={{
                fontFamily: 'Poppins',
                border: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSelect-select': {
                  paddingRight: '20px',
                  '&:focus': {
                    backgroundColor: 'transparent',
                  },
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 150,
                  },
                },
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <ButtonGroup size='small' sx={{ mr: 2, backgroundColor: '#E4E4E4' } }>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              sx={{
                fontFamily: 'Poppins',
                textTransform: 'none',
                backgroundColor: "#D9D9D9",
                color: '#5C5C5C',
                borderColor: 'none',
                '&:hover': {
                  borderColor: '#1c64d1',
                  backgroundColor: '#f0f7ff',
                },
                '&.Mui-disabled': {
                  backgroundColor: "#D9D9D9",
                  color: '#5C5C5C',
                },
              }}
            >
              Anterior
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              sx={{
                backgroundColor: '#2F80ED',
                fontFamily: 'Poppins',
                textTransform: 'none',
                border: 'none',
                '&:hover': {
                  backgroundColor: '#1c64d1',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
              Próxima
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}
