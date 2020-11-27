import React from 'react';
import { PageContainer } from '../../styles/global';
import { Grid } from '@material-ui/core';
import BaseInfoCard from '../../components/info/BaseInfoCard';

function Newsfeed() {
  const serviceInfoLink = "/newsfeed/service"
  return (
      <PageContainer>
        <Grid container 
                spacing={5} 
                justify="center"
                style={{ maxWidth: 800 }}>
            <Grid item xs={12}>
                <BaseInfoCard 
                    title="Service Name"
                    rating={3}
                    titleLink={serviceInfoLink}
                    subtitle="Category"
                    contentTitle="Service Location"
                    content="Service short description."
                    contentImg="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"  />
            </Grid>
            <Grid item xs={12}>
                <BaseInfoCard 
                    title="Service Name"
                    rating={0}
                    titleLink={serviceInfoLink}
                    subtitle="Category"
                    contentTitle="Service Location"
                    content="Service short description." />
            </Grid>
        </Grid>
    </PageContainer>
  );
};

export default Newsfeed;
