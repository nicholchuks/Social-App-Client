import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import { SlPicture } from "react-icons/sl";

const CreatePost = ({ onCreatePost, error }) => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const profilePhoto = useSelector(
    (state) => state?.user?.currentUser?.profilePhoto
  );

  const createPost = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="createPost"
      encType="multipart/form-data"
      onSubmit={createPost}
    >
      {error && <p className="createPost__error-message">{error}</p>}
      <div className="createPost__top">
        <ProfileImage image={profilePhoto} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
        />
      </div>
      <div className="createPost__bottom">
        <span></span>
        <div className="createPost__actions">
          <label htmlFor="image">
            <SlPicture />
          </label>
          <input
            type="text"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
