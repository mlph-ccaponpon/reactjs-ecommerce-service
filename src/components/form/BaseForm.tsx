import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { ButtonSpinner } from '../../styles/global';
import { StyledField, FieldWrapper, FormContainer, FormLogoIcon, FormLogoName, StyledForm, StyledErrorMessage, FormBtnWrapper, StyledFormBtn, StyledFieldSelect } from './BaseForm.elements';

interface FormFieldOption {
    label: string,
    value: string
}
interface FormField {
    name: string,
    type: string,
    placeholder?: string,
    options?: FormFieldOption[]
}

interface BaseFormProps{
    handleSubmit: () => void,
    title: string,
    submitBtnLabel: string,
    fields: FormField[],
    errorMessage?: string,
    isLoading?: boolean,
    isModal?: boolean
}

function BaseForm(props: BaseFormProps) {
    return (
        <FormContainer isModal={props.isModal}>
            <StyledForm onSubmit={props.handleSubmit}>
                <FormLogoName>
                    <FormLogoIcon />
                    {props.title}
                </FormLogoName>
                {props.fields.map((field, index) => {
                    return(
                        field.type === "select" ? (
                            <StyledFieldSelect>
                                <Field key={index} as="select" name={field.name}>
                                    <option value="" disabled>
                                        {field.placeholder}
                                    </option>
                                    {field.options && field.options.map((fieldOption) => {
                                        return(
                                            <option value={fieldOption.value} key={fieldOption.value}>
                                                {fieldOption.label}
                                            </option>
                                        )
                                    })}
                                </Field>
                            </StyledFieldSelect>
                        ):(
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
