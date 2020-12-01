import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm'
import { setAuthErrorMessage, signUpRequest } from '../../store/actions/authActions';
import {  User, GuestUserRoleOptions } from '../../store/entities/User';
import { PageContainer } from '../../styles/global';

function SignUp() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.authErrorMessage);
    const dispatch = useDispatch();

    const history = useHistory();
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
            options: GuestUserRoleOptions
        }
    ]


    function signUpUser(user: User) {
        dispatch(signUpRequest(user));
    }

    const loginUserSuccess = () => {
        dispatch(setAuthErrorMessage(""));
        history.replace("/");
    }

    useEffect(() => {
        if(isLoggedIn) {
            loginUserSuccess();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(setAuthErrorMessage(""));
    }, []);
    
    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value) => {
                signUpUser({...value, disabled: false});
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <PageContainer>
                    <BaseForm 
                        title="Register"
                        handleSubmit={formik.handleSubmit}
                        submitBtnLabel="SIGN UP"
                        fields={formFields}
                        errorMessage={errorMessage}
                        isLoading={isLoading} />
                </PageContainer>
            )}
        </Formik>
    )
}

export default SignUp;
