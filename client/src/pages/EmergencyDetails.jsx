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

  const renderImages = () => {
    if (!emergencyData.images || emergencyData.images.length === 0) {
      return null;
    }

    if (emergencyData.images.length === 1) {
      return (
        <div className="relative w-full">
          {/* Single image */}
          <div className="h-56 md:h-96 overflow-hidden rounded-lg">
            <img
              src={emergencyData.images[0].secure_url}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Emergency Image"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
          {emergencyData.images.map((image, index) => (
            <div
              key={index}
              className={`hidden ${
                index === 0 ? "duration-700" : ""
              } ease-in-out`}
              data-carousel-item
            >
              <img
                src={image.secure_url}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Emergency Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {emergencyData.images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === 0 ? "bg-white" : "bg-gray-500"
              } ${index === 0 ? "hover:bg-gray-600" : "hover:bg-white"}`}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          {/* Previous button SVG */}
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          {/* Next button SVG */}
        </button>
      </div>
    );
  };

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
                  <h3 className="text-lg font-semibold text-gray-800">
                    Details
                  </h3>
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
                    {/* Display images */}
                    {renderImages()}
                  </ul>
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
