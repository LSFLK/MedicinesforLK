import React, { useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import "./supplierQuotationUpload.css";
import { SupplierService } from "apis/services/SupplierService";

export function SupplierQuotationUpload() {
  const [file, setFile] = useState();

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    if (file != undefined) {
      formData.append("file", file);
      const data = await SupplierService.postQuotation(formData);
      console.log(data);
    } else {
      alert("Please select a file");
    }
  };

  return (
    <div className="pageContent">
      <header className="pageHeader">
        <h1>Supplier Quotation Upload</h1>
      </header>

      <div className="uploadSupplierQuotationContainer">
        <form onSubmit={handleSubmit}>
          <p>Select the needs csv file that you want to upload.</p>
          <input type="file" accept=".csv" onChange={handleChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
