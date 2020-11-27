import React, { useEffect, useState } from 'react';
import { PageContainer } from '../../styles/global';
import BaseTable from '../../components/table/BaseTable';
import { BaseTableDeleteBtn, BaseTableEditBtn } from '../../components/table/BaseTableButtons';
import BaseModal from '../../components/modal/BaseModal';
import CreateServiceForm from './CreateServiceForm';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getServiceListRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';
import DeleteServiceModal from './DeleteServiceModal';

interface Column {
  id: 'id' | 'name' | 'category' | 'providerUid' | 'location' | 'imageUrl' | 'description' | 'rating' | 'editBtn' | 'deleteBtn';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
  type?: 'image' | 'button' | 'rating';
  buttonElem?: any;
  buttonOnClick?: any;
}

function ServiceTable() {
  const serviceList = useSelector((state: RootStateOrAny) => state.service.serviceList);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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
  const handleEditServiceSuccess = () => {
    handleCloseEditModal();
  };

  //Delete Modal
  const handleOpenDeleteModal = (service: Service) => {
    setSelectedService(service);
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
    { id: 'id', label: 'Service ID', minWidth: 100, maxWidth: 100 },
    { id: 'name', label: 'Service Name', minWidth: 70, maxWidth: 70 },
    { id: 'category', label: 'Category', minWidth: 50, maxWidth: 50 },
    { id: 'providerUid', label: 'Provider ID', minWidth: 100, maxWidth: 100 },
    { id: 'location', label: 'Location', minWidth: 50, maxWidth: 50 },
    { id: 'imageUrl', label: 'Thumbnail', type: 'image', minWidth: 60, maxWidth: 60 },
    { id: 'description', label: 'Description', minWidth: 70, maxWidth: 70 },
    { id: 'rating', label: 'Rating', type: 'rating', minWidth: 65, maxWidth: 65 },
    { id: 'editBtn', label: '', align: 'right', minWidth: 20, maxWidth: 20, type: 'button', buttonElem: BaseTableEditBtn(), buttonOnClick: handleOpenEditModal },
    { id: 'deleteBtn', label: '', align: 'left', minWidth: 40, maxWidth: 40, type: 'button', buttonElem: BaseTableDeleteBtn(), buttonOnClick: handleOpenDeleteModal }
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
          showModal={showAddModal}
          handleCloseModal={handleCloseAddModal}
          modalBody={CreateServiceForm({handleCreateServiceSuccess: handleAddServiceSuccess, isNew: true})} />

        <BaseModal
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal} 
          modalBody={CreateServiceForm({handleCreateServiceSuccess: handleEditServiceSuccess, isNew: false, selectedService})} />

        <DeleteServiceModal
          title="Delete Service"
          showModal={showDeleteModal}
          selectedService={selectedService}
          handleCloseModal={handleCloseDeleteModal} />
    </PageContainer>
  );
}

export default ServiceTable;
