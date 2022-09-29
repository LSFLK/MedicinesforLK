import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer } from "react-toastify";
import Page from "./layout/page";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";
import "react-toastify/dist/ReactToastify.css";
import PledgeService from "./apis/services/PledgeService";
import SupplierService from "./apis/services/QuotationService";
import MedicalNeedsService from "./apis/services/MedicalNeedsService";
import NavBar from "./components/navbar/navbar";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";
import "./App.css";

const Home = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/home/home")
);
const CreateAidPackage = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/aidPackage/aidPackage")
);
const NeedUpload = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/needUpload/needUpload")
);
const PackageDetails = lazy(
  () =>
    import(/* webpackPrefetch: true */ "./pages/packageDetails/packageDetails")
);
const QuotationUpload = lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "./pages/quotationUpload/quotationUpload"
    )
);
const SuppliersUpload = lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "./pages/suppliersUpload/suppliersUpload"
    )
);
const EditPledge = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/editPledge/editPledge")
);

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
      <div>
        <BrowserRouter>
          <Page>
            <Suspense
              fallback={<SpinnerLoader loaderText="Loading the Page" />}
            >
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/creation" exact>
                  <CreateAidPackage />
                </Route>
                <Route path="/needUpload" exact>
                  <NeedUpload />
                </Route>
                <Route path="/packages/:packageId" exact>
                  <PackageDetails />
                </Route>
                <Route exact path="/quotationUpload">
                  <QuotationUpload />
                </Route>
                <Route exact path="/suppliersUpload">
                  <SuppliersUpload />
                </Route>
                <Route exact path="/packages/:packageId/pledges/:pledgeId">
                  <EditPledge />
                </Route>
              </Switch>
            </Suspense>
          </Page>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>
          Copyright ©{" "}
          <a href="www.elixir.redcross.lk" className="footer-link">
            elixir.redcross.lk{" "}
          </a>
          | All rights reserved
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}
export default App;
