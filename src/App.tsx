import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Switch, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import PageNotFound from './pages/page-not-found/PageNotFound';
import { authChannelRequest } from './store/actions/authActions';
import { Role, User } from './store/entities/User';
import GlobalStyle from './styles/global';
import AnimatedRoute from './utils/routes/AnimatedRoute';
import AuthRoleRoute from './utils/routes/AuthRoleRoute';
import GuestRoute from './utils/routes/GuestRoute';
import routes from './utils/routes/routes';

function App() {
  const isLoadingPage =  useSelector((state: RootStateOrAny) => state.auth.isLoadingPage);
  const currUser: User = useSelector((state: RootStateOrAny) => state.auth.currUser);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const checkUserAuth = () => {
    // Checks if user is logged in or logged out
    dispatch(authChannelRequest());
  }
  useEffect(() => {
    checkUserAuth();
  }, []);

  if(isLoadingPage && currUser === null) return <Loading />;
  return (
    <>
      <GlobalStyle />
      <Header />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch key={location.pathname} location={location}>
          {routes.map((route, index) => {
            if(route.protected?.includes(Role.GUEST.value)) {
              return (
                <GuestRoute
                    currUser={currUser}
                    key={index}
                    path={route.path} 
                    exact={route.exact}>
                        <route.component />
                </GuestRoute>
              )
            }
            if(route.protected !== null) {
              return (
                <AuthRoleRoute
                    currUser={currUser}
                    roleList={route.protected}
                    key={index}
                    path={route.path} 
                    exact={route.exact}>
                        <route.component />
                </AuthRoleRoute>
              )
            }
           
            return (
              <AnimatedRoute 
                  key={index}
                  path={route.path} 
                  exact={route.exact}>
                    <route.component />
              </AnimatedRoute>
            )
          })}

          <AnimatedRoute path="*">
              <PageNotFound />
          </AnimatedRoute>
        </Switch>
      </AnimatePresence>
    </>
  )
}


export default App;
