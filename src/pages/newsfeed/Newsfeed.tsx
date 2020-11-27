import React, { useEffect } from 'react';
import { PageContainer } from '../../styles/global';
import { Grid } from '@material-ui/core';
import BaseInfoCard from '../../components/info/BaseInfoCard';
import { getServiceListRequest } from '../../store/actions/serviceActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Service } from '../../store/entities/Service';

function Newsfeed() {
  const serviceInfoLink = "/newsfeed/";
  const serviceList: Service[] = useSelector((state: RootStateOrAny) => state.service.serviceList);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getServiceListRequest());
  }, []);

  return (
      <PageContainer>
        <Grid container 
                spacing={5} 
                justify="center"
                style={{ maxWidth: 800 }}>
            {serviceList.map((service: Service) => {
              return (
              <Grid item xs={12} key={service.id}>
                <BaseInfoCard 
                    title={service.name}
                    rating={service.rating}
                    ratingHasLabel={true}
                    titleLink={serviceInfoLink + service.id}
                    subtitle={service.category}
                    contentTitle={service.location}
                    content={service.description}
                    contentImg={service.imageUrl} />
              </Grid>
              )
            })}
        </Grid>
    </PageContainer>
  );
};

export default Newsfeed;
