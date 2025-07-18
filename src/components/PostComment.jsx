import React from "react";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { FaRegTrashAlt } from "react-icons/fa";

const PostComment = ({ comment, onDeleteComment }) => {
  const token = useSelector((state) => state?.user?.currentUser?.token);

  const userId = useSelector((state) => state?.user?.currentUser?.id);

  const deleteComment = () => {
    onDeleteComment(comment?._id);
  };

  return (
    <li className="singlePost__comment">
      <div className="singlePost__comment-wrapper">
        <div className="singlePost__comment-author">
          <img src={comment?.creator?.creatorPhoto} alt="" />
        </div>
        <div className="singlePost__comment-body">
          <div>
            <h5>{comment?.creator?.creatorName}</h5>
            <small>
              {comment?.createdAt ? (
                <ReactTimeAgo
                  date={new Date(comment?.createdAt)}
                  locale="en-US"
                />
              ) : (
                <small>Just now</small>
              )}
            </small>
          </div>
          <p>{comment?.comment}</p>
        </div>
      </div>
      {/* userId == comment?.creator?.creatorId && */}
      {userId == comment?.creator?._id ||
        (userId == comment?.creator?.creatorId && (
          <button
            className="singlePost__comment-delete-btn"
            onClick={deleteComment}
          >
            <FaRegTrashAlt />
          </button>
        ))}
    </li>
  );
};

export default PostComment;
