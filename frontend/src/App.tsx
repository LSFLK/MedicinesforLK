import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { NavBar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import "./App.css";
import { PackageCreation } from './pages/packageCreation/package_creation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className='main-wrapper'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="creation" element={<PackageCreation />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer className='footer footer--dark'>
        <div>@OpenSource.com</div>
      </footer>
    </div>
  );
}

export default App;
