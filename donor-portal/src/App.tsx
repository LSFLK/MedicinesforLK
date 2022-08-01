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
import IndividualDonors from "./pages/donors/individual-donors";
import MedicalNeeds from "./pages/medical-needs";

function App() {
  const { state, httpRequest, getDecodedIDToken } = useAuthContext();
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    if (state.isAuthenticated)
      getDecodedIDToken().then((value) => {
        if (value && value.sub) setLoggedInUserId(value.sub);
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
  }, [state.isAuthenticated]);

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
            <Route exact path="/donors/individual">
              <IndividualDonors />
            </Route>
            <Route exact path="/medical-needs">
              <MedicalNeeds />
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
