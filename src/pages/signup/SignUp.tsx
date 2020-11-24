import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm'

function SignUp() {
    const history = useHistory();
    const formInitValues = {email: "", password: "", confirmPassword: ""};
    const formValidation = {
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
        }
    ]

    function signUpUser() {
        history.replace("/");
    }


    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value, formikBag) => {
                signUpUser();
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <BaseForm 
                    handleSubmit={formik.handleSubmit}
                    submitBtnLabel="SIGN UP"
                    fields={formFields} />
            )}
        </Formik>
    )
}

export default SignUp;
