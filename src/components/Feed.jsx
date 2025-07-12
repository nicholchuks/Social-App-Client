import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "axios";
import LikeDislikePost from "./LikeDislikePost";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import TrimText from "../helpers/TrimText";
import BookmarksPost from "./BookmarksPost";

// Register the English locale globally
TimeAgo.addDefaultLocale(en);

const Feed = ({ post }) => {
  const [creator, setCreator] = useState({});
  const [showFeedHeaderMenu, setShowFeedHeaderMenu] = useState(false);
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const userId = useSelector((state) => state?.user?.currentUser?.id);

  const location = useLocation();

  const showEditPostModal = () => {
    // Example: open edit modal with post ID
    // console.log("Edit post:", post._id);
  };

  const deletePost = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmDelete) return;

      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("Post deleted");
      // Optionally refetch posts or notify parent
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  // GET POST CREATOR
  const getPostCreator = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${post?.creator}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCreator(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostCreator();
  }, []);

  return (
    <article className="feed">
      <header className="feed__header">
        <Link to={`/users/${post?.creator}`} className="feed__header-profile">
          <ProfileImage image={creator?.profilePhoto} />
          <div className="feed__header-details">
            <h4>{creator?.fullName}</h4>
            <small>
              {post?.createdAt ? (
                <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
              ) : (
                <small>Just now</small>
              )}
            </small>
          </div>
        </Link>
        {showFeedHeaderMenu &&
          userId == post?.creator &&
          location.pathname.includes("users") && (
            <menu className="feed__headermenu">
              <button onClick={showEditPostModal}>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </menu>
          )}
      </header>
      <Link to={`posts/${post?._id}`} className="feed__body">
        <p>
          <TrimText item={post?.body} maxlength={160} />
        </p>
        <div className="feed__images">
          <img src={post?.image} alt="" />
        </div>
      </Link>
      <footer className="feed__footer">
        <div>
          <LikeDislikePost post={post} />
          <button className="feed__footer-comments">
            <Link to={`/posts/${post?._id}`}>
              <FaRegCommentDots />
            </Link>
            <small>{post?.comments?.length}</small>
          </button>
          <button className="feed__footer-share">
            <IoMdShare />
          </button>
        </div>
        <BookmarksPost post={post} />
      </footer>
    </article>
  );
};

export default Feed;
