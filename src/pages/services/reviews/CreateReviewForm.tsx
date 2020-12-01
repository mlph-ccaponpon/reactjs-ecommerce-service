import React, { useEffect } from 'react'
import { ServiceReview } from '../../../store/entities/ServiceReview';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BaseForm from '../../../components/form/BaseForm';
import { RATING_MAX, RATING_MIN, Service } from '../../../store/entities/Service';
import { addServiceReviewRequest } from '../../../store/actions/serviceActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { User } from '../../../store/entities/User';

/**
 * Form for Adding Service Review
 */
interface CreateReviewFormProps {
    handleCreateReviewSuccess: () => void;
    selectedService: Service;
}

function CreateReviewForm(props: CreateReviewFormProps) {
    const isLoading = useSelector((state: RootStateOrAny) => state.service.isServiceLoading);
    const isServiceReqSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceReqSuccess);
    const errorMessage = useSelector((state: RootStateOrAny) => state.service.serviceErrorMessage);
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    const dispatch = useDispatch();

    let formInitValues = {comment:"", rating: 1};
    
    const ratingValErrorMsg = `Rating value must be from ${RATING_MIN} to ${RATING_MAX}`;
    const formValidation = {
        comment: Yup.string()
                .required("Comment is required"),
        rating: Yup.number()
                .required("Rating is required")
                .positive()
                .integer()
                .min(RATING_MIN, ratingValErrorMsg)
                .max(RATING_MAX, ratingValErrorMsg),
    };
    
    const formFields = [
        {
            name: "comment",
            type: "textarea",
            placeholder: "Comment"
        },
        {
            name: "rating",
            type: "number",
            placeholder: "Rating"
        }
    ];

    const createReview = (review: ServiceReview) => {
        dispatch(addServiceReviewRequest(props.selectedService, review));
    }

    const createReviewSuccess = () => {
        props.handleCreateReviewSuccess();
    }


    useEffect(() => {
        if(isServiceReqSuccess) {
            createReviewSuccess();
        }
    }, [isServiceReqSuccess]);


    return (
        <Formik
        initialValues = {formInitValues}
        onSubmit = {(value) => {
            createReview({...value, user: currUser});
        }}
        validationSchema = {Yup.object(formValidation)}>

        {(formik) => (
            <BaseForm 
                isModal={true}
                title="Add Review"
                handleSubmit={formik.handleSubmit}
                submitBtnLabel="SUBMIT"
                fields={formFields}
                errorMessage={errorMessage}
                isLoading={isLoading}/>
        )}
    </Formik>
    )
}

export default CreateReviewForm
