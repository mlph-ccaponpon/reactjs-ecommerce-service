import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BaseForm from '../../components/form/BaseForm';
import { loginRequest, setErrorMessage } from '../../store/actions/authActions';
import { UserCredential } from '../../store/entities/UserCredential';

function Login() {
    const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
    const errorMessage = useSelector((state: RootStateOrAny) => state.auth.errorMessage);
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
        dispatch(setErrorMessage(""));
        history.replace("/");
    }

    useEffect(() => {
        if(isLoggedIn) {
            loginUserSuccess();
        }
    }, [isLoggedIn])

    return (
        <Formik
            initialValues = {formInitValues}
            onSubmit = {(value, formikBag) => {
                loginUser(value);
            }}
            validationSchema = {Yup.object(formValidation)}>

            {(formik) => (
                <BaseForm 
                    title="MUNCH"
                    handleSubmit={formik.handleSubmit}
                    submitBtnLabel="LOGIN"
                    fields={formFields}
                    errorMessage={errorMessage}
                    isLoading={isLoading}  />
            )}
        </Formik>
    );
}

export default Login;
