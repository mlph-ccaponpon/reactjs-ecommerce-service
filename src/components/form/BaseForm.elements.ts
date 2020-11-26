import { Field, Form } from "formik";
import styled from "styled-components";
import { StyledButton, theme } from "../../styles/global";
import { SiAiqfome } from 'react-icons/si';

export const FormContainer = styled.div`
    margin: auto;
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.primaryDark};
    border-radius: 0.5rem;
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

export const StyledErrorMessage = styled.p`
    padding-top: 0.5rem;
    color: ${theme.primaryLight};
`;

export const FormBtnWrapper = styled.div`
    width: 100%;
    margin: 2.5rem 0;
`;

export const StyledFormBtn = styled(StyledButton)`
    width: 100%;
`;

export const FormLogoName = styled.div`
    color: #fff;
    font-size: ${theme.fontXl};
    justify-self: flex-start;
    align-items: center;
    letter-spacing: 0.1em;
    text-align: center;
    margin: 1.5rem 0;
`;
export const FormLogoIcon = styled(SiAiqfome)`
    margin-right: 0.5rem;
`;