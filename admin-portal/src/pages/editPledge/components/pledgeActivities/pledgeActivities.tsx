import React, { useState } from "react";
import { PledgeActivity } from "../../../../types/PledgeActivity";
import "./pledgeActivities.css";

const moment = require("moment");

interface PledgeActivityProps {
  activities: PledgeActivity[];
  onEditActivityButtonClick: (activity: PledgeActivity) => void;
  onDeleteActivityButtonClick: (activity: PledgeActivity) => void;
  onNewActivity: (text: string) => Promise<void>;
}

export default function PledgeActivities({
  activities,
  onEditActivityButtonClick,
  onDeleteActivityButtonClick,
  onNewActivity,
}: PledgeActivityProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [newActivityText, setNewActivityText] = useState("");

  const handleSave = async () => {
    setIsCommenting(true);
    try {
      await onNewActivity(newActivityText);
      setNewActivityText("");
    } finally {
      setIsCommenting(false);
    }
  };
  return (
    <div className="pledgeActivity">
      <p className="heading">Activity:</p>
      <div className="newActivity">
        <textarea
          rows={4}
          value={newActivityText}
          onChange={(event) => {
            setNewActivityText(event.currentTarget.value);
          }}
        />
        <div>
          <button type="button" onClick={handleSave}>
            {isCommenting ? "Commenting..." : "Comment"}
          </button>
        </div>
      </div>
      <div className="activities">
        {activities.map((activity) => (
          <div key={activity.pledgeUpdateID} className="activity">
            <p className="activityDate">
              {moment(activity.dateTime).format("LLL")}
            </p>
            <div className="content">
              <span className="text">{activity.updateComment}</span>
              <div className="actions">
                <button
                  type="button"
                  onClick={() => onEditActivityButtonClick(activity)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteActivityButtonClick(activity)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div />
      </div>
    </div>
  );
}
