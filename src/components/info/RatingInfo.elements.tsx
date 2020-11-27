import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import styled from "styled-components";
import { theme } from "../../styles/global";

interface StarProps {
    starXl?: boolean
}

export const StyledStarFull = styled(TiStarFullOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starXl ? theme.fontXl : theme.fontLg};
`;

export const StyledStarOutline = styled(TiStarOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starXl ? theme.fontXl : theme.fontLg};
`;