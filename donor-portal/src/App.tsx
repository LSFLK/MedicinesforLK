import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import UserContext from "./userContext";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";
import SpinnerLoader from "./components/spinnerLoader/spinnerLoader";

const Home = lazy(() => import(/* webpackPrefetch: true */"./pages/home"))
const AboutUs = lazy(() => import(/* webpackPrefetch: true */"./pages/about-us"))
const Suppliers = lazy(() => import(/* webpackPrefetch: true */"./pages/suppliers"))
const AidPackageDetailsPage = lazy(() => import(/* webpackPrefetch: true */"./pages/package"))
const DonateNowPage = lazy(() => import(/* webpackPrefetch: true */"./pages/donate-now"))
const NewsRoom = lazy(() => import(/* webpackPrefetch: true */"./pages/newsroom"))

function App() {
  const { state, httpRequest, getDecodedIDToken } = useAuthContext();
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    if (state.isAuthenticated)
      getDecodedIDToken().then((value) => {
        if (value && value.sub) setLoggedInUserId(value.sub);
      });
    AidPackageService.donorHttp = new Http(
      httpRequest,
      `${process.env.REACT_APP_DONOR_BACKEND_URL}`
    );
    AidPackageService.adminHttp = new Http(
      httpRequest,
      `${process.env.REACT_APP_ADMIN_BACKEND_URL}`
    );
  }, [state.isAuthenticated]);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="App">
      <UserContext.Provider value={loggedInUserId}>
        <header className="App-header">
          <NavBar />
        </header>
        <Suspense fallback={<SpinnerLoader loaderText="Loading the Page" />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/suppliers">
              <Suppliers />
            </Route>
            <Route exact path="/package/:id">
              <AidPackageDetailsPage />
            </Route>
            <Route exact path="/donate-now">
              <DonateNowPage />
            </Route>
            <Route exact path="/news-room">
              <NewsRoom />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
