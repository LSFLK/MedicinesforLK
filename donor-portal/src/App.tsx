import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import FullBleedContainer from "./pages/layout/full-bleed-container";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import Donors from "./pages/donors";
import Suppliers from "./pages/suppliers";
import DonateNow from "./pages/donate-now";
import "./App.css";
import AidPackageDetailsPage from "./pages/package";
import NewsRoom from "./pages/newsroom";
import UserContext from "./userContext";
import Http from "./apis/httpCommon";
import AidPackageService from "./apis/services/AidPackageService";

function App() {
  const { httpRequest, trySignInSilently } = useAuthContext();
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("loggedInUserId");
  //   if (storedUserId) setLoggedInUserId(storedUserId);
  // }, []);

  useEffect(() => {
    trySignInSilently()
      .then((response: any) => {
        if (response && response.userid) {
          setLoggedInUserId(response.userid);
        }
      })
      .catch(() => {
        // TODO: add a toaster here to say login failed.
        setLoggedInUserId(null);
      })
      .finally(() => {
        // setLoggedInUserId(false);
      });
    const adminHttp: Http = new Http(
      httpRequest,
      "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0"
    );
    const donorHttp: Http = new Http(
      httpRequest,
      "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/donor-api/1.0.0"
    );
    AidPackageService.adminHttp = adminHttp;
    AidPackageService.donorHttp = donorHttp;
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={loggedInUserId}>
        <BrowserRouter>
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
            <Route exact path="/donors">
              <Donors />
            </Route>
            <Route exact path="/suppliers">
              <Suppliers />
            </Route>
            <Route exact path="/package/:id">
              <AidPackageDetailsPage />
            </Route>
            <Route exact path="/donate-now">
              <DonateNow />
            </Route>
            <Route exact path="/news-room">
              <NewsRoom />
            </Route>
          </Switch>
          <FullBleedContainer>
            <Footer />
          </FullBleedContainer>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
