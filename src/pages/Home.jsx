import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state?.user?.currentUser?.token);

  const createPost = async (data) => {
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const newPost = response?.data;
      setPosts([newPost, ...posts]);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <section className="mainArea">
      <CreatePost onCreatePost={createPost} error={error} />
    </section>
  );
};

export default Home;
