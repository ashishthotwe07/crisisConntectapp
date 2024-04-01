import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EmergencyCard from "./EmergencyCard";
import { io } from "socket.io-client";
import { AuthSelector } from "../redux/reducers/authSlice";
import { useSelector } from "react-redux";

const EmergencyList = () => {
  const [emergencyReports, setEmergencyReports] = useState([]);
  const { user } = useSelector(AuthSelector);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    fetchEmergencyReports();

    // Cleanup function to unsubscribe from socket events
    return () => {
      socket.off("newEmergencyReport");
      socket.off("updatedNotification");
    };
  }, []);

  const fetchEmergencyReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("/api/emergency/reports", {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emergency reports");
      }

      const data = await response.json();

      let filteredReports = data.data;

      if (user) {
        filteredReports = filteredReports.filter(
          (report) => report.user !== user._id
        );
      }

      setEmergencyReports(filteredReports);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resolvedReports = emergencyReports.filter(
    (report) => report.status === "resolved"
  );

  const filteredReports = emergencyReports.filter(
    (report) => report.status !== "resolved"
  );

  filteredReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  socket.on("newEmergencyReport", (notification) => {
    fetchEmergencyReports();
  });

  socket.on("updatedNotification", (notification) => {
    fetchEmergencyReports();
  });

  return (
    <div className="w-2/3 m-auto">
      {filteredReports.length > 0 && (
        <>
          <h1 className="text-2xl font-bold text-center m-10 mb-4">
            Recent Emergency Reports
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.reverse().map((report) => (
              <EmergencyCard key={report._id} emergency={report} />
            ))}
          </div>
        </>
      )}

      {resolvedReports.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Resolved Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolvedReports.map((report) => (
              <EmergencyCard key={report._id} emergency={report} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyList;
