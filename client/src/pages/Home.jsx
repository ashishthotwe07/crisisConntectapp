import React, { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import MapComponent from "../components/MapComponent";

const Hero = lazy(() => import("../components/Hero"));
const EmergencyList = lazy(() => import("../components/EmergencyList"));

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <EmergencyList />
        <MapComponent />
      </Suspense>
    </Layout>
  );
}
