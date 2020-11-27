import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { User } from '../../store/entities/User';
import { PageContainer } from '../../styles/global';

function Home(){
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    return (
        <PageContainer>
        {(currUser != null) ? (
            <h1>Welcome, {currUser.name}!</h1>
        ):(
            <h1>Welcome!</h1>
        )}
        </PageContainer>
    )
}

export default Home;
