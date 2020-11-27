import React from 'react';
import { PageContainer } from '../../styles/global';
import { Grid } from '@material-ui/core';
import BaseInfoCard from '../../components/card/BaseInfoCard';

function Newsfeed() {
  return (
      <PageContainer>
        <Grid container 
                spacing={5} 
                justify="center"
                style={{ maxWidth: 800 }}>
            <Grid item xs={12}>
                <BaseInfoCard 
                    title="Service Name"
                    contentTitle="Service Location"
                    content="Service short description." />
            </Grid>
            <Grid item xs={12}>
                <BaseInfoCard 
                    title="Service Name"
                    contentTitle="Service Location"
                    content="Service short description." />
            </Grid>
        </Grid>
    </PageContainer>
  );
};

export default Newsfeed;
