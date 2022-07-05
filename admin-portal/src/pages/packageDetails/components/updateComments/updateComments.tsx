import React, { useState } from "react";
import "./updatecomments.css";
import { AidPackageUpdateComment } from "../../../../types/AidPackageUpdateComment";

interface UpdateCommentsProps {
  posts: AidPackageUpdateComment[];
  onNewComment: (text: string) => Promise<void>;
  onEditPostButtonClick: (post: AidPackageUpdateComment) => void;
  onDeletePostButtonClick: (post: AidPackageUpdateComment) => void;
}

export default function UpdateComments({
  posts,
  onNewComment,
  onEditPostButtonClick,
  onDeletePostButtonClick,
}: UpdateCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleNewPostButtonClick = async () => {
    setIsCommenting(true);
    try {
      await onNewComment(newComment);
      setNewComment("");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="updateComments">
      <p className="heading">Post Comment</p>
      <div className="newComment">
        <textarea
          value={newComment}
          rows={4}
          onChange={(event) => setNewComment(event.currentTarget.value)}
        />
        <div>
          <button onClick={handleNewPostButtonClick}>
            {isCommenting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
      <div className="comment">
        {posts.map((post) => (
          <div key={post.packageUpdateId} className="post">
            <p className="date">{post.dateTime}</p>
            <div className="content">
              <span className="text">{post.updateComment}</span>
              <div className="actions">
                <button onClick={() => onEditPostButtonClick(post)}>
                  Edit
                </button>
                <button onClick={() => onDeletePostButtonClick(post)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}
