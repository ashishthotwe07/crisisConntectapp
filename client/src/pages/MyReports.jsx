import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const MyReports = () => {
  const socket = io("http://localhost:5000");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Set loading to true when fetching data
      setLoading(true);

      // Fetch data from your API endpoint
      const response = await fetch("/api/emergency/users/reports", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Get token from localStorage
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      const data = await response.json();

      setReports(data.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      // Set loading to false when data fetching is done
      setLoading(false);
    }
  };

  socket.on("updatedNotification", (notification) => {
    fetchReports();
  });

  return (
    <div className="container mx-auto mt-8">
      {loading ? ( // Show loading indicator if loading is true
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <ListItem key={index} {...report} />
          ))}
        </ul>
      )}
    </div>
  );
};

const ListItem = ({ _id, type, address, status, images }) => {
  const handleResolveClick = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update report status
      const response = await fetch(`/api/emergency/reports/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status: status === "resolved" ? "Reported" : "resolved",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/emergency/reports/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <li className="border border-gray-200 rounded-md shadow-md">
      <a href={`/emergency/details/${_id}`}>
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-gray-900">{type}</h3>
            <button
              onClick={handleDeleteClick}
              className="text-white bg-red-600 hover:bg-red-700 px-2 py-1/2 rounded-md"
            >
              Delete
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600 w-72 mb-10">{address}</p>
          <img src={images[0].secure_url} alt="rimage" className="h-60 " />
          <button
            onClick={handleResolveClick}
            className={`${
              status === "resolved"
                ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br   shadow-lg shadow-red-500/50  font-medium rounded-lg text-sm px-5 mt-4 py-2.5 text-center me-2 mb-2"
                : "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm mt-4 px-5 py-2.5 text-center me-2 mb-2"
            }`}
          >
            {status === "resolved" ? "Mark As Unresolved" : "Mark As Resolved"}
          </button>
        </div>
      </a>
    </li>
  );
};

export default MyReports;
