import React from 'react';
import { FormField } from '../../models/FormField';
import { PageContainer } from '../../styles/global';
import { StyledField, FieldWrapper, FormContainer, StyledForm, StyledErrorMessage, FormTitle, FormBtnWrapper, StyledFormBtn } from './BaseForm.elements';

interface BaseFormProps{
    handleSubmit: () => void,
    submitBtnLabel: string,
    fields: FormField[]
}

function BaseForm(props: BaseFormProps) {
    return (
        <PageContainer>
            <FormContainer>
                <StyledForm onSubmit={props.handleSubmit}>
                    <FormTitle>Join Now!</FormTitle>
                    {props.fields.map((field, index) => {
                        return(
                            <FieldWrapper>
                                <StyledField
                                name={field.name}
                                type={field.type}  
                                placeholder={field.placeholder}/>
                                <StyledErrorMessage name={field.name} />
                            </FieldWrapper>
                        )
                    })}
                    <FormBtnWrapper>
                        <StyledFormBtn type="submit" btnLg>{props.submitBtnLabel}</StyledFormBtn>
                    </FormBtnWrapper>
                </StyledForm>
            </FormContainer>
        </PageContainer>
    )
}

export default BaseForm;
