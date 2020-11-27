import { Formik } from 'formik';
import React, { useEffect } from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Service } from '../../store/entities/Service';
import { createServiceRequest, setServiceErrorMessage } from '../../store/actions/serviceActions';

interface AddServiceFormProps {
    handleAddServiceSuccess: () => void;
}

function AddServiceForm(props: AddServiceFormProps) {
    const isLoading = useSelector((state: RootStateOrAny) => state.service.isServiceLoading);
    const isServiceRequestSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceRequestSuccess);
    const errorMessage = useSelector((state: RootStateOrAny) => state.service.serviceErrorMessage);
    const dispatch = useDispatch();

    const formInitValues = {name:"", category: "", providerUid: "", location: "", description: ""};
    const formValidation = {
        name: Yup.string()
                .required("Service Name is required"),
        category: Yup.string()
                .required("Service Category is required"),
        providerUid: Yup.string()
                .required("Service Provider is required"),
        location: Yup.string()
                .required("Location is required"),
        description: Yup.string()
                .required("Description is required")
    };
    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Service Name"
        },
        {
            name: "category",
            type: "text",
            placeholder: "Category"
        },
        {
            name: "providerUid",
            type: "text",
            placeholder: "Service Provider"
        },
        {
            name: "location",
            type: "text",
            placeholder: "Service Location"
        },
        {
            name: "description",
            type: "text",
            placeholder: "Service Description"
        }
    ];

    const createService = (service: Service) => {
        dispatch(createServiceRequest(service));
    } 

    const createServiceSuccess = () => {
        dispatch(setServiceErrorMessage(""));
        props.handleAddServiceSuccess();
    }

    useEffect(() => {
        if(isServiceRequestSuccess) {
            createServiceSuccess();
        }
    }, [isServiceRequestSuccess]);

    return (
        <Formik
        initialValues = {formInitValues}
        onSubmit = {(value, formikBag) => {
            createService(value);
        }}
        validationSchema = {Yup.object(formValidation)}>

        {(formik) => (
            <BaseForm 
                isModal={true}
                title="ADD SERVICE"
                handleSubmit={formik.handleSubmit}
                submitBtnLabel="SUBMIT"
                fields={formFields}
                errorMessage={errorMessage}
                isLoading={isLoading} />
        )}
    </Formik>
    )
}

export default AddServiceForm;
