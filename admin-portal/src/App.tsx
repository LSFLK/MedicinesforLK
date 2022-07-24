import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer } from "react-toastify";
import CreateAidPackage from "./pages/aidPackage/aidPackage";
import "./App.css";
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

function App() {
  const { httpRequest, signIn, trySignInSilently } = useAuthContext();
  const [isSigningIn, setIsSigningIn] = useState(true);

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
      .finally(() => {
        setIsSigningIn(false);
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

  if (isSigningIn) {
    return <p>Loading...</p>;
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
              <Route path="/" element={<Home />} />
              <Route path="/creation" element={<CreateAidPackage />} />
              <Route path="/needUpload" element={<NeedUpload />} />
              <Route path="/packages/:packageId" element={<PackageDetails />} />
              <Route
                path="/supplierQuotationUpload"
                element={<SupplierQuotationUpload />}
              />
              <Route
                path="/packages/:packageId/pledge-status"
                element={<PledgeStatus />}
              />
              <Route
                path="/packages/:packageId/pledges/:pledgeId"
                element={<EditPledge />}
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
