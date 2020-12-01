import { Formik } from 'formik';
import React, { useEffect } from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { AdminUserRoleOptions, User } from '../../store/entities/User';
import { updateUserRequest } from '../../store/actions/userActions';

interface EditUserFormProps {
    handleEditUserSuccess: () => void;
    selectedUser: User | null;
}

function EditUserForm(props: EditUserFormProps) {
    const isLoading = useSelector((state: RootStateOrAny) => state.user.isUserLoading);
    const isUserReqSuccess = useSelector((state: RootStateOrAny) => state.user.isUserReqSuccess);
    const errorMessage = useSelector((state: RootStateOrAny) => state.user.userErrorMessage);
    const dispatch = useDispatch();

    let formInitValues = {name: "", role: ""};
    if(props.selectedUser != null) {
        formInitValues = {name: props.selectedUser.name, role: props.selectedUser.role ? props.selectedUser.role:""};
    }

    const formValidation = {
        name: Yup.string()
                .required("Name is required"),
        role: Yup.string()
                .required("Role is required")
    };
    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Name"
        },
        {
            name: "role",
            type: "select",
            placeholder: "Role",
            options: AdminUserRoleOptions
        }
    ];

    const createUser = (userUpdate: User) => {
        if(props.selectedUser != null) {
            userUpdate = {...props.selectedUser, ...userUpdate};
            dispatch(updateUserRequest(userUpdate));
        }
    } 

    const createUserSuccess = () => {
        props.handleEditUserSuccess();
    }

    useEffect(() => {
        if(isUserReqSuccess) {
            createUserSuccess();
        }
    }, [isUserReqSuccess]);

    return (
        <Formik
        initialValues = {formInitValues}
        onSubmit = {(value) => {
            createUser({...value, disabled: false});
        }}
        validationSchema = {Yup.object(formValidation)}>

        {(formik) => (
            <BaseForm 
                isModal={true}
                title="EDIT USER"
                handleSubmit={formik.handleSubmit}
                submitBtnLabel="SUBMIT"
                fields={formFields}
                errorMessage={errorMessage}
                isLoading={isLoading} />
        )}
    </Formik>
    )
}

export default EditUserForm;
