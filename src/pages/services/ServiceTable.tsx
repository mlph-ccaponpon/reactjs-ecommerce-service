import React, { useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable, { TableRowBtn } from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';
import BaseModal from '../../components/modal/BaseModal';
import AddServiceForm from './AddServiceForm';

interface Column {
  id: 'name' | 'category' | 'provider' | 'location' | 'description' | 'rating' | 'editBtn' | 'deleteBtn';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  type?: 'button';
}

interface Data {
  name: string;
  category: string;
  provider: string;
  location: string;
  description: string;
  rating: number;
  editBtn: any;
  deleteBtn: any;
}


function ServiceTable() {
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
  const handleAddServiceSuccess = () => {
      handleCloseAddModal();
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
    { id: 'name', label: 'Service Name', minWidth: 15 },
    { id: 'category', label: 'Category', minWidth: 15 },
    { id: 'provider', label: 'Provider', minWidth: 15 },
    { id: 'location', label: 'Location', minWidth: 15 },
    { id: 'description', label: 'Description', minWidth: 15 },
    { id: 'rating', label: 'Rating', minWidth: 15 },
    { id: 'editBtn', label: '', align: 'right', minWidth: 5, type: 'button' },
    { id: 'deleteBtn', label: '', minWidth: 5, type: 'button' }
  ];


  const createData = (name: string, category: string, provider: string, location:string, description: string, rating: number): Data => {
    const editBtn : TableRowBtn = {rowBtn: BaseTableEditBtn(), handleRowBtnClick: handleOpenEditModal};
    const deleteBtn : TableRowBtn = {rowBtn: BaseTableDeleteBtn(), handleRowBtnClick: handleOpenDeleteModal};

    return { name, category, provider, location, description, rating, editBtn, deleteBtn };
  }

  // TODO: Get Services Data from firestore
  const rows = [
    createData('Service 1', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 1.', 3.3),
    createData('Service 2', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 2.', 4.3),
    createData('Service 3', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 3.', 2.3),
    createData('Service 4', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 4.', 4.2),
    createData('Service 5', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 5.', 3),
    createData('Service 6', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 6.', 3),
    createData('Service 7', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 7.', 2.5),
    createData('Service 8', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 8.', 3.7),
    createData('Service 9', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 9.', 3.8),
    createData('Service 10', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 10.', 2.5),
    createData('Service 11', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 11.', 4.3),
    createData('Service 12', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 12.', 1.3),
    createData('Service 13', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 13.', 3.4),
    createData('Service 14', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 14.', 3.5),
    createData('Service 15', 'Food', 'Chin Caponpon', 'Sto. Tomas, Batangas', 'Your service 15.', 3.6),
  ];

  return (
      <PageContainer>
        <BaseTable
          addBtnTitle="Add Service"
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleOpenAddModal={handleOpenAddModal}/>

        <BaseModal
          title="Add Service"
          showModal={showAddModal}
          handleCloseModal={handleCloseAddModal}
          modalBody={AddServiceForm({handleAddServiceSuccess})} />

        <BaseModal
          title="Edit Service"
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal} />

        <BaseModal
          title="Delete Service"
          showModal={showDeleteModal}
          handleCloseModal={handleCloseDeleteModal} />
    </PageContainer>
  );
}

export default ServiceTable;
