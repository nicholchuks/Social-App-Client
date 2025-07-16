import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageListitem from "./MessageListitem";

const MessagesList = () => {
  const [conversations, setConversations] = useState([]);
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const socket = useSelector((state) => state?.user?.socketn);

  //   GET CHAT FROM DB
  const getConversations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/conversations`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConversations(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, [socket]);

  return (
    <menu className="messageList">
      <h3>Recent Messages</h3>
      {conversations?.map((conversation) => (
        <MessageListitem key={conversation?._id} conversation={conversation} />
      ))}
    </menu>
  );
};

export default MessagesList;
