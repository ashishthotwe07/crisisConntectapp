import React, { useState, useRef, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector, createChat, fetchChats } from "../redux/reducers/chatSlice";
import io from "socket.io-client";

const socket = io('http://localhost:5000');

function ChatApp({ toggleChat, user }) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { messages } = useSelector(chatSelector);

  useEffect(() => {
    dispatch(fetchChats({ user }));
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      dispatch(createChat({ message: inputValue, user }));
      setInputValue("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      dispatch(createChat(newMessage));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [dispatch]);


  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <div className="fixed bottom-16 right-4 w-96">
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-gray-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">{user}</p>
            <button
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChat}
            >
              <IoCloseOutline className="text-xl" />
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-2">
                Start a conversation
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.sender !== user ? "text-right" : ""}`}>
                  <p className={`bg-${message.sender === user ? "red" : "gray"}-500 text-white rounded-lg py-2 px-4 inline-block`}>
                    {message.message}
                  </p>
                  <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
                </div>
              ))
            )}  
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
