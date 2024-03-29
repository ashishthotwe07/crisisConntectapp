import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import MapComponent from "../components/MapComponent";

export default function EmergencyDetails() {
  const { id } = useParams();
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
        <div className="m-auto md:w-2/3 font-[sans-serif]">
          <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
                <MapComponent
                  latitude={emergencyData.location.coordinates[1]}
                  longitude={emergencyData.location.coordinates[0]}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Details</h3>
                  <ul className="mt-4 text-gray-600">
                    <li>
                      <h2 className="mt-6 text-2xl font-extrabold text-gray-800">
                        <span className="mt-2">Type:</span> {emergencyData.type}
                      </h2>
                      <p className="mt-2 mb-2 text-gray-600">
                        {emergencyData.details}
                      </p>
                    </li>
                    <li>
                      <span className="font-bold">Location:</span>{" "}
                      {emergencyData.address}
                    </li>
                    <li>
                      <span className="font-bold">Status:</span>{" "}
                      <span>{emergencyData.status}</span>
                    </li>
                    <li>
                      <span className="font-bold">UpdatedAt:</span>{" "}
                      <span className="text-yellow-500">
                        {formatDate(emergencyData.updatedAt)}
                      </span>
                    </li>
                    {/* Display image if available */}
                    {emergencyData.images && emergencyData.images.length > 0 && (
                      <li>
                        <h2 className="mt-6 text-2xl font-extrabold text-gray-800">
                          Image:
                        </h2>
                        {emergencyData.images.map((image, index) => (
                          <img
                            key={index}
                            src={image.secure_url}
                            alt={`Emergency Image ${index + 1}`}
                            className="mt-2 max-w-full"
                          />
                        ))}
                      </li>
                    )}
                  </ul>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
                    >
                      Message Reporter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}
