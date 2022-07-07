import React, { useEffect, useState } from "react";
import "./editActivityPrompt.css";
import { PledgeActivity } from "../../../../types/PledgeActivity";

interface EditActivityPromptProps {
  activity: PledgeActivity;
  onSave: (activity: PledgeActivity) => Promise<void>;
}

export default function EditActivityPrompt({
  activity,
  onSave,
}: EditActivityPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (activity) {
      setText(activity.updateComment);
    }
    setErrorText("");
  }, [activity]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedActivity: PledgeActivity = {
        ...activity,
        updateComment: text,
      };
      await onSave(editedActivity);
    } catch (e) {
      setErrorText("Something went wrong. Couldn' edit the activity.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editActivityPrompt">
      <h4>Edit Activity</h4>
      <textarea
        value={text}
        rows={4}
        onChange={(event) => {
          setText(event.currentTarget.value);
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
