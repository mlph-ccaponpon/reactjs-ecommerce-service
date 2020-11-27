import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import BaseModal from '../../components/modal/BaseModal';
import { deleteUserRequest } from '../../store/actions/userActions';
import { User } from '../../store/entities/User';

interface DeleteUserModalProps {
    title: string;
    showModal: boolean;
    selectedUser: User | null;
    handleCloseModal: () => void;
}
function DeleteUserModal(props: DeleteUserModalProps) {
    const dispatch = useDispatch();
    const isUserReqSuccess = useSelector((state: RootStateOrAny) => state.user.isUserReqSuccess);

    const deleteUser = () => {
        if(props.selectedUser) {
            dispatch(deleteUserRequest(props.selectedUser));
        }
    }

    const deleteUserSuccess = () => {
        props.handleCloseModal();
    }

    useEffect(() => {
        if(isUserReqSuccess) {
            deleteUserSuccess();
        }
    }, [isUserReqSuccess]);

    return (
        <BaseModal 
            confirmationModal={true}
            title="Delete User"
            showModal={props.showModal}
            modalBody="Are you sure you want to delete this user?"
            handleSubmitModal={deleteUser}
            handleCloseModal={props.handleCloseModal} />
    )
}

export default DeleteUserModal;
