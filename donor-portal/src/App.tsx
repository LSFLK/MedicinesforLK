import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
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
        </Routes>
        <footer className="footer footer--dark">
          <div>@OpenSource.com</div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
