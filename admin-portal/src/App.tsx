import React, { useEffect, useState, CSSProperties } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./pages/home/home";
import { NeedUpload } from "./pages/needUpload/needUpload";
import { CreateAidPackage } from "pages/aidPackage/aidPackage";
import { SupplierQuotationUpload } from "./pages/supplierQuotationUpload/supplierQuotationUpload";
import { PackageDetails } from "./pages/packageDetails/packageDetails";
import PledgeStatus from "./pages/pledgeStatus/pledgeStatus";
import EditPledge from "./pages/editPledge/editPledge";
import "./App.css";
import { Page } from "layout/page";
import { useAuthContext } from "@asgardeo/auth-react";
import Http from "apis/httpCommon";
import { AidPackageService } from "apis/services/AidPackageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MedicalNeedsService } from "apis/services/MedicalNeedsService";
import { PledgeService } from "apis/services/PledgeService";
import { SupplierService } from "apis/services/SupplierService";
import HashLoader from "react-spinners/HashLoader";
import LoadingOverlay from 'react-loading-overlay-ts';  

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const { state, httpRequest, signIn, trySignInSilently } = useAuthContext();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    trySignInSilently()
      .then((response) => {
        if (!response) {
          signIn();
        }
      })
      .catch(() => {
        signIn();
      })
    const http: Http = new Http(
      httpRequest,
      "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0"
    );
    AidPackageService.http = http;
    MedicalNeedsService.http = http;
    PledgeService.http = http;
    SupplierService.http = http;
  }, []);

  useEffect(() => {
    if(state.isAuthenticated){
      setLoading(false);
    }
  });
  
  return (
    <div className="App">
      <LoadingOverlay active={loading} spinner={<HashLoader color={'#09d3ac'} loading={loading} cssOverride={override} size={50} />}   >
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Page>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/creation" component={CreateAidPackage} />
              <Route exact path="/needUpload" component={NeedUpload} />
              <Route
                exact
                path="/packages/:packageId"
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
      </LoadingOverlay>
    </div>
  );
}
export default App;
