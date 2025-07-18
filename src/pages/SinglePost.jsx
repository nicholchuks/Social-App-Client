import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileImage from "../components/ProfileImage";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import LikeDislikePost from "../components/LikeDislikePost";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import BookmarksPost from "../components/BookmarksPost";
import PostComment from "../components/PostComment";

// Register the English locale globally
// TimeAgo.addDefaultLocale(en);

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const token = useSelector((state) => state?.user?.currentUser?.token);

  // GET POST FRO DB
  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost(response?.data);
      setComments(response?.data?.comments || []);
    } catch (err) {
      console.log(err);
    }
  };

  // FUNCTION TO DELETE COMMENT
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/comments/${commentId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments?.filter((c) => c?._id != commentId));
    } catch (error) {
      console.log(error);
    }
  };

  // FUNCTION TO CREATE COMMENT
  const createComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/${id}`,
        { comment },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newComment = response.data;
      setComments([newComment, ...comments]);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getPost();
  // }, [deleteComment]);

  useEffect(() => {
    getPost();
  }, [id]); // ✅ Good

  console.log(comments);
  return (
    <section className="singlePost">
      <header className="feed__header">
        <ProfileImage image={post?.creator?.profilePhoto} />

        <div className="feed__header-details">
          <h4>{post?.creator?.fullName}</h4>
          <small>
            {post?.createdAt ? (
              <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
            ) : (
              <small>Just now</small>
            )}
          </small>
        </div>
      </header>
      <div className="feed__body">
        <p>{post?.body}</p>
        <div className="feed__images">
          <img src={post?.image} alt="" />
        </div>
      </div>
      <footer className="feed__footer">
        <div>
          {post?.likes && <LikeDislikePost post={post} />}
          <button className="feed__footer-comments">
            <FaRegCommentDots />
          </button>
          <button className="feed__footer-share">
            <IoMdShare />
          </button>
        </div>
        <BookmarksPost post={post} />
      </footer>

      <ul className="singlePost__comments">
        <form className="singlePost__comments-form" onSubmit={createComment}>
          <textarea
            value={comment}
            placeholder="Enter your comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="singlePost__comments-btn">
            <IoMdSend />
          </button>
        </form>
        {/* {post?.comments?.map((comment) => (
          <PostComment
            key={comment._id}
            comment={comment}
            onDeleteComment={deleteComment}
          />
        ))} */}
        {comments.map((comment) => (
          <PostComment
            key={comment._id}
            comment={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </ul>
    </section>
  );
};

export default SinglePost;
