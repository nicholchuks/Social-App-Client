import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "axios";
import LikeDislikePost from "./LikeDislikePost";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import TrimText from "../helpers/TrimText";
import BookmarksPost from "./BookmarksPost";
import { uiSliceActions } from "../store/ui-slice";

// Register the English locale globally
TimeAgo.addDefaultLocale(en);

const Feed = ({ post, onDeletePost }) => {
  const [creator, setCreator] = useState({});
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const userId = useSelector((state) => state?.user?.currentUser?.id);
  const [showFeedHeaderMenu, setShowFeedHeaderMenu] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();

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

  const closeFeedHeaderMenu = () => {
    setShowFeedHeaderMenu(false);
  };

  const showEditPostModal = () => {
    dispatch(uiSliceActions?.openEditPostModal(post?._id));
    closeFeedHeaderMenu();
  };

  const deletePost = async () => {
    onDeletePost(post?._id);
    closeFeedHeaderMenu();
  };

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
            <menu className="feed__header-menu">
              <button onClick={showEditPostModal}>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </menu>
          )}
        {userId == post?.creator && location.pathname.includes("users") && (
          <button onClick={() => setShowFeedHeaderMenu(!showFeedHeaderMenu)}>
            <HiDotsHorizontal />
          </button>
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
