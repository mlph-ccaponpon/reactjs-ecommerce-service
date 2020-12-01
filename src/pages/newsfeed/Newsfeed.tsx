import React, { useEffect, useState } from 'react';
import { PageContainer } from '../../styles/global';
import { Grid } from '@material-ui/core';
import BaseInfoCard from '../../components/info/BaseInfoCard';
import { getServiceListRequest } from '../../store/actions/serviceActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Service } from '../../store/entities/Service';
import useDebounce from '../../utils/hooks/useDebounce';
import { NewsfeedSearchInput, NewsfeedCheckbox, NewsfeedSearchContainer } from './Newsfeed.elements';
import useSearchService from '../../utils/hooks/useSearchService';
import { User } from '../../store/entities/User';

function Newsfeed() {
  const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
  const serviceInfoLink = "/newsfeed/";
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortByRating, setIsSortByRating] = useState(false);
  useSearchService(searchTerm, isSortByRating);

  const filteredServiceList: Service[] = useSelector((state: RootStateOrAny) => state.service.filteredServiceList);
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const handleSearchInput = (e: any) => {
      const text = e.target.value;
      debounce(() => setSearchTerm(text));
  }

  const handleIsSortByRating = (e: any) => {
    setIsSortByRating(e.target.checked);
  }
  useEffect(() => {
    dispatch(getServiceListRequest(currUser));
  }, []);

  return (
      <PageContainer>
        <Grid container 
                spacing={5} 
                justify="center"
                style={{ maxWidth: 800 }}>
            <Grid item xs={12}>
                <NewsfeedSearchContainer>
                  <NewsfeedSearchInput 
                      type="text" 
                      onChange={handleSearchInput} 
                      placeholder="Search Services by Name or Category"/>
                  <NewsfeedCheckbox
                      type="checkbox"
                      onChange={handleIsSortByRating} /> Sort by Rating
                </NewsfeedSearchContainer>
            </Grid>
            {filteredServiceList.map((service: Service) => {
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
