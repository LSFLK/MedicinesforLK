import React from "react";
import moment from "moment";
import { AidPackageUpdateComment } from "../../../../types/AidPackageUpdateComment";
import "./styles.css";

interface UpdateCommentsProps {
  comments: AidPackageUpdateComment[];
}

export default function UpdateComments({ comments }: UpdateCommentsProps) {
  return (
    <div className="updateComments">
      <p className="heading">Updates</p>
      <div>
        {comments.length === 0 && <p>No updates posted yet.</p>}
        {comments
          .sort(
            (currentComment, nextComment) =>
              nextComment.dateTime - currentComment.dateTime
          )
          .map((post) => (
            <div key={post.dateTime} className="comment">
              <p className="date">
                {post.dateTime &&
                  moment
                    .unix(post.dateTime)
                    .local()
                    .format("YYYY-MM-DD hh:mm A")}
              </p>
              <div className="content">
                <span className="text">{post.updateComment}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
