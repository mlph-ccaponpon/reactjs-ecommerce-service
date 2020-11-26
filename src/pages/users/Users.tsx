import React, { useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable, { TableRowBtn } from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';
import BaseModal from '../../components/modal/BaseModal';

interface Column {
  id: 'id' | 'name' | 'email' | 'role' | 'editBtn' | 'deleteBtn';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  type?: 'button';
}

interface Data {
  id: string;
  name: string;
  email: string;
  role: string;
  editBtn: any;
  deleteBtn: any;
}


function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Add Modal
  const handleOpenAddModal = () => {
      setShowAddModal(true);
  };
  const handleCloseAddModal = () => {
      setShowAddModal(false);
  };

  //Edit Modal
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  //Delete Modal
  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Table Pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Table Init
  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 25 },
    { id: 'name', label: 'Name', minWidth: 25 },
    { id: 'email', label: 'Email', minWidth: 25 },
    { id: 'role', label: 'Role', minWidth: 15 },
    { id: 'editBtn', label: '', align: 'right', minWidth: 5, type: 'button' },
    { id: 'deleteBtn', label: '', minWidth: 5, type: 'button' }
  ];


  const createData = (id: string, name: string, email: string, role: string): Data => {
    const editBtn : TableRowBtn = {rowBtn: BaseTableEditBtn(), handleRowBtnClick: handleOpenEditModal};
    const deleteBtn : TableRowBtn = {rowBtn: BaseTableDeleteBtn(), handleRowBtnClick: handleOpenDeleteModal};

    return { id, name, email, role, editBtn, deleteBtn };
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

  return (
      <PageContainer>
        <BaseTable
          addBtnTitle="Add User"
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleOpenAddModal={handleOpenAddModal}/>

        <BaseModal
          title="Add User"
          showModal={showAddModal}
          handleCloseModal={handleCloseAddModal} />

        <BaseModal
          title="Edit User"
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal} />

        <BaseModal
          title="Delete User"
          showModal={showDeleteModal}
          handleCloseModal={handleCloseDeleteModal} />
    </PageContainer>
  );
}

export default Users;
