import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

// Display / edit / delete simgle post component
export default function Post({
  post,
  savePost,
  deletePost,
}) {
  const [editPost, setEditPost] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const isCurrentUserPost = currentUser && currentUser.id == post.userId;

  const handleEdit = (post) => {
    setEditPost(post);
  };

  const handleCancelEdit = () => {
    setEditPost(null);
  };

  const handleSavePost = () => {
    if (!editPost.title.trim() || !editPost.content.trim()) return;
    savePost(editPost);
    setEditPost(null);
  };

  return (
    <div className="post">
      {editPost && editPost.id === post.id ? (
        <div className="post">
          <p className="post-title">
            <input
              type="text"
              name="title"
              value={editPost.title}
              onChange={(e) =>
                handleEdit({ ...editPost, title: e.target.value })
              }
            />
          </p>
          <p className="post-content">
            <textarea
              name="content"
              value={editPost.content}
              onChange={(e) =>
                handleEdit({ ...editPost, content: e.target.value })
              }
            />
          </p>
          <button onClick={handleSavePost}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="post">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          {isCurrentUserPost && (
            <>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
