import React, { useEffect, useState } from "react";
import "./editThumbnailUrlPrompt.css";
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
  const [thumbnail, setThumbnail] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (aidPackage.thumbnail) {
      setThumbnail(aidPackage.thumbnail);
    }
    setErrorText("");
  }, [aidPackage]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedAidPackage: AidPackage = {
        ...aidPackage,
        thumbnail,
      };
      await onSave(editedAidPackage);
    } catch (e) {
      setErrorText("Something went wrong. Couldn't update the banner.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editDescPrompt">
      <h4>Edit Thumbnail Image URL</h4>
      <div className="infoText">Suggested Img Dimensions: 480 X 480</div>
      <textarea
        value={thumbnail}
        rows={4}
        onChange={(event) => {
          setThumbnail(event.currentTarget.value);
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
