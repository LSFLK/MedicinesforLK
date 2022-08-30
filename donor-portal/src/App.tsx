import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import Suppliers from "./pages/suppliers";
import "./App.css";
import AidPackageDetailsPage from "./pages/package";
import NewsRoom from "./pages/newsroom";
import UserContext from "./userContext";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";
import DonateNowPage from "./pages/donate-now";

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
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
