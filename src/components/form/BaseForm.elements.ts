import { ErrorMessage, Field, Form } from "formik";
import styled from "styled-components";
import { Button, theme } from "../../styles/global";

export const FormContainer = styled(Form)`
    margin: auto;
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.primaryDark};
    border-radius: 0.5rem;
`;

export const FormTitle = styled.h1`
    width: 100%;
    font-size: ${theme.fontXl};
    letter-spacing: 0.1em;
    text-align: center;
    color: #fff;
    margin: 1.5rem 0;
`;
export const StyledForm = styled(Form)`
    margin: 1.25rem;
    width: 83%;
`;

export const FieldWrapper = styled.div`
    width: 100%;
    margin: 1.5rem 0;
`;

export const StyledField = styled(Field)`
    padding: 1rem;
    width: 100%;
    border: none;
    border-radius: 0.25rem;
    font-size: ${theme.fontMd};
`;

export const StyledErrorMessage = styled(ErrorMessage)`
    color: #fff;
`;

export const FormBtnWrapper = styled.div`
    width: 100%;
    margin: 2.5rem 0;
`;

export const StyledFormBtn = styled(Button)`
    width: 100%;
`;