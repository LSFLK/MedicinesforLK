import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer } from "react-toastify";
import CreateAidPackage from "./pages/aidPackage/aidPackage";
import Page from "./layout/page";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";
import "react-toastify/dist/ReactToastify.css";
import PledgeService from "./apis/services/PledgeService";
import SupplierService from "./apis/services/SupplierService";
import MedicalNeedsService from "./apis/services/MedicalNeedsService";
import EditPledge from "./pages/editPledge/editPledge";
import PledgeStatus from "./pages/pledgeStatus/pledgeStatus";
import PackageDetails from "./pages/packageDetails/packageDetails";
import SupplierQuotationUpload from "./pages/supplierQuotationUpload/supplierQuotationUpload";
import NeedUpload from "./pages/needUpload/needUpload";
import Home from "./pages/home/home";
import NavBar from "./components/navbar/navbar";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";

import "./App.css";

function App() {
  const { state, httpRequest, signIn } = useAuthContext();
  const [isSigningIn, setIsSigningIn] = useState(true);

  useEffect(() => {
    if (!state.isAuthenticated) {
      signIn().then(() => {
        setIsSigningIn(false);
      });
    } else {
      setIsSigningIn(false);
    }
    const http: Http = new Http(
      httpRequest,
      "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0"
    );
    AidPackageService.http = http;
    MedicalNeedsService.http = http;
    PledgeService.http = http;
    SupplierService.http = http;
  }, [state.isAuthenticated]);

  if (isSigningIn) {
    return (
      <div className="App">
        <SpinnerLoader loaderText="Proceed to Login" />
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Page>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/creation" exact component={CreateAidPackage} />
              <Route path="/needUpload" exact component={NeedUpload} />
              <Route
                path="/packages/:packageId"
                exact
                component={PackageDetails}
              />
              <Route
                exact
                path="/supplierQuotationUpload"
                component={SupplierQuotationUpload}
              />
              <Route
                exact
                path="/packages/:packageId/pledge-status"
                component={PledgeStatus}
              />
              <Route
                exact
                path="/packages/:packageId/pledges/:pledgeId"
                component={EditPledge}
              />
            </Switch>
          </Page>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>
          <p>
            Copyright ©{" "}
            <a href="www.elixir.redcross.lk" className="footer-link">
              elixir.redcross.lk{" "}
            </a>
            | All rights reserved
          </p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}
export default App;
