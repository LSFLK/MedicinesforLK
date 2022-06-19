import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Donors } from "./pages/donors"
import { Suppliers } from "./pages/suppliers"
import "./App.css";

function App() {
  return (
    <div className="App">
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
        </Routes>
        <footer className="footer footer--dark">
          <div>@OpenSource.com</div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
