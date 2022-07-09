import React, { useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import "./needUpload.css";
import { AidPackageService } from "apis/services/AidPackageService";
import { toast } from "react-toastify";

export function NeedUpload() {
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
        const response = await AidPackageService.postNeeds(formData);
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
    <Page selection={PageSelection.UPLOAD_NEEDS} className="needsUpload">
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
