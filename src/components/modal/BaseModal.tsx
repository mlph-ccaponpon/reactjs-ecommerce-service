import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { StyledButton, theme } from '../../styles/global';
import { FormLogoIcon, FormLogoName } from '../form/BaseForm.elements';
import { BaseModalBody, BaseModalBtnWrapper } from './BaseModal.elements';

interface BaseModalProps {
  title?: string,
  showModal: boolean,
  handleCloseModal: () => void,
  handleSubmitModal?: () => void,
  modalBody?: any,
  confirmationModal?: boolean
}

const useStyles = makeStyles((materialTheme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.primaryDark,
      boxShadow: materialTheme.shadows[5],
      padding: materialTheme.spacing(2, 4, 3),
      outline: 'none'
    },
  }),
);

function BaseModal(props: BaseModalProps) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.showModal}
      onClose={props.handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={props.showModal}>
        <div className={classes.paper}>
          {props.confirmationModal ? (
            <div>
              <FormLogoName>
                  <FormLogoIcon />
                  {props.title}
              </FormLogoName>
              <BaseModalBody>
                  {props.modalBody}
              </BaseModalBody>
              <BaseModalBtnWrapper>
                  <StyledButton onClick={props.handleSubmitModal} btnLg>Yes</StyledButton>
                  <StyledButton onClick={props.handleCloseModal} danger btnLg>No</StyledButton>
              </BaseModalBtnWrapper>
            </div>
          ):(
            props.modalBody
          )}
        </div>
      </Fade>
    </Modal>
  );
}

export default BaseModal;
