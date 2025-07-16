import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import TrimText from "../helpers/TrimText";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const FriendRequest = ({ onFilterFriend, friend }) => {
  const token = useSelector((state) => state?.user?.currentUser?.token);

  const followUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${friend?._id}/follow-unfollow`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onFilterFriend(friend?._id); //close friend badge
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="friendRequest__actions">
        <button className="friendRequest__actions-approve" onClick={followUser}>
          <FaCheck />
        </button>
        <button
          className="friendRequest__actions-approve"
          onClick={() => onFilterFriend(friend?._id)}
        >
          <IoMdClose />
        </button>
      </div>
    </article>
  );
};

export default FriendRequest;
