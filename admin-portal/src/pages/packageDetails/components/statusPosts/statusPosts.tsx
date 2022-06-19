import React, {useState} from "react";
import './statusPosts.css';
import {DonorAidPackageStatusPost} from "../../../../types/DonorAidPackageStatusPost";


interface StatusPostsProps {
  posts: DonorAidPackageStatusPost[];
  onNewPost: (text: string) => Promise<void>;
  onEditPostButtonClick: (post: DonorAidPackageStatusPost) => void;
  onDeletePostButtonClick: (post: DonorAidPackageStatusPost) => void;
}

export default function StatusPosts({
                                      posts,
                                      onNewPost,
                                      onEditPostButtonClick,
                                      onDeletePostButtonClick
                                    }: StatusPostsProps) {

  const [newPostText, setNewPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleNewPostButtonClick = async () => {
    setIsPosting(true);
    try {
      await onNewPost(newPostText);
      setNewPostText('')
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="statusPosts">
      <p>Post Status</p>
      <div className="newPost">
        <textarea
          value={newPostText}
          rows={4}
          onChange={(event) => setNewPostText(event.currentTarget.value)}/>
        <div>
          <button onClick={handleNewPostButtonClick}>
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.postID} className="post">
            <p className="postDate">{new Date(post.createdAt * 1000).toDateString()}</p>
            <div className="content">
              <span className="text">{post.text}</span>
              <div className="actions">
                <button onClick={() => onEditPostButtonClick(post)}>Edit</button>
                <button onClick={() => onDeletePostButtonClick(post)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        <div>
        </div>
      </div>
    </div>
  )
}
