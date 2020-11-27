import React from 'react'
import { RATING_MAX } from '../../store/entities/Service';
import { RatingInfoContainer, RatingLabel, StyledStarFull, StyledStarHalf, StyledStarOutline } from './RatingInfo.elements';

interface RatingInfoProps {
    rating: number,
    starxl?: boolean,
    hasLabel?: boolean,
    isLabelSeparate?: boolean
}

function RatingInfo(props: RatingInfoProps) {
    const isStarXl = props.starxl ? true:false;
    const isLabelSeparate = props.isLabelSeparate ? true:false;
    const formattedRating = props.rating.toFixed(1);
    const roundedRating = Number(formattedRating);
    return (
        <RatingInfoContainer separate={isLabelSeparate.toString()}>
            <div>
            {[...Array(5)].map((_, i) => {
                const starNum = i+1;
                const prevStarNum = starNum - 1;
                
                if(starNum <= roundedRating) {
                    return(
                        <StyledStarFull key={starNum} starxl={isStarXl.toString()}/>
                    )
                }
                if(starNum > roundedRating && prevStarNum < roundedRating) {
                    return(
                        <StyledStarHalf key={starNum} starxl={isStarXl.toString()}/>
                    )
                }
                return(
                    <StyledStarOutline key={starNum} starxl={isStarXl.toString()}/>
                )
            })}
            </div>
            {props.hasLabel && (
                <RatingLabel starxl={isStarXl.toString()}>
                    ({formattedRating} / {RATING_MAX})
                </RatingLabel>
            )}
        </RatingInfoContainer>
    )
}

export default RatingInfo;
