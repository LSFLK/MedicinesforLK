import React, { useState, ChangeEvent, FormEvent } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import "./supplierQuotationUpload.css";
import { SupplierService } from "apis/services/SupplierService";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

export function SupplierQuotationUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [errorList, setErrorList] = useState<string[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setErrorList([]);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
    setFileName(event.target.value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (file) {
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
        });
        setFileName("");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError<string>;
          toast.error("File upload unsuccessful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          if (error.response) {
            const data = error.response.data.split(/\r?\n/);
            setErrorList(data);
          }
        }
      }
    } else {
      toast.warn("Please select a file to upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
            errorList.map((error: string) => <p key={error}>{error}</p>)}
        </div>
      </div>
    </Page>
  );
}
