import { Typography } from '@material-ui/core';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { FormLogoIcon } from '../../components/form/BaseForm.elements';
import { User } from '../../store/entities/User';
import { HomeContainer, HomeHeader } from './Home.elements';

function Home(){
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    return (
        <HomeContainer>
            {(currUser != null) && (
                <HomeHeader>
                    Welcome, {currUser.name}!
                </HomeHeader>
            )}
        </HomeContainer>
    )
}

export default Home;
