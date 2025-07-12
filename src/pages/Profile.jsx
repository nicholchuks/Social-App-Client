import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import HeaderInfo from "../components/HeaderInfo";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";

const Profile = () => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id: userId } = useParams();
  const token = useSelector((state) => state?.user?.currentUser?.token);

  // GET USER POSTS
  const getUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}/posts`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response?.data);
      setUserPosts(response?.data?.posts);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserPosts();
  }, [userId]);

  const deletePost = async () => {};

  return (
    <section>
      <UserProfile />
      <HeaderInfo text={`${user?.fullName}'s posts`} />
      <section className="profile__posts">
        {userPosts?.length < 1 ? (
          <p className="center">No posts by this user</p>
        ) : (
          userPosts?.map((post) => (
            <Feed key={post?._id} post={post} onDeletePost={deletePost} />
          ))
        )}
      </section>
    </section>
  );
};

export default Profile;
