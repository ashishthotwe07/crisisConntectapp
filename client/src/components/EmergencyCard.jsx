import React, { useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import ChatApp from "./ChatBox";

const EmergencyCard = ({ emergency }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  console.log(emergency)
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const formatDate = (timestamp) => {
    const secondsAgo = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 1000
    );
    if (secondsAgo < 60) {
      return `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <img
        src={emergency.images && emergency.images.length > 0 ? emergency.images[0].secure_url : ""}
        alt="Emergency Image"
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <div className="">
          <h5 className="text-lg font-semibold text-gray-900">
            {emergency.type}
          </h5>
          <p className="text-sm font-semibold mt-5 text-gray-700">
            {emergency.details}
          </p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="mt-1 text-sm text-gray-700 font-semibold w-40">
            <FaMapMarkerAlt className="inline " /> {emergency.address}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            <FaClock className="inline mr-2" />
            {formatDate(emergency.updatedAt)}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <a
          href={`/emergency/details/${emergency._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Know More
        </a>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={toggleChat}
        >
          Message
        </button>
      </div>

      {isChatOpen && <ChatApp toggleChat={toggleChat} user={emergency.user} />}
    </div>
  );
};

export default EmergencyCard;
