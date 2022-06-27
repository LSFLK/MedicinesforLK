import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FullBleedContainer } from "./pages/layout/full-bleed-container";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer"
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Donors } from "./pages/donors"
import { Suppliers } from "./pages/suppliers"
import { DonateNow } from "./pages/donate-now";
import "./App.css";
import { AidPackageDetailsPage } from "./pages/package";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <NavBar/>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="donors" element={<Donors />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="/package/:id" element={<AidPackageDetailsPage />} />
          <Route path="donate-now" element={<DonateNow />} />
        </Routes>
        <FullBleedContainer>
          <Footer/>
        </FullBleedContainer>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
