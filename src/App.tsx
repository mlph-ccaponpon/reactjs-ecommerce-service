import React from 'react';
import Header from './components/header/Header';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
    </div>
  )
}


export default App;
