import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import GlobalStyle from './styles/global';
import routes from './utils/routes/routes';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  if(isLoading) return <Loading />;
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
