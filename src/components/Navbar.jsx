import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons";
import ProfileImage from "./ProfileImage";

const Navbar = () => {
  <nav className="navbar">
    <div className="container navbar__container">
      <Link to="/" className="navbar__logo">
        Nickoe
      </Link>
      <form className="navbar__search">
        <input type="search" placeholder="Search" />
        <button type="submit">
          <CiSearch />
        </button>
      </form>
      <div className="navbar__right">
        <Link to={`/users/${userId}`} className="navbar__profile">
          <ProfileImage />
        </Link>
      </div>
    </div>
  </nav>;
};

export default Navbar;
