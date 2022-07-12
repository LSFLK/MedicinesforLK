import React, { useEffect } from "react";
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

function App() {
  const { httpRequest, signIn, trySignInSilently } = useAuthContext();

  useEffect(() => {
    trySignInSilently()
      .then((response) => {
        if (!response) {
          signIn();
        }
      })
      .catch(() => {
        signIn();
      });
    const http: Http = new Http(
      httpRequest,
      "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0"
    );
    AidPackageService.http = http;
    MedicalNeedsService.http = http;
    PledgeService.http = http;
    SupplierService.http = http;
  }, []);

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
                path="/packages/:packageId/pledge-status/pledges/:pledgeId"
                component={EditPledge}
              />
            </Switch>
          </Page>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>@OpenSource.com</div>
      </footer>
      <ToastContainer />
    </div>
  );
}
export default App;
