import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./pages/home/home";
import { NeedsUpload } from "./pages/needsupload/needsupload";
import "./App.css";
import NewAidPackage from "./pages/aidPackage/newAidPackage/NewAidPackage";
import { PackageDetails } from "./pages/packageDetails/packageDetails";
import PledgeStatus from "./pages/pledgeStatus/pledgeStatus";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Switch>
            <Route path="/"> <Home /> </Route>
            <Route path="creation" > <NewAidPackage /> </Route>
            <Route path="needsupload"> <NeedsUpload /> </Route>
            <Route path="packages/:packageId"> <PackageDetails /> </Route>
            <Route path="packages/:packageId/pledge-status" > <PledgeStatus /> </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>@OpenSource.com</div>
      </footer>
    </div>
  );
}

export default App;
