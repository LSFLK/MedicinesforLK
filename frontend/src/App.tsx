import React from 'react';

import './App.css';
import { NavBar } from './components';
import { Page } from './pages/page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className='main-wrapper'>
        <Page />
      </div>
      <footer className='footer footer--dark'>
        <div>@OpenSource.com</div>
      </footer>
    </div>
  );
}

export default App;
