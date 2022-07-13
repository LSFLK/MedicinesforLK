import React from "react";
import { AidPackageUpdateComment } from "../../../../types/AidPackageUpdateComment";
import "./styles.css";
import moment from "moment";

interface UpdateCommentsProps {
  comments: AidPackageUpdateComment[];
}

export default function UpdateComments({ comments }: UpdateCommentsProps) {
  return (
    <div className="updateComments">
      <p className="heading">Updates</p>
      <div>
        {comments.length == 0 && <p>No updates posted yet.</p>}
        {comments.map((post) => (
          <div key={post.packageUpdateID} className="comment">
            <p className="date">{moment(post.dateTime).format("LLL")}</p>
            <div className="content">
              <span className="text">{post.updateComment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
