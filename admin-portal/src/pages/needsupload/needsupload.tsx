import React from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "layout/page";

import "./needsupload.css";

interface NeedsUploadPageProps {}
const changeHandler = () => {
  // setSelectedFile(event.target.files[0]);
  // setIsSelected(true);
};

const handleSubmission = () => {};

export function NeedsUpload(params: NeedsUploadPageProps) {
  return (
    <Page selection={PageSelection.UPLOAD_NEEDS}>
      <div className="pageContent">
        <header className="pageHeader">
          <h1>Needs Upload</h1>
        </header>

        <div className="uploadNeedsContainer">
          <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </div>
    </Page>
  );
}
