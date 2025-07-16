import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import TrimText from "../helpers/TrimText";

const FriendRequest = ({ onFilterFriend, friend }) => {
  const token = useSelector((state) => state?.user?.currentUser?.token);

  return (
    <article className="friendRequest">
      <div className="friendRequest__info">
        <Link to={`/users/${friend?._id}`}>
          <ProfileImage image={friend?.profilePhoto} />
        </Link>
        <div className="friendRequest__details">
          <Link to={`/users/${friend?._id}`}>
            <h5>{friend?.fullName}</h5>
          </Link>
          <small>
            <TrimText item={friend?.email} maxlength={20} />
          </small>
        </div>
      </div>
    </article>
  );
};

export default FriendRequest;
