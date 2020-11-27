import React, { useEffect, useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';
import BaseModal from '../../components/modal/BaseModal';
import CreateServiceForm from './CreateServiceForm';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getServiceByIdRequest, getServiceListRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';

interface Column {
  id: 'id' | 'name' | 'category' | 'providerUid' | 'location' | 'description' | 'rating' | 'editBtn' | 'deleteBtn';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  type?: 'button';
  buttonElem?: any;
  buttonOnClick?: any;
}

interface Data {
  id: string;
  name: string;
  category: string;
  providerUid: string;
  location: string;
  description: string;
  rating: number;
  editBtn: any;
  deleteBtn: any;
}


function ServiceTable() {
  const serviceList = useSelector((state: RootStateOrAny) => state.service.serviceList);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const dispatch = useDispatch();

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
  const handleOpenEditModal = (service: Service) => {
    setSelectedService(service);
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
    { id: 'id', label: 'Service ID', minWidth: 15 },
    { id: 'name', label: 'Service Name', minWidth: 15 },
    { id: 'category', label: 'Category', minWidth: 15 },
    { id: 'providerUid', label: 'Provider ID', minWidth: 15 },
    { id: 'location', label: 'Location', minWidth: 15 },
    { id: 'description', label: 'Description', minWidth: 15 },
    { id: 'rating', label: 'Rating', minWidth: 15 },
    { id: 'editBtn', label: '', align: 'right', minWidth: 5, type: 'button', buttonElem: BaseTableEditBtn(), buttonOnClick: handleOpenEditModal },
    { id: 'deleteBtn', label: '', minWidth: 5, type: 'button', buttonElem: BaseTableDeleteBtn(), buttonOnClick: handleOpenDeleteModal }
  ];
  
  useEffect(() => {
    dispatch(getServiceListRequest());
  }, []);

  return (
      <PageContainer>
        <BaseTable
          addBtnTitle="Add Service"
          columns={columns}
          rows={serviceList}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleOpenAddModal={handleOpenAddModal}/>

        <BaseModal
          title="Add Service"
          showModal={showAddModal}
          handleCloseModal={handleCloseAddModal}
          modalBody={CreateServiceForm({handleAddServiceSuccess, isNew: true})} />

        <BaseModal
          title="Edit Service"
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal} 
          modalBody={CreateServiceForm({handleAddServiceSuccess, isNew: false, selectedService})} />

        <BaseModal
          title="Delete Service"
          showModal={showDeleteModal}
          handleCloseModal={handleCloseDeleteModal} />
    </PageContainer>
  );
}

export default ServiceTable;
