import React, { useEffect, useState } from 'react'
import { Button } from '../../styles/global';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HeaderBtnLink, HeaderContainer, HeaderLink, HeaderLogoIcon, HeaderLogoName, HeaderMenu, HeaderMenuIcon, HeaderMenuItem, HeaderMenuItemBtn, Nav } from './Header.elements';

const Header: React.FC = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [showMenuBtn, setShowMenuBtn] = useState(true);
  
    const handleMenuClick = () => setShowSideMenu(!showSideMenu);
    const closeMenu = () => setShowSideMenu(false);
  
    const toggleMenuBtn = () => {
      if (window.innerWidth <= 960) {
        setShowMenuBtn(false);
      } else {
        setShowMenuBtn(true);
      }
    };
  
    useEffect(() => {
      toggleMenuBtn();
    }, []);

    window.addEventListener('resize', toggleMenuBtn);

    return (
        <Nav>
            <HeaderContainer>
                <HeaderLogoName to="/" onClick={closeMenu}>
                    <HeaderLogoIcon />
                    MUNCH
                </HeaderLogoName>
                <HeaderMenuIcon onClick={handleMenuClick}>
                    {showSideMenu ? <FaTimes /> : <FaBars />}
                </HeaderMenuIcon>
                <HeaderMenu onClick={handleMenuClick} showSideMenu={showSideMenu}>
                    <HeaderMenuItem>
                        <HeaderLink to="/login" onClick={closeMenu}>
                            Login
                        </HeaderLink>
                    </HeaderMenuItem>
                    <HeaderMenuItemBtn>
                        {showMenuBtn ? (
                        <HeaderBtnLink to='/sign-up'>
                            <Button>SIGN UP</Button>
                        </HeaderBtnLink>
                        ) : (
                        <HeaderBtnLink to='/sign-up'>
                            <Button onClick={closeMenu} btnLg>
                            SIGN UP
                            </Button>
                        </HeaderBtnLink>
                        )}
                    </HeaderMenuItemBtn>
                </HeaderMenu>
            </HeaderContainer>
        </Nav>
    )
}

export default Header;
