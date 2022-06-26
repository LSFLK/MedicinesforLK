import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/navbar";
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
          <NavBar />
        </header>
        <Switch>
          <Route path="/"> <Home /> </Route>
          <Route path="login"> <Login /> </Route>
          <Route path="about-us"> <AboutUs /> </Route>
          <Route path="donors" > <Donors /> </Route>
          <Route path="suppliers" > <Suppliers /> </Route>
          <Route path="/package/:id" > <AidPackageDetailsPage /> </Route>
          <Route path="donate-now" > <DonateNow /> </Route>
        </Switch>
        <footer className="footer footer--dark">
          <div>@OpenSource.com</div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
