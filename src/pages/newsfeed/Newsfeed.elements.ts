import styled from "styled-components";
import { theme } from "../../styles/global";

export const NewsfeedSearchInput = styled.input`
    width: 100%;
    border-width: 1px;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    font-size: ${theme.fontLg};
`;

export const NewsfeedCheckbox = styled.input`
    font-size: ${theme.fontLg};
`;

export const NewsfeedSearchContainer = styled.div`
    display: block;
    text-align: right;
`;