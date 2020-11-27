import { Formik } from 'formik';
import React from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AdminUserRoleOptions } from '../../store/entities/User';

function AddUserForm() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.authErrorMessage);
    const formInitValues = {name:"", email: "", password: "", confirmPassword: ""};
    const formValidation = {
        name: Yup.string()
                .required("Name is required"),
        email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
        password: Yup.string()
                    .required("Password is required")
                    .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
                    .required("Confirm Password is required")
                    .oneOf([Yup.ref('password'), ""], "Passwords do not match")
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
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password"
        },
        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password"
        },
        {
            name: "role",
            type: "select",
            placeholder: "Role",
            options: AdminUserRoleOptions
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
                title="ADD USER"
                handleSubmit={formik.handleSubmit}
                submitBtnLabel="SUBMIT"
                fields={formFields}
                errorMessage={errorMessage}
                isLoading={isLoading} />
        )}
    </Formik>
    )
}

export default AddUserForm;
