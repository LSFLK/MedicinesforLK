import React, { useEffect, useState } from "react";
import "./editDescriptionPrompt.css";
import { AidPackage } from "../../../../types/AidPackage";

interface EditDescriptionPromptProps {
  aidPackage: AidPackage;
  onSave: (editedAidPackage: AidPackage) => Promise<void>;
}

export default function EditDescriptionPrompt({
  aidPackage,
  onSave,
}: EditDescriptionPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (aidPackage.description) {
      setDescription(aidPackage.description);
    }
    setErrorText("");
  }, [aidPackage]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedAidPackage: AidPackage = {
        ...aidPackage,
        description,
      };
      await onSave(editedAidPackage);
    } catch (e) {
      setErrorText("Something went wrong. Couldn't edit the description.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editDescPrompt">
      <h4>Edit Description</h4>
      <textarea
        value={description}
        rows={4}
        onChange={(event) => {
          setDescription(event.currentTarget.value);
        }}
      />
      {errorText && <div className="errorText">{errorText}</div>}
      <div>
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSaveButtonClick}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
