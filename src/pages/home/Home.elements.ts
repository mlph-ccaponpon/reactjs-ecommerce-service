import styled from "styled-components";
import { theme } from "../../styles/global";

export const HomeContainer = styled.div`
    height: 100vh;
    background-color: ${theme.primaryDark};
    padding-top: 80px;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover; 
    background-image: url("https://images.unsplash.com/photo-1457877916676-133b53113613");
`

export const HomeHeader = styled.div`
    justify-content: center;
    display: flex;
    margin-bottom: 20px;
    color: ${theme.primaryDark};
    font-size: 40px;
    font-family: fantasy;
`;