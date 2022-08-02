import React, { useState } from "react";
import "./deleteAidPackagePrompt.css";
import { useHistory } from "react-router-dom";
import { AidPackage } from "../../../../types/AidPackage";

interface EditStatusPostPromptProps {
  aidPackage: AidPackage;
  onSave: () => Promise<void>;
}

export default function DeleteAidPackagePrompt({
  aidPackage,
  onSave,
}: EditStatusPostPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [errorText, setErrorText] = useState("");
  const history = useHistory();

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      await onSave();
      history.push("/");
    } catch (e) {
      setErrorText("Something went wrong. Couldn't delete the aid package.");
    }
    setIsSaving(false);
  };

  return (
    <div className="deleteAidPackagePrompt">
      <h4>Delete Aid Package</h4>
      <p>Are you sure you want to delete {aidPackage.name}</p>
      {errorText && <div className="errorText">{errorText}</div>}
      <div>
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSaveButtonClick}
        >
          {isSaving ? "Saving..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
