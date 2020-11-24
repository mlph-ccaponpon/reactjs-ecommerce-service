import React from 'react';
import GlobalStyle from '../../styles/global';
import { Dot, DotWrapper, LoadingContainer } from './Loading.elements';

function Loading() {
    return (
        <div>
            <GlobalStyle />
            <LoadingContainer>
                <DotWrapper>
                    <Dot delay="0s" />
                    <Dot delay=".1s" />
                    <Dot delay=".2s" />
                </DotWrapper>
            </LoadingContainer>
        </div>
    )
}

export default Loading;
