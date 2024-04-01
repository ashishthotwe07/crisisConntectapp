import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import MapComponent from "../components/MapComponent";
import ChatApp from "../components/ChatBox";

export default function EmergencyDetails() {
  const { id } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

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
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/emergency/reports/${id}`);
        setEmergencyData(response.data.data);
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      {emergencyData ? (
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <MapComponent
                latitude={emergencyData.location.coordinates[1]}
                longitude={emergencyData.location.coordinates[0]}
              />
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {emergencyData.type}
              </h2>
              <p className="text-gray-600 mb-4">{emergencyData.details}</p>
              <div className="mb-4">
                <span className="font-bold">Location:</span>{" "}
                {emergencyData.address}
              </div>
              <div className="mb-4">
                <span className="font-bold">Reported:</span>{" "}
                <span className="text-yellow-500">
                  {formatDate(emergencyData.updatedAt)}
                </span>
              </div>
              <div className="flex gap-10">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${emergencyData.location.coordinates[1]},${emergencyData.location.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {" "}
                  Open in Google Maps{" "}
                </a>
                <button
                  onClick={toggleChat}
                  class="relative mt-4 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white"
                >
                  <span class="relative px-5  py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Message Reporter
                  </span>
                </button>
              </div>
            </div>
          </div>
          {emergencyData.images && emergencyData.images.length === 1 && (
            <div className="mt-8">
              <img
                src={emergencyData.images[0].secure_url}
                alt="Emergency Image"
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {isChatOpen && (
        <ChatApp toggleChat={toggleChat} user={emergencyData.user} />
      )}
    </Layout>
  );
}
