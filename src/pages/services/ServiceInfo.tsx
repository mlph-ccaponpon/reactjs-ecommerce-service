import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react'
import BaseInfoCard from '../../components/info/BaseInfoCard';
import { PageContainer, StyledButton, theme } from '../../styles/global';
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import RatingInfo from '../../components/info/RatingInfo';

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

function ServiceInfo() {
    const classes = useStyles();

    return (
        <PageContainer>
            <Grid container 
                    spacing={3} 
                    justify="center"
                    style={{ maxWidth: 800 }}>
                
                {/* SEVICE DETAILS */}
                <Grid item xs={12}>
                    <Typography className={classes.title}>
                        Service Name <small> (Category)</small>
                    </Typography>
                    <Typography gutterBottom>
                       <RatingInfo rating={4} starXl={true} />
                    </Typography>
                    <BaseInfoCard 
                        contentImg="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
                        contentTitle="Location"
                        content="Description of service"/>
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
        </PageContainer>
    )
}

export default ServiceInfo;
