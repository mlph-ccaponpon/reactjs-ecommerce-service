import { Formik } from 'formik';
import React, { useEffect } from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Service } from '../../store/entities/Service';
import { createServiceRequest, getServiceByIdRequest, getServiceListRequest } from '../../store/actions/serviceActions';

/**
 * Form for Adding or Editing Service Details
 */
interface CreateServiceFormProps {
    handleAddServiceSuccess: () => void;
    isNew?: boolean;
    selectedService?: Service | null;
}

function CreateServiceForm(props: CreateServiceFormProps) {
    const isLoading = useSelector((state: RootStateOrAny) => state.service.isServiceLoading);
    const isServiceReqSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceReqSuccess);
    const errorMessage = useSelector((state: RootStateOrAny) => state.service.serviceErrorMessage);
    const dispatch = useDispatch();
    const formTitle = props.isNew ? "ADD SERVICE": "EDIT SERVICE";
    let formInitValues = {name:"", category: "", providerUid: "", location: "", description: ""};
    if(props.selectedService != null) {
        formInitValues = {name: props.selectedService.name, 
            category: props.selectedService.category, 
            providerUid: props.selectedService.providerUid, 
            location: props.selectedService.location, 
            description: props.selectedService.description}
    }
    const formValidation = {
        name: Yup.string()
                .required("Service Name is required"),
        category: Yup.string()
                .required("Service Category is required"),
        providerUid: Yup.string()
                .required("Service Provider is required"),
        location: Yup.string()
                .required("Service Location is required"),
        description: Yup.string()
                .required("Service Description is required")
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
        props.handleAddServiceSuccess();
    }

    useEffect(() => {
        if(isServiceReqSuccess) {
            createServiceSuccess();
        }
    }, [isServiceReqSuccess]);

    

    return (
        <Formik
        initialValues = {formInitValues}
        onSubmit = {(value) => {
            createService(value);
        }}
        validationSchema = {Yup.object(formValidation)}>

        {(formik) => (
            <BaseForm 
                isModal={true}
                title={formTitle}
                handleSubmit={formik.handleSubmit}
                submitBtnLabel="SUBMIT"
                fields={formFields}
                errorMessage={errorMessage}
                isLoading={isLoading} />
        )}
    </Formik>
    )
}

export default CreateServiceForm;
