import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <NavBar />
        </header>
        <Switch>
          <Route path="/"> <Home /> </Route>
          <Route path="login"> <Login /> </Route>
          <Route path="about-us"> <AboutUs /> </Route>
        </Switch>
        <footer className="footer footer--dark">
          <div>@OpenSource.com</div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
