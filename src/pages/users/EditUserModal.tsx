import { Formik } from 'formik';
import React from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useSelector } from 'react-redux';

function EditUserModal() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.errorMessage);
    const formInitValues = {name:"", email: ""};
    const formValidation = {
        name: Yup.string()
                .required("Name is required"),
        email: Yup.string()
                .required("Email is required")
                .email("Email is invalid")
    };
    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Name"
        },
        {
            name: "email",
            type: "email",
            placeholder: "Email Address"
        }
    ];

    return (
        <Formik
        initialValues = {formInitValues}
        onSubmit = {(value, formikBag) => {
            console.log("Add");
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

export default EditUserModal;
