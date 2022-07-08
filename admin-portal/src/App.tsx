import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./pages/home/home";
import { NeedUpload } from "./pages/needUpload/needUpload";
import { CreateAidPackage } from "pages/aidPackage/aidPackage";
import { SupplierQuotationUpload } from "./pages/supplierQuotationUpload/supplierQuotationUpload";
import { PackageDetails } from "./pages/packageDetails/packageDetails";
import PledgeStatus from "./pages/pledgeStatus/pledgeStatus";
import EditPledge from "./pages/editPledge/editPledge";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="main-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="creation" element={<CreateAidPackage />} />
            <Route path="needUpload" element={<NeedUpload />} />
            <Route path="packages/:packageId" element={<PackageDetails />} />
            <Route
              path="supplierQuotationUpload"
              element={<SupplierQuotationUpload />}
            />
            <Route
              path="packages/:packageId/pledge-status"
              element={<PledgeStatus />}
            />
            <Route
              path="packages/:packageId/pledge-status/pledges/:pledgeId"
              element={<EditPledge />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <footer className="footer footer--dark">
        <div>@OpenSource.com</div>
      </footer>
      <ToastContainer />
    </div>
  );
}
export default App;
