import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const MyReports = () => {
  const socket = io("http://localhost:5000");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
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
    }
  };

  socket.on("updatedNotification", (notification) => {
    fetchReports();
  });

  return (
    <div className="container mx-auto mt-8">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <ListItem key={index} {...report} />
        ))}
      </ul>
    </div>
  );
};

const ListItem = ({ _id, type, address, status }) => {
  const handleResolveClick = async () => {
    try {
      // Send PUT request to update report status
      const response = await fetch(
        `/api/emergency/reports/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: status === "resolved" ? "Reported" : "resolved",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  return (
    <li className="border border-gray-200 rounded-md shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{type}</h3>
        <p className="mt-2 text-sm text-gray-600">{address}</p>
        <button
          onClick={handleResolveClick}
          className={`block mt-4 text-sm font-medium ${
            status === "resolved"
              ? "text-red-600 hover:text-red-500"
              : "text-green-600 hover:text-green-500"
          }`}
        >
          {status === "resolved" ? "Mark As Unresolved" : "Mark As Resolved"}
        </button>
      </div>
    </li>
  );
};

export default MyReports;
