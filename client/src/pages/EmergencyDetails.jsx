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
        <div class="m-auto md:w-2/3 font-[sans-serif]">
          <div class="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
            <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
              <div class="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
                <MapComponent
                  latitude={emergencyData.location.coordinates[1]}
                  longitude={emergencyData.location.coordinates[0]}
                ></MapComponent>
              </div>
              <div class="lg:col-span-2">
                <div class="bg-gray-100 p-6 rounded-lg">
                  <h3 class="text-lg font-semibold text-gray-800">Details</h3>
                  <ul class="mt-4 text-gray-600">
                    <li>
                      <h2 class="mt-6 text-2xl font-extrabold text-gray-800">
                        <span className="mt-2">Type:</span> {emergencyData.type}
                      </h2>
                      <p class="mt-2 mb-2 text-gray-600">
                        {emergencyData.details}
                      </p>
                    </li>
                    <li>
                      <span class="font-bold">Location:</span>{" "}
                      {emergencyData.address}
                    </li>
                    <li>
                      <span class="font-bold">status:</span>{" "}
                      <span>{emergencyData.status}</span>
                    </li>
                    <li>
                      <span class="font-bold">updatedAt:</span>{" "}
                      <span class="text-yellow-500">
                        {formatDate(emergencyData.updatedAt)}
                      </span>
                    </li>
                  </ul>
                  <div class="flex justify-center mt-6">
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
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
