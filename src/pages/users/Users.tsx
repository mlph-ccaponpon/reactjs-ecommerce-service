import React, { useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';

interface Column {
  id: 'uid' | 'name' | 'email' | 'role' | 'buttons' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'uid', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'buttons', label: '', minWidth: 170 }
];

interface Data {
  uid: string;
  name: string;
  email: string;
  role: string;
  buttons: any
}

function createData(uid: string, name: string, email: string, role: string): Data {
  const buttons = [BaseTableEditBtn(), BaseTableDeleteBtn()];
  return { uid, name, email, role, buttons };
}

// TODO: Get Services Data from firestore
const rows = [
  createData('ABJSADUBJHBCC1', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC2', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC3', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC4', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC5', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC6', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC7', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC8', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC9', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC10', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC11', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC12', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC13', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC14', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
  createData('ABJSADUBJHBCC15', 'Chernhelyn Caponpon', 'chernhelyn@gmail.com', 'CUSTOMER'),
];

function Users() {
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
          addBtnTitle="Add User"
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}/>
    </PageContainer>
  );
}

export default Users;
