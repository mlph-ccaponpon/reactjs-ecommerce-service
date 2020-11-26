import styled from "styled-components";
import { Container, theme } from "../../styles/global";
import { SiAiqfome } from 'react-icons/si';
import { NavLink } from "react-router-dom";

interface HeaderProps {
    showSideMenu: boolean
}

export const Nav = styled.nav`
    background: ${theme.primaryDark};
    justify-content: center;
    align-items: center;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 999;
    font-size: ${theme.fontLg};
    height: 80px;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const HeaderLogoName = styled(NavLink)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: ${theme.fontXl};
    display: flex;
    align-items: center;
`;

export const HeaderLogoIcon = styled(SiAiqfome)`
    margin-right: 0.5rem;
`;

export const HeaderLink = styled(NavLink)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;

    &.active {
        color: ${theme.primaryLight};
    }

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;

        &:hover {
            color: ${theme.primaryLight};
            transition: all 0.3s ease;
        }
    }
`;

export const HeaderBtnLink = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`;

export const HeaderMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${(p: HeaderProps) => p.showSideMenu ? 0 : '-100%'};
        opacity: 1;
        transition: all 0.5s ease;
        background: ${theme.primaryDark};
    }
`;

export const HeaderMenuIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const HeaderMenuItem = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;

    &:hover {
    border-bottom: 5px solid ${theme.primaryLight};
    }

    @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
        border: none;
    }
    }
`;


export const HeaderMenuItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`;

