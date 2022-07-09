import { BrowserRouter, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/about-us"> <AboutUs /> </Route>
          <Route exact path="/donors" > <Donors /> </Route>
          <Route exact path="/suppliers" > <Suppliers /> </Route>
          <Route exact path="/package/:id" > <AidPackageDetailsPage /> </Route>
          <Route exact path="/donate-now" > <DonateNow /> </Route>
          <Route exact path="/news-room"> <NewsRoom /> </Route>
        </Switch>
        <FullBleedContainer>
          <Footer />
        </FullBleedContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
