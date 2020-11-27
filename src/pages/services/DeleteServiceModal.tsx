import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import BaseModal from '../../components/modal/BaseModal';
import { deleteServiceRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';

interface DeleteServiceModalProps {
    title: string;
    showModal: boolean;
    selectedService: Service | null;
    handleCloseModal: () => void;
}
function DeleteServiceModal(props: DeleteServiceModalProps) {
    const dispatch = useDispatch();
    const isServiceReqSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceReqSuccess);

    const deleteService = () => {
        if(props.selectedService) {
            dispatch(deleteServiceRequest(props.selectedService));
        }
    }

    const deleteServiceSuccess = () => {
        props.handleCloseModal();
    }

    useEffect(() => {
        if(isServiceReqSuccess) {
            deleteServiceSuccess();
        }
    }, [isServiceReqSuccess]);

    return (
        <BaseModal 
            confirmationModal={true}
            title="Delete Service"
            showModal={props.showModal}
            modalBody="Are you sure you want to delete this service?"
            handleSubmitModal={deleteService}
            handleCloseModal={props.handleCloseModal} />
    )
}

export default DeleteServiceModal;
