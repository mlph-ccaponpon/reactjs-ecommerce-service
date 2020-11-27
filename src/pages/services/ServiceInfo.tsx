import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import BaseInfoCard from '../../components/info/BaseInfoCard';
import { PageContainer, StyledButton, theme } from '../../styles/global';
import RatingInfo from '../../components/info/RatingInfo';
import {withRouter, RouteComponentProps} from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getServiceByIdRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';

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
        }
    })
);
interface ServiceInfoParams {
    id: string;
}
function ServiceInfo({ match }: RouteComponentProps<ServiceInfoParams, any>) {
    const classes = useStyles();
    const serviceId = match.params.id;
    const selectedService: Service = useSelector((state: RootStateOrAny) => state.service.selectedService);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getServiceByIdRequest(serviceId));
    }, []);

    return (
        <PageContainer>
        {selectedService && (
            <Grid container 
                    spacing={3} 
                    justify="center"
                    style={{ maxWidth: 800 }}>
                
                {/* SEVICE DETAILS */}
                <Grid item xs={12}>
                    <Typography className={classes.title}>
                        {selectedService.name} <small> ({selectedService.category}) </small>
                    </Typography>
                    <Typography gutterBottom>
                       <RatingInfo rating={selectedService.rating? selectedService.rating:0} starxl={true}/>
                    </Typography>
                    <BaseInfoCard 
                        contentImg={selectedService.imageUrl}
                        contentTitle={selectedService.location}
                        content={selectedService.description}/>
                    <Typography align="right" className={classes.addReview}>
                        <StyledButton btnLg>
                            Add Review
                        </StyledButton>
                    </Typography>
                </Grid>

                {/* COMMENTS */}
                <Grid item xs={12}>
                    <BaseInfoCard 
                        title="Chin Caponpon"
                        content="Good restaurant"/>
                </Grid>
                <Grid item xs={12}>
                    <BaseInfoCard 
                        title="Chernhelyn Caponpon"
                        content="Nice restaurant"/>
                </Grid>
            </Grid>
        )}
        </PageContainer>
    )
}

export default withRouter(ServiceInfo);
