import React, { useEffect, useState } from 'react'
import { StyledButton } from '../../styles/global';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HeaderBtnLink, HeaderContainer, HeaderLink, HeaderLogoIcon, HeaderLogoName, HeaderMenu, HeaderMenuIcon, HeaderMenuItem, HeaderMenuItemBtn, Nav } from './Header.elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../store/actions/authActions';
import { Role, User } from '../../store/entities/User';

function Header(){
    const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [showMenuBtn, setShowMenuBtn] = useState(true);
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  
    const handleMenuClick = () => setShowSideMenu(!showSideMenu);
    const closeMenu = () => setShowSideMenu(false);
  
    const toggleMenuBtn = () => {
      if (window.innerWidth <= 960) {
        setShowMenuBtn(false);
      } else {
        setShowMenuBtn(true);
      }
    };

    const logoutUser = () => {
        dispatch(logoutRequest());
        if(showMenuBtn) {
            closeMenu();
        }
    }
    
    useEffect(() => {
      toggleMenuBtn();
    },[]);

    window.addEventListener('resize', toggleMenuBtn);

    return (
        <Nav>
            <HeaderContainer>
                <HeaderLogoName exact to="/" onClick={closeMenu}>
                    <HeaderLogoIcon />
                    MUNCH
                </HeaderLogoName>
                <HeaderMenuIcon onClick={handleMenuClick}>
                    {showSideMenu ? <FaTimes /> : <FaBars />}
                </HeaderMenuIcon>
                <HeaderMenu onClick={handleMenuClick} showSideMenu={showSideMenu}>
                    <HeaderMenuItem>
                        <HeaderLink exact to="/" onClick={closeMenu}>
                            Home
                        </HeaderLink>
                    </HeaderMenuItem>

                    {isLoggedIn && currUser ? (
                    <>
                        {(currUser.role === Role.ADMIN.value) && (
                            <>
                            <HeaderMenuItem>
                                <HeaderLink exact to="/users" onClick={closeMenu}>
                                    Users
                                </HeaderLink>
                            </HeaderMenuItem>
                            <HeaderMenuItem>
                                <HeaderLink exact to="/services" onClick={closeMenu}>
                                    Services
                                </HeaderLink>
                            </HeaderMenuItem>
                            </>
                        )}

                        {(currUser.role === Role.CUSTOMER.value) && (
                            <HeaderMenuItem>
                                <HeaderLink to="/newsfeed" onClick={closeMenu}>
                                    Newsfeed
                                </HeaderLink>
                            </HeaderMenuItem>
                        )}
                    
                        <HeaderMenuItemBtn>
                            {showMenuBtn ? (
                            <HeaderBtnLink exact to='/' onClick={logoutUser}>
                                <StyledButton>LOGOUT</StyledButton>
                            </HeaderBtnLink>
                            ) : (
                            <HeaderBtnLink exact to='/'>
                                <StyledButton onClick={logoutUser} btnLg>
                                LOGOUT
                                </StyledButton>
                            </HeaderBtnLink>
                            )}
                        </HeaderMenuItemBtn>
                    </>
                    ):(
                    <>
                        <HeaderMenuItem>
                            <HeaderLink exact to="/login" onClick={closeMenu}>
                                Login
                            </HeaderLink>
                        </HeaderMenuItem>
                        <HeaderMenuItemBtn>
                            {showMenuBtn ? (
                            <HeaderBtnLink exact to='/sign-up'>
                                <StyledButton>SIGN UP</StyledButton>
                            </HeaderBtnLink>
                            ) : (
                            <HeaderBtnLink exact to='/sign-up'>
                                <StyledButton onClick={closeMenu} btnLg>
                                SIGN UP
                                </StyledButton>
                            </HeaderBtnLink>
                            )}
                        </HeaderMenuItemBtn>
                    </>
                    )}
                </HeaderMenu>
            </HeaderContainer>
        </Nav>
    )
}

export default Header;
