import React, { useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';

interface Column {
  id: 'name' | 'category' | 'provider' | 'description' | 'rating' | 'buttons' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Service\u00a0Name', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'provider', label: 'Provider\u00a0Name', minWidth: 170 },
  { id: 'description', label: 'Description',  minWidth: 170 },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    format: (value: number) => value.toFixed(1),
  },
  { id: 'buttons', label: '', minWidth: 170 },
];

interface Data {
  name: string;
  category: string;
  provider: string;
  description: string;
  rating: number;
  buttons: any
}

function createData(name: string, category: string, provider: string, description: string, rating: number): Data {
  const buttons = [BaseTableEditBtn(), BaseTableDeleteBtn()];
  return { name, category, provider, description, rating, buttons };
}

// TODO: Get Services Data from firestore
const rows = [
  createData('Service 1', 'Food', 'Chin Caponpon', 'Your service 1.', 3.3),
  createData('Service 2', 'Food', 'Chin Caponpon', 'Your service 2.', 4.3),
  createData('Service 3', 'Food', 'Chin Caponpon', 'Your service 3.', 2.3),
  createData('Service 4', 'Food', 'Chin Caponpon', 'Your service 4.', 4.2),
  createData('Service 5', 'Food', 'Chin Caponpon', 'Your service 5.', 3),
  createData('Service 6', 'Food', 'Chin Caponpon', 'Your service 6.', 3),
  createData('Service 7', 'Food', 'Chin Caponpon', 'Your service 7.', 2.5),
  createData('Service 8', 'Food', 'Chin Caponpon', 'Your service 8.', 3.7),
  createData('Service 9', 'Food', 'Chin Caponpon', 'Your service 9.', 3.8),
  createData('Service 10', 'Food', 'Chin Caponpon', 'Your service 10.', 2.5),
  createData('Service 11', 'Food', 'Chin Caponpon', 'Your service 11.', 4.3),
  createData('Service 12', 'Food', 'Chin Caponpon', 'Your service 12.', 1.3),
  createData('Service 13', 'Food', 'Chin Caponpon', 'Your service 13.', 3.4),
  createData('Service 14', 'Food', 'Chin Caponpon', 'Your service 14.', 3.5),
  createData('Service 15', 'Food', 'Chin Caponpon', 'Your service 15.', 3.6),
];

function Services() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <PageContainer>
        <BaseTable
          addBtnTitle="Add Service"
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}/>
    </PageContainer>
  );
}

export default Services;
