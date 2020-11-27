import React from 'react'
import { StyledStarFull, StyledStarOutline } from './RatingInfo.elements';

interface RatingInfoProps {
    rating: number,
    starxl?: boolean
}

function RatingInfo(props: RatingInfoProps) {
    const isStarXl = props.starxl ? true:false;
    return (
        <>
            {[...Array(5)].map((_, i) => 
                props.rating && props.rating > i ? (
                    <StyledStarFull key={i} starxl={isStarXl.toString()}/>
                ):(
                    <StyledStarOutline key={i} starxl={isStarXl.toString()}/>
                )
            )}
        </>
    )
}

export default RatingInfo;
