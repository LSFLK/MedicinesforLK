import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import "./needUpload.css";
import { AidPackageService } from "apis/services/AidPackageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NeedUpload() {
  const [file, setFile] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  function handleChange(event: any) {
    setErrorList([]);
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    if (file != undefined) {
      formData.append("file", file);
      AidPackageService.postNeeds(formData)
        .then((response) => {
          toast.success(response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          navigate("/");
        })
        .catch((error) => {
          toast.error("File upload unsuccessful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          const data = error.response.data
            .split(/\r?\n/)
            .filter((element: any) => element);
          setErrorList(data);
        });
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
            <input type="file" accept=".csv" onChange={handleChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className="error-list-div">
          {errorList.length > 0 &&
            errorList.map((error: any) => <p>{error}</p>)}
        </div>
      </div>
    </Page>
  );
}
