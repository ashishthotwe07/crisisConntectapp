import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatApp from "./ChatBox";
import { useSelector } from "react-redux";
import { NotificationSelector } from "../redux/reducers/notificationSlice";

function MessagesComponent() {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userid, setUserId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { notifications } = useSelector(NotificationSelector);

  const toggleChat = (id) => {
    setUserId(id);
    setIsChatOpen(!isChatOpen);
  };

  const openChat = (id) => {
    setUserId(id);
    setIsChatOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get("/api/chats/", config);
        setMessages(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 h-screen bg-gray-300 px-2">
      <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-4">
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
              />
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>
            </div>
            <ul>
              {loading ? (
                <p>Loading messages...</p>
              ) : (
                messages.map((message, index) => (
                  <li
                    key={index}
                    onClick={() => openChat(message._id)}
                    className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition"
                  >
                    <div className="flex ml-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        width="40"
                        height="40"
                        className="rounded-full"
                        alt="User Profile"
                      />
                      <div className="flex flex-col ml-4">
                        <span className="font-medium text-black">
                          {message.username}
                        </span>
                        <span className="text-sm text-gray-400 truncate w-32">
                          {message.text}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-300">{message.time}</span>
                      <i className="fa fa-star text-green-400"></i>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      {isChatOpen && <ChatApp toggleChat={toggleChat} user={userid} />}
    </div>
  );
}

export default MessagesComponent;
