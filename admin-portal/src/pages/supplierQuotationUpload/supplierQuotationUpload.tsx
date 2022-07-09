import React, { useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import "./supplierQuotationUpload.css";
import { SupplierService } from "apis/services/SupplierService";
import { toast } from "react-toastify";

export function SupplierQuotationUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorList, setErrorList] = useState([]);

  function handleChange(event: any) {
    setErrorList([]);
    setFile(event.target.files[0]);
    setFileName(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();

    if (file != undefined) {
      formData.append("file", file);
      try {
        const response = await SupplierService.postQuotation(formData);
        toast.success(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFileName("");
      } catch (e: any) {
        toast.error("File upload unsuccessful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const data = e.response.data
          .split(/\r?\n/)
          .filter((element: any) => element);
        setErrorList(data);
      }
    } else {
      toast.warn("Please select a file to upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Page
      selection={PageSelection.UPLOAD_SUPPLIERS}
      className="supplierQuotaionUpload"
    >
      <div className="pageContent">
        <header className="pageHeader">
          <h1>Supplier Quotation Upload</h1>
        </header>

        <div className="uploadSupplierQuotationContainer">
          <form onSubmit={handleSubmit}>
            <p>Select the needs csv file that you want to upload.</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleChange}
              value={fileName}
            />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className="error-list-div">
          {errorList.length > 0 &&
            errorList.map((error: string) => <p>{error}</p>)}
        </div>
      </div>
    </Page>
  );
}
