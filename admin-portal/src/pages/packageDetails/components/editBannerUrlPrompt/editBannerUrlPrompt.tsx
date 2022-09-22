import React, { useEffect, useState } from "react";
import "./editBannerUrlPrompt.css";
import { AidPackage } from "../../../../types/AidPackage";

interface EditBannerUrlPromptProps {
  aidPackage: AidPackage;
  onSave: (editedAidPackage: AidPackage) => Promise<void>;
}

export default function EditBannerUrlPrompt({
  aidPackage,
  onSave,
}: EditBannerUrlPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [banner, setBanner] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (aidPackage.banner) {
      setBanner(aidPackage.banner);
    }
    setErrorText("");
  }, [aidPackage]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedAidPackage: AidPackage = {
        ...aidPackage,
        banner,
      };
      await onSave(editedAidPackage);
    } catch (e) {
      setErrorText("Something went wrong. Couldn't update the banner.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editDescPrompt">
      <h4>Edit Image URL</h4>
      <textarea
        value={banner}
        rows={4}
        onChange={(event) => {
          setBanner(event.currentTarget.value);
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
