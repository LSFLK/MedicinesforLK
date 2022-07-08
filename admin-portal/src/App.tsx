import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./pages/home/home";
import { NeedsUpload } from "./pages/needsupload/needsupload";
import { CreateAidPackage } from "pages/aidPackage/aidPackage";
import { PackageDetails } from "./pages/packageDetails/packageDetails";
import PledgeStatus from "./pages/pledgeStatus/pledgeStatus";
import EditPledge from "./pages/editPledge/editPledge";
import "./App.css";
import { Page } from "layout/page";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Page>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/creation" component={CreateAidPackage} />
              <Route path="/needsupload" component={NeedsUpload} />
              <Route path="/packages/:packageId" component={PackageDetails} />
              <Route path="/packages/:packageId/pledge-status" component={PledgeStatus} />
              <Route path="/packages/:packageId/pledge-status/pledges/:pledgeId" component={EditPledge} />
            </Switch>
          </Page>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>@OpenSource.com</div>
      </footer>

    </div>
  );
}

export default App;
