import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm';
import { loginRequest, setAuthErrorMessage } from '../../store/actions/authActions';
import { UserCredential } from '../../store/entities/UserCredential';
import { PageContainer } from '../../styles/global';

function Login() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.authErrorMessage);
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const history = useHistory();
    const formInitValues = {email: "", password: "", confirmPassword: ""};
    const formValidation = {
        email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
        password: Yup.string()
                    .required("Password is required")
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

    const loginUser = (userCredential: UserCredential) => {
        dispatch(loginRequest(userCredential));
    }

    const loginUserSuccess = () => {
        dispatch(setAuthErrorMessage(""));
        history.replace("/");
    }

    useEffect(() => {
        console.log(isLoggedIn);
        if(isLoggedIn) {
            loginUserSuccess();
        }
    }, [isLoggedIn])


    useEffect(() => {
        dispatch(setAuthErrorMessage(""));
    }, [])

    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value, formikBag) => {
                loginUser(value);
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <PageContainer>
                    <BaseForm 
                        title="MUNCH"
                        handleSubmit={formik.handleSubmit}
                        submitBtnLabel="LOGIN"
                        fields={formFields}
                        errorMessage={errorMessage}
                        isLoading={isLoading}  />
                </PageContainer>
            )}
        </Formik>
    );
}

export default Login;
