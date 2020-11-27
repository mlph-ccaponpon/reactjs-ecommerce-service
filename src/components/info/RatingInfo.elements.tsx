import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import styled from "styled-components";
import { theme } from "../../styles/global";

interface StarProps {
    starxl?: boolean
}

export const StyledStarFull = styled(TiStarFullOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starxl ? theme.fontXl : theme.fontLg};
`;

export const StyledStarOutline = styled(TiStarOutline)`
    color: ${theme.primaryLight};
    font-size: ${(p: StarProps)  => p.starxl ? theme.fontXl : theme.fontLg};
`;