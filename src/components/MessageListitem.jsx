import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import TrimText from "../helpers/TrimText";
import ReactTimeAgo from "react-time-ago";

const MessageListitem = ({ conversation }) => {
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);
  return (
    <Link
      to={`/messages/${conversation?.participants[0]?._id}`}
      className="messageList__item"
    >
      <ProfileImage
        image={conversation?.participants[0]?.profilePhoto}
        className={
          onlineUsers?.includes(conversation?.participants[0]?._id)
            ? "active"
            : ""
        }
      />
      <div className="messageList__item-details">
        <h5>{conversation?.participants[0]?.fullName}</h5>
        <p>
          <TrimText item={conversation.lastMessage?.text} maxlength={16} />
        </p>
        <small>
          <ReactTimeAgo
            date={new Date(conversation?.createdAt)}
            locale="en-US"
          />
        </small>
      </div>
    </Link>
  );
};

export default MessageListitem;
