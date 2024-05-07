import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

// Add new post component
export default function AddPostForm({ addNewPost }) {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.id : undefined;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    newPost.userId = currentUserId;
    addNewPost(newPost);
    setNewPost({ title: "", content: "" });
  };

  return (
    <div className="post">
      <h2>Add New Post</h2>
      <p className="post-title">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        />
      </p>
      <p className="post-content">
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
        />
      </p>
      <button onClick={handleAddNewPost}>Add Post</button>
    </div>
  );
}
