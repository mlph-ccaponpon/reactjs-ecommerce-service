import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";
import styled from "styled-components";
import { theme } from "../../styles/global";

interface StarProps {
    starxl?: string,
    separate?: string
}

export const RatingInfoContainer = styled.div`
    display: ${(p: StarProps)  => p.separate === "false" && 'flex'};
`;
export const StyledStarFull = styled(TiStarFullOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starxl === "true" ? theme.fontXl : theme.fontLg};
`;

export const StyledStarOutline = styled(TiStarOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starxl === "true" ? theme.fontXl : theme.fontLg};
`;


export const StyledStarHalf = styled(TiStarHalfOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starxl === "true" ? theme.fontXl : theme.fontLg};
`;

export const RatingLabel = styled.div`
    color: ${theme.secondaryLight};
    font-size: ${(p: StarProps)  => p.starxl === "true" && '25px'};
`;