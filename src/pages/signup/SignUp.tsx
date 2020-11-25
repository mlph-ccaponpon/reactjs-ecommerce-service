import { Formik } from 'formik';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm'
import { signUpRequest } from '../../store/actions/authActions';
import { Role, User } from '../../store/entities/User';

function SignUp() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const success = useSelector((state: RootStateOrAny) => state.auth.success);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.errorMessage);
    const dispatch = useDispatch();

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


    function signUpUser(user: User) {
        user.role = Role.CUSTOMER;
        dispatch(signUpRequest(user));
    }

    if(success) return (<Redirect to="/" />);

    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value, formikBag) => {
                signUpUser(value);
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <BaseForm 
                    title="Register"
                    handleSubmit={formik.handleSubmit}
                    submitBtnLabel="SIGN UP"
                    fields={formFields}
                    errorMessage={errorMessage}
                    isLoading={isLoading} />
            )}
        </Formik>
    )
}

export default SignUp;
