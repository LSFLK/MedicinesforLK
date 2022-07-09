import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FullBleedContainer } from "./pages/layout/full-bleed-container";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Donors } from "./pages/donors";
import { Suppliers } from "./pages/suppliers";
import { DonateNow } from "./pages/donate-now";
import "./App.css";
import { AidPackageDetailsPage } from "./pages/package";
import { NewsRoom } from "./pages/newsroom";
import {useEffect, useState} from "react";
import UserContext from "./userContext";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="donors" element={<Donors />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="/package/:id" element={<AidPackageDetailsPage />} />
            <Route path="donate-now" element={<DonateNow />} />
            <Route path="news-room" element={<NewsRoom />} />
          </Routes>
          <FullBleedContainer>
            <Footer />
          </FullBleedContainer>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
