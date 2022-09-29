import React, { useState, ChangeEvent, FormEvent } from "react";
import "./quotationUpload.css";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import QuotationService from "../../apis/services/QuotationService";

export default function QuotationUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setResponseData("");
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
        const response = await QuotationService.postQuotation(formData);
        toast.success("File uploaded successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFileName("");
        setResponseData(response.data);
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
            setResponseData(error.response.data);
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
    <div className="pageContent">
      <header className="pageHeader">
        <h1>Quotation Upload</h1>
      </header>

      <div className="uploadSupplierQuotationContainer">
        <form onSubmit={handleSubmit}>
          <p>Select the quotation csv file that you want to upload.</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            value={fileName}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="error-list-div">{responseData}</div>
    </div>
  );
}
