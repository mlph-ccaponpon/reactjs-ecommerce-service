import { ErrorMessage } from 'formik';
import React from 'react';
import { ButtonSpinner, PageContainer } from '../../styles/global';
import { StyledField, FieldWrapper, FormContainer, FormLogoIcon, FormLogoName, StyledForm, StyledErrorMessage, FormBtnWrapper, StyledFormBtn } from './BaseForm.elements';

interface FormField {
    name: string,
    type: string,
    placeholder: string
}

interface BaseFormProps{
    handleSubmit: () => void,
    title: string,
    submitBtnLabel: string,
    fields: FormField[],
    errorMessage?: string,
    isLoading?: boolean
}

function BaseForm(props: BaseFormProps) {
    return (
        <FormContainer>
            <StyledForm onSubmit={props.handleSubmit}>
                <FormLogoName>
                    <FormLogoIcon />
                    {props.title}
                </FormLogoName>
                {props.fields.map((field, index) => {
                    return(
                        <FieldWrapper key={index}>
                            <StyledField
                            name={field.name}
                            type={field.type}  
                            placeholder={field.placeholder}/>
                            <StyledErrorMessage>
                                <ErrorMessage name={field.name} />
                            </StyledErrorMessage>
                        </FieldWrapper>
                    )
                })}
                {(props.errorMessage) && <StyledErrorMessage>{props.errorMessage}</StyledErrorMessage>}
                <FormBtnWrapper>
                    <StyledFormBtn type="submit" btnLg>
                        {props.isLoading ? (
                            <ButtonSpinner />
                        ):(
                            props.submitBtnLabel
                        )}
                    </StyledFormBtn>
                </FormBtnWrapper>
            </StyledForm>
        </FormContainer>
    )
}

export default BaseForm;
