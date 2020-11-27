import React from 'react'
import { StyledStarFull, StyledStarOutline } from './RatingInfo.elements';

interface RatingInfoProps {
    rating: number,
    starXl?: boolean
}

function RatingInfo(props: RatingInfoProps) {
    return (
        <p>
            {[...Array(5)].map((_, i) => 
                props.rating && props.rating > i ? (
                    <StyledStarFull key={i} starXl={props.starXl}/>
                ):(
                    <StyledStarOutline key={i} starXl={props.starXl}/>
                )
            )}
        </p>
    )
}

export default RatingInfo;
