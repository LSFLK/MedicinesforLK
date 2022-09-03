import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer } from "react-toastify";
import Page from "./layout/page";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";
import "react-toastify/dist/ReactToastify.css";
import PledgeService from "./apis/services/PledgeService";
import SupplierService from "./apis/services/SupplierService";
import MedicalNeedsService from "./apis/services/MedicalNeedsService";
import NavBar from "./components/navbar/navbar";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";

const Home = lazy(() => import(/* webpackPrefetch: true */"./pages/home/home"))
const CreateAidPackage = lazy(() => import(/* webpackPrefetch: true */"./pages/aidPackage/aidPackage"))
const NeedUpload = lazy(() => import(/* webpackPrefetch: true */"./pages/needUpload/needUpload"))
const PackageDetails = lazy(() => import(/* webpackPrefetch: true */"./pages/packageDetails/packageDetails"))
const SupplierQuotationUpload = lazy(() => import(/* webpackPrefetch: true */"./pages/supplierQuotationUpload/supplierQuotationUpload"))
const PledgeStatus = lazy(() => import(/* webpackPrefetch: true */"./pages/pledgeStatus/pledgeStatus"))
const EditPledge = lazy(() => import(/* webpackPrefetch: true */"./pages/editPledge/editPledge"))

import "./App.css";

function App() {
  const { state, httpRequest, trySignInSilently, signIn } = useAuthContext();
  const { isAuthenticated, isLoading } = state;

  useEffect(() => {
    const http: Http = new Http(
      httpRequest,
      `${process.env.REACT_APP_ADMIN_BACKEND_URL}`
    );
    AidPackageService.http = http;
    MedicalNeedsService.http = http;
    PledgeService.http = http;
    SupplierService.http = http;
  }, []);

  useEffect(() => {
    if (isAuthenticated || isLoading) {
      return;
    }

    trySignInSilently()
      .then((response: boolean | BasicUserInfo) => {
        if (!response) {
          signIn();
        }
      })
      .catch(() => {
        signIn();
      });
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated) {
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
            <Suspense fallback={<SpinnerLoader loaderText="Loading the Page" />}>
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
            </Suspense>
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
