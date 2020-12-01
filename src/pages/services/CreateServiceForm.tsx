import { Formik } from 'formik';
import React, { useEffect } from 'react'
import BaseForm from '../../components/form/BaseForm';
import * as Yup from 'yup';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Service } from '../../store/entities/Service';
import { createServiceRequest, updateServiceRequest } from '../../store/actions/serviceActions';
import useFetchProviderOptions from '../../utils/hooks/useFetchProviderOptions';
import { User } from '../../store/entities/User';

/**
 * Form for Adding or Editing Service Details
 */
interface CreateServiceFormProps {
    handleCreateServiceSuccess: () => void;
    isNew?: boolean;
    selectedService?: Service | null;
    isProvider: boolean;
}

function CreateServiceForm(props: CreateServiceFormProps) {
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    const isLoading = useSelector((state: RootStateOrAny) => state.service.isServiceLoading);
    const isServiceReqSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceReqSuccess);
    const errorMessage = useSelector((state: RootStateOrAny) => state.service.serviceErrorMessage);
    const dispatch = useDispatch();
    const formTitle = props.isNew ? "ADD SERVICE": "EDIT SERVICE";
    let formInitValues = {name:"", category: "", providerUid: "", location: "", imageUrl: "", description: ""};
    const [providerOptions] = useFetchProviderOptions();

    const formValidation = {
        name: Yup.string()
                .required("Service Name is required"),
        category: Yup.string()
                .required("Service Category is required"),
        providerUid: Yup.string()
                .required("Service Provider is required"),
        imageUrl: Yup.string()
                .url("Service Thumbnail Image URL is invalid"),
        location: Yup.string()
                .required("Service Location is required"),
        description: Yup.string()
                .required("Service Description is required")
    };

    let formFields = [
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
            type: "select",
            placeholder: "Service Provider",
            options: providerOptions
        },
        {
            name: "location",
            type: "text",
            placeholder: "Service Location"
        },
        {
            name: "imageUrl",
            type: "text",
            placeholder: "Thumbnail Image URL"
        },
        {
            name: "description",
            type: "text",
            placeholder: "Service Description"
        }
    ];

    if(props.selectedService != null) {
        // Remove id, timestamp and rating properties for creating service form values
        const {id, timestamp, rating, ...serviceFormValues } = props.selectedService;
        formInitValues = serviceFormValues;
    }

    if(props.isProvider) {
        formInitValues.providerUid = currUser.uid ? currUser.uid:"";
        formFields = formFields.filter(field => (field.name !== "providerUid"));
    }

    const createService = (service: Service) => {
        if(props.isNew) {
            dispatch(createServiceRequest(service));
        } else if(props.selectedService != null) {
            service = {...props.selectedService, ...service};
            dispatch(updateServiceRequest(service));
        }
    } 

    const createServiceSuccess = () => {
        props.handleCreateServiceSuccess();
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
            createService({...value, rating: props.selectedService ? props.selectedService.rating:0});
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
