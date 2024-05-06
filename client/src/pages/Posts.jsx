import React, { useState, useEffect, useContext } from "react";
// import "./App.css";
import { getPosts, addPost, deletePost, updatePost } from "../api/api";
import { AuthContext } from "../context/authContext";
import AddPostForm from "../components/AddPostForm";
import Post from "../components/Post";

// Posts component, display list of posts
function Posts() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    getPosts()
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const addNewPost = (thePost) => {
    addPost(thePost)
      .then((response) => {
        setPosts([response.data, ...posts]);
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const savePost = (thePost) => {
    updatePost(thePost.id, thePost)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === thePost.id ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error editing post:", error));
  };

  const handleDeletePost = (postId) => {
    deletePost(postId)
      .then(() => {
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      <h1>Blog</h1>
      {currentUser && (
        <AddPostForm
          addNewPost={addNewPost}
        />
      )}
      <div className="posts">
        <h2>Blog Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            savePost={savePost}
            deletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
