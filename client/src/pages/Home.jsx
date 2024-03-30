import React, { Suspense, lazy, useEffect } from "react";
import Layout from "../components/Layout";
import MapComponent from "../components/MapComponent";
import axios from "axios";

const Hero = lazy(() => import("../components/Hero"));
const EmergencyList = lazy(() => import("../components/EmergencyList"));

export default function Home() {
  useEffect(() => {
    // Function to fetch all users
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/chats/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the authorization header
          },
        });
        console.log(response); // Log all users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers(); // Call the function when component mounts
  }, []); // Include token in the dependency array

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <EmergencyList />
      </Suspense>
    </Layout>
  );
}
