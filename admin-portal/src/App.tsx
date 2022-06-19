import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./pages/home/home";
import { NeedsUpload } from "./pages/needsupload/needsupload";
import "./App.css";
import NewAidPackage from "./pages/aidPackage/newAidPackage/NewAidPackage";
import {PackageDetails} from "./pages/packageDetails/packageDetails";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="creation" element={<NewAidPackage />} />
            <Route path="needsupload" element={<NeedsUpload />} />
            <Route path="package/:packageId" element={<PackageDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>@OpenSource.com</div>
      </footer>
    </div>
  );
}

export default App;
