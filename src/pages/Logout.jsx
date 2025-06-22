import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.changeCurrentUser({}));
    localStorage.removeItem("currentUser", null);
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
