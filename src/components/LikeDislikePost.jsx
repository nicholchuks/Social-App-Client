import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import axios from "axios";

const LikeDislikePost = (props) => {
  const [post, setPost] = useState(props.post);
  const userId = useSelector((state) => state?.user?.currentUser?.id);
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const [postLiked, setPostLiked] = useState(post?.likes?.includes?.userId);

  const handleLikeDislikePost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${post?._id}/like`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckIfUserLikedPost = () => {
    if (post?.likes?.includes(userId)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  };

  useEffect(() => {
    handleCheckIfUserLikedPost();
  }, [post]);

  return (
    <button className="feed__footer-comments" onClick={handleLikeDislikePost}>
      {postLiked ? <FcLike /> : <FaRegHeart />}
      <small>{post?.likes?.length}</small>
    </button>
  );
};

export default LikeDislikePost;
