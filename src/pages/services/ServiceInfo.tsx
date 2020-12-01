import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import BaseInfoCard from '../../components/info/BaseInfoCard';
import { PageContainer, StyledButton, theme } from '../../styles/global';
import RatingInfo from '../../components/info/RatingInfo';
import {withRouter, RouteComponentProps} from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getServiceByIdRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';
import BaseModal from '../../components/modal/BaseModal';
import CreateReviewForm from './reviews/CreateReviewForm';
import { ServiceReview } from '../../store/entities/ServiceReview';
import { Role, User } from '../../store/entities/User';

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            fontWeight: 600,
            fontSize: theme.fontXl,
            color: theme.primaryDark
        },
        star: {
            fontSize: theme.fontXl,
            color: theme.primaryLight
        },
        addReview: {
            marginTop: 20
        },
        serviceRatingAvg: {
            marginTop: 10,
            marginBottom: 20
        },
        reviewsLabel: {
            marginTop: 30,
            fontSize: theme.fontXl
        }
    })
);
interface ServiceInfoParams {
    id: string;
}
function ServiceInfo({ match }: RouteComponentProps<ServiceInfoParams, any>) {
    const serviceId = match.params.id;
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    const selectedService: Service = useSelector((state: RootStateOrAny) => state.service.selectedService);
    const dispatch = useDispatch();

    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    const classes = useStyles();

    // Add Modal
    const handleOpenAddReviewModal = () => {
        setShowAddReviewModal(true);
    };
    const handleCloseAddReviewModal = () => {
        setShowAddReviewModal(false);
    };
    const handleAddReviewSuccess = () => {
        handleCloseAddReviewModal();
    };

    useEffect(() => {
      dispatch(getServiceByIdRequest(serviceId));
    }, []);

    return (
        <PageContainer>
        {selectedService && (
            <>
            <Grid container 
                    spacing={3} 
                    justify="center"
                    style={{ maxWidth: 800 }}>
                
                {/* SEVICE DETAILS */}
                <Grid item xs={12}>
                    <Typography className={classes.title}>
                        {selectedService.name} <small> - {selectedService.category} </small>
                    </Typography>
                    <div className={classes.serviceRatingAvg}>
                    <RatingInfo rating={selectedService.rating? selectedService.rating:0} starxl={true} hasLabel={true} />
                    </div>
                    <BaseInfoCard 
                        contentImg={selectedService.imageUrl}
                        contentTitle={selectedService.location}
                        content={selectedService.description}/>
                    {(currUser && currUser.role === Role.CUSTOMER.value) && (
                        <Typography align="right" className={classes.addReview}>
                            <StyledButton btnLg onClick={handleOpenAddReviewModal}>
                                Add Review
                            </StyledButton>
                        </Typography>
                    )}
                    {(selectedService && selectedService.reviews && selectedService.reviews.length > 0) && (
                        <Typography className={classes.reviewsLabel}>
                            Reviews:
                        </Typography>
                    )}
                </Grid>

                {/* REVIEWS */}
                {selectedService.reviews?.map((review: ServiceReview, index) => {
                    return(
                        <Grid item xs={12} key={index}>
                            <BaseInfoCard 
                                title={review.user.name}
                                subtitle={review.timestamp ? new Date(review.timestamp).toLocaleString():""}
                                rating={review.rating}
                                content={review.comment}/>
                        </Grid>
                    )
                })}
            </Grid>

            <BaseModal
                showModal={showAddReviewModal}
                handleCloseModal={handleCloseAddReviewModal}
                modalBody={
                    CreateReviewForm({
                        handleCreateReviewSuccess: handleAddReviewSuccess,
                        selectedService: selectedService})
                } />
            </>
        )}
        </PageContainer>
    )
}

export default withRouter(ServiceInfo);
