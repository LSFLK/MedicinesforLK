import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./needUpload.css";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import moment from "moment";
import AidPackageService from "../../apis/services/AidPackageService";

export default function NeedUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    setReceivedDate(moment().format("YYYY-MM-DD"));
  }, []);

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
        const response = await AidPackageService.postNeeds(
          formData,
          moment(receivedDate).valueOf()
        );
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

  const handleReceivedDate = (e: ChangeEvent<HTMLInputElement>) => {
    setReceivedDate(e.target.value);
  };

  return (
    <div className="pageContent">
      <header className="pageHeader">
        <h1>Needs Upload</h1>
      </header>

      <div className="uploadNeedsContainer">
        <form onSubmit={handleSubmit}>
          <p>Select the needs csv file that you want to upload.</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            value={fileName}
          />
          <p>Select the date that the needs list received.</p>
          <input
            type="date"
            onChange={handleReceivedDate}
            value={receivedDate}
          />
          <br />
          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
      <div className="error-list-div">{responseData}</div>
    </div>
  );
}
