import React, { useEffect, useState } from "react";
import "./editUpdateCommentPrompt.css";
import { AidPackageUpdateComment } from "../../../../types/AidPackageUpdateComment";

interface EditStatusPostPromptProps {
  comment: AidPackageUpdateComment;
  onSave: (comment: AidPackageUpdateComment) => Promise<void>;
}

export default function EditUpdateCommentPrompt({
  comment,
  onSave,
}: EditStatusPostPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (comment) {
      setUpdateComment(comment.updateComment);
    }
    setErrorText("");
  }, [comment]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedComment: AidPackageUpdateComment = {
        ...comment,
        updateComment: updateComment,
      };
      await onSave(editedComment);
    } catch (e) {
      setErrorText("Something went wrong. Couldn' edit the post.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editUpdateCommentPrompt">
      <h4>Edit status</h4>
      <textarea
        value={updateComment}
        rows={4}
        onChange={(event) => {
          setUpdateComment(event.currentTarget.value);
        }}
      />
      {errorText && <div className="errorText">{errorText}</div>}
      <div>
        <button disabled={isSaving} onClick={handleSaveButtonClick}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
