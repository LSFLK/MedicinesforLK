import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./pages/home/home";
import { NeedsUpload } from "./pages/needsupload/needsupload";
import { AidPackage } from "pages/aidPackage/aidPackage";
import { PackageDetails } from "./pages/packageDetails/packageDetails";
import "./App.css";

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
            <Route path="creation" element={<AidPackage />} />
            <Route path="needsupload" element={<NeedsUpload />} />
            <Route path="packages/:packageId" element={<PackageDetails />} />
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
