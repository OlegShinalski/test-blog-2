import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";


const Home = () => {
  // Declaring a state variable called posts and initializing it to an empty array
  const [posts, setPosts] = useState([]);

  // Getting the current URL query string (if any) using the useLocation hook from react-router-dom
  const cat = useLocation().search;
  const { currentUser } = useContext(AuthContext);
  console.log("User=" + JSON.stringify(currentUser, null, 2));

  // Defining an effect that runs when the cat variable changes
  useEffect(() => {
    // Defining an asynchronous function called fetchData
    const fetchData = async () => {
      try {
        // Making an HTTP GET request to the server to retrieve posts data based on the cat variable
        const res = await axios.get(`/posts${cat}`);
        // Updating the posts state variable with the retrieved data
        setPosts(res.data);
      } catch (err) {
        // Logging any errors that occur during the request
        console.log(err);
      }
    };
    // Calling the fetchData function
    fetchData();
  }, [cat]); // Specifying that this effect should only run when the cat variable changes

  // Defining a helper function called getText that takes an HTML string and returns the text content
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Rendering the Home component
  return (
    <div className="home">
      <div className="posts">
      </div>
    </div>
  );
};

export default Home;
