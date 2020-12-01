import { Field, Form } from "formik";
import styled from "styled-components";
import { StyledButton, theme } from "../../styles/global";
import { SiAiqfome } from 'react-icons/si';

interface FormContainerProps {
    isModal?: boolean
}
export const FormContainer = styled.div`
    margin: auto;
    width: ${(p: FormContainerProps)  => p.isModal ? '500px' : '45%'};
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

export const StyledFieldLabel = styled.label`
    color: ${theme.primaryLight};
    font-size: 14px;
`;

export const FieldWrapper = styled.div`
    width: 100%;
    margin: 12px 0;
`;

export const StyledField = styled(Field)`
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 0.25rem;
    font-size: ${theme.fontMd};
`;

export const StyledFieldSelect = styled.p`
    select {
        padding: 12px;
        width: 100%;
        border: none;
        border-radius: 0.25rem;
        font-size: ${theme.fontMd};
    }
`;

export const StyledErrorMessage = styled.p`
    padding-top: 0.5rem;
    color: #fff;
    font-size: 14px;
`;

export const FormBtnWrapper = styled.div`
    width: 100%;
    margin: 40px 0;
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