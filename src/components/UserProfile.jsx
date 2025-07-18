import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { userActions } from "../store/user-slice";
import { uiSliceActions } from "../store/ui-slice";

const UserProfile = () => {
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const loggedInUserId = useSelector((state) => state?.user?.currentUser?.id);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [user, setUser] = useState({});
  const [followUser, setFollowUser] = useState(
    user?.followers?.includes(loggedInUserId)
  );
  const [avatar, setAvatar] = useState(user?.profilePhoto);
  const { id: userId } = useParams();
  const [avatarTouched, setAvatarTouched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET USER FROM BD
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response?.data);
      setFollowUser(response?.data?.followers?.includes(loggedInUserId));
      setAvatar(response?.data?.profilePhoto);
    } catch (err) {
      console.log(err);
    }
  };

  const changeAvatarHandler = async (e) => {
    e.preventDefault();
    setAvatarTouched(true);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/avatar`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        userActions?.changeCurrentUser({
          ...currentUser,
          profilePhoto: response?.data?.profilePhoto,
        })
      );
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  //   FUNCTION TO OPEN "EDIT USER" MODAL
  const openEditProfileModal = async () => {
    dispatch(uiSliceActions.openEditProfileModal());
  };

  const followUnfollowUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}/follow-unfollow`,

        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFollowUser(response?.data?.followers?.includes(loggedInUserId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, followUser, avatar]);

  return (
    <section className="profile">
      <div className="profile__container">
        <form
          className="profile__image"
          onSubmit={changeAvatarHandler}
          encType="multipart/form-data"
        >
          <img src={user?.profilePhoto} alt="" />
          {!avatarTouched ? (
            <label htmlFor="avatar" className="profile__image-edit">
              <span>
                <LuUpload />
              </span>{" "}
            </label>
          ) : (
            <button className="profile__image-btn" type="submit">
              <FaCheck />
            </button>
          )}
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => {
              setAvatar(e.target.files[0]);

              setAvatarTouched(true);
            }}
            accept="png, jpg, jpeg"
          />
        </form>
        <h4>{user.fullName}</h4>
        <small>{user.email}</small>
        <ul className="profile__follows">
          <li>
            <h4>{user?.following?.length}</h4>
            <small>following</small>
          </li>
          <li>
            <h4>{user?.followers?.length}</h4>
            <small>followers</small>
          </li>
          <li>
            <h4>0</h4>
            <small>likes</small>
          </li>
        </ul>
        <div className="profile__actions-wrapper">
          {user?._id == loggedInUserId ? (
            <button className="btn" onClick={openEditProfileModal}>
              Edit Profile
            </button>
          ) : (
            <button onClick={followUnfollowUser} className="btn dark">
              {followUser ? "Unfollow" : "Follow"}
            </button>
          )}
          {user?._id != loggedInUserId && (
            <Link to={`/messages/${user?._id}`} className="btn default">
              Message
            </Link>
          )}
        </div>
        <article className="profile__bio">
          <p>{user?.bio}</p>
        </article>
      </div>
    </section>
  );
};

export default UserProfile;
