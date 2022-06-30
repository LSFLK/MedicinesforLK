import React, {useState} from 'react';
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";
import http from "../../apis/httpCommon"
import "./needsUpload.css";

export function NeedsUpload() {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("")

  function handleChange(event: any) {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }
  
  function handleSubmit(event: any) {
    event.preventDefault()
    const formData = new FormData();
    if(file!=undefined){
      formData.append('file', file);
      formData.append('fileName', fileName);

    }
    
  }

  return (
    <Page selection={PageSelection.UPLOAD_NEEDS}>
      <div className="pageContent">
        <header className="pageHeader">
          <h1>Needs Upload</h1>
        </header>

        <div className="uploadNeedsContainer">
        <form onSubmit={handleSubmit}>
          <p>Select the needs csv file that you want to upload.</p>
          <input type="file" accept=".csv" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        </div>
      </div>
    </Page>
  );
}
