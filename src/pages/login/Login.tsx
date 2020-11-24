import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm';

function Login() {
    const history = useHistory();
    const formInitValues = {email: "", password: "", confirmPassword: ""};
    const formValidation = {
        email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
        password: Yup.string()
                    .required("Password is required")
                    .min(6, "Password must be at least 6 characters")
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
        }
    ]

    function loginUser() {
        history.replace("/");
    }


    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value, formikBag) => {
                loginUser();
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <BaseForm 
                    title="MUNCH"
                    handleSubmit={formik.handleSubmit}
                    submitBtnLabel="LOGIN"
                    fields={formFields} />
            )}
        </Formik>
    );
}

export default Login;
