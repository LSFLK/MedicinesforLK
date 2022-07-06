import React from "react";
import "./updatecomments.css";
import {AidPackageUpdateComment} from "../../../../../types/AidPackageUpdateComment";

interface UpdateCommentsProps {
  posts: AidPackageUpdateComment[];
}

export default function UpdateComments({
  posts,
}: UpdateCommentsProps) {

  return (
    <div className="updateComments">
      <p className="heading">Updates</p>
      <div className="comment">
        {posts.map((post) => (
          <div key={post.packageUpdateID} className="post">
            <p className="date">{post.dateTime}</p>
            <div className="content">
              <span className="text">{post.updateComment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
