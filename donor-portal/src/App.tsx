import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import IndividualDonors from "./pages/donors/individual-donors";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedInUserId");
    if (storedUserId) setLoggedInUserId(storedUserId);
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
            <Route exact path="/donors/individual">
              <IndividualDonors />
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
