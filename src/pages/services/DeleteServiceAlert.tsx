import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FormLogoIcon, FormLogoName } from '../../components/form/BaseForm.elements';
import { deleteServiceRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';
import { StyledButton, theme } from '../../styles/global'

interface DeleteServiceProps {
    selectedService: Service | null;
    handleCloseDeleteModal: () => void;
}
function DeleteServiceAlert(props: DeleteServiceProps) {
    const dispatch = useDispatch();
    const isServiceReqSuccess = useSelector((state: RootStateOrAny) => state.service.isServiceReqSuccess);

    const deleteService = () => {
        if(props.selectedService) {
            dispatch(deleteServiceRequest(props.selectedService));
        }
    }

    const deleteServiceSuccess = () => {
        props.handleCloseDeleteModal();
    }

    useEffect(() => {
        if(isServiceReqSuccess) {
            deleteServiceSuccess();
        }
    }, [isServiceReqSuccess]);

    return (
        <div>
            <FormLogoName>
                <FormLogoIcon />
                Delete Service
            </FormLogoName>
            <div style={{color: theme.secondaryLight, fontSize: theme.fontLg, textAlign: "center", paddingBottom: "25px"}}>
                Are you sure you want to delete this service?
            </div>

            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <StyledButton onClick={deleteService} btnLg>Yes</StyledButton>
                <StyledButton onClick={props.handleCloseDeleteModal} danger btnLg>No</StyledButton>
            </div>
        </div>
    )
}

export default DeleteServiceAlert;
