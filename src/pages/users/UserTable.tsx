import React, { useEffect, useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';
import BaseModal from '../../components/modal/BaseModal';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { User } from '../../store/entities/User';
import { getUserListRequest } from '../../store/actions/userActions';
import DeleteUserModal from './DeleteUserModal';

interface Column {
  id: 'id' | 'name' | 'email' | 'role' | 'editBtn' | 'deleteBtn';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
  type?: 'button';
  buttonElem?: any;
  buttonOnClick?: any;
}


function UserTable() {
  const userList = useSelector((state: RootStateOrAny) => state.user.userList);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleEditUserSuccess = () => {
    handleCloseEditModal();
  };

  //Delete Modal
  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
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
    { id: 'id', label: 'ID', minWidth: 80, maxWidth: 80 },
    { id: 'name', label: 'Name', minWidth: 80, maxWidth: 80 },
    { id: 'email', label: 'Email', minWidth: 50, maxWidth: 50 },
    { id: 'role', label: 'Role', minWidth: 50, maxWidth: 50 },
    { id: 'editBtn', label: '', align: 'right', minWidth: 20, maxWidth: 20, type: 'button', buttonElem: BaseTableEditBtn(), buttonOnClick: handleOpenEditModal },
    { id: 'deleteBtn', label: '', align: 'left', minWidth: 40, maxWidth: 40, type: 'button', buttonElem: BaseTableDeleteBtn(), buttonOnClick: handleOpenDeleteModal }
  ];

  useEffect(() => {
    dispatch(getUserListRequest());
  }, []);

  return (
      <PageContainer>
        <BaseTable
          addBtnTitle="Add User"
          columns={columns}
          rows={userList}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleOpenAddModal={handleOpenAddModal}/>

        <BaseModal
          showModal={showAddModal}
          handleCloseModal={handleCloseAddModal}
          modalBody={AddUserForm()} />

        <BaseModal
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal} 
          modalBody={EditUserForm({handleEditUserSuccess, selectedUser})}/>

        <BaseModal
          showModal={showDeleteModal}
          handleCloseModal={handleCloseDeleteModal} />

        <DeleteUserModal
          title="Delete User"
          showModal={showDeleteModal}
          selectedUser={selectedUser}
          handleCloseModal={handleCloseDeleteModal} />
    </PageContainer>
  );
}

export default UserTable;
