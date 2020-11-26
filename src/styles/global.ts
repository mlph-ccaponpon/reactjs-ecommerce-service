import { FaSpinner } from 'react-icons/fa';
import styled, { createGlobalStyle } from 'styled-components'; 


const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

export const theme = {
    primaryDark: '#1a202c',
    primaryLight: '#ffba00', 
    secondaryDark: '#ffaa00', 
    secondaryLight: '#fff', 
    fontMd: '1rem',
    fontLg: '1.2rem',
    fontXl: '2rem',
    
};

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const PageContainer = styled(Container)`
    display: flex;
    padding-top: 100px;
    padding-bottom: 100px;

    ${Container}
`;


interface ButtonProps {
    btnLg?: boolean
}
export const StyledButton = styled.button`
    border-radius: 4px;
    background: ${theme.primaryLight};
    white-space: nowrap;
    padding: ${(p: ButtonProps)  => p.btnLg ? '12px 64px' : '10px 20px'};
    color: #fff;
    font-size:  ${(p: ButtonProps)  => p.btnLg ? theme.fontLg : theme.fontMd};
    outline: none;
    border: none;
    cursor: pointer;
    height: ${(p: ButtonProps)  => p.btnLg ? '50px' : '40px'};

    &:hover {
        transition: all 0.3s ease-out;
        background: ${theme.secondaryDark};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export const ButtonSpinner = styled(FaSpinner)`
    animation: fa-spin 2s infinite linear;
    @keyframes fa-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }
`;

export default GlobalStyle;