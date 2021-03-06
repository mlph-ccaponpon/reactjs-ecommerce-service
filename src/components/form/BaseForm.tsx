import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { ButtonSpinner } from '../../styles/global';
import { StyledField, StyledFieldLabel, FieldWrapper, FormContainer, FormLogoIcon, FormLogoName, StyledForm, StyledErrorMessage, FormBtnWrapper, StyledFormBtn, StyledFieldSelect } from './BaseForm.elements';

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
                    if(field.type === "select") {
                        return (
                        <StyledFieldSelect key={field.name}>
                            <StyledFieldLabel>
                                {field.placeholder}
                            </StyledFieldLabel>
                            <Field as="select" name={field.name}>
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
                        )
                    }
                    if(field.type === "textarea") {
                        return (
                            <FieldWrapper key={field.name}>
                                <StyledFieldLabel>
                                    {field.placeholder}
                                </StyledFieldLabel>
                                <StyledField
                                name={field.name}
                                type={field.type}  
                                placeholder={field.placeholder}
                                component="textarea"
                                rows="2"/>
                                <StyledErrorMessage>
                                    <ErrorMessage name={field.name} />
                                </StyledErrorMessage>
                            </FieldWrapper>
                        )
                    }
                    return (

                        <FieldWrapper key={field.name}>
                            <StyledFieldLabel>
                                {field.placeholder}
                            </StyledFieldLabel>
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
