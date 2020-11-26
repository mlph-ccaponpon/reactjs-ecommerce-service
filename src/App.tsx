import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import { authChannelRequest } from './store/actions/authActions';
import GlobalStyle from './styles/global';
import routes from './utils/routes/routes';

function App() {
  const isLoadingPage =  useSelector((state: RootStateOrAny) => state.auth.isLoadingPage);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const checkUserAuth = () => {
    // Checks if user is logged in or logged out
    dispatch(authChannelRequest());
  }
  useEffect(() => {
    checkUserAuth();
  }, []);

  if(isLoadingPage) return <Loading />;
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch key={location.pathname} location={location}>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path} 
              exact={route.exact} 
              component={route.component} />
          )
        })}
      </Switch>
    </div>
  )
}


export default App;
