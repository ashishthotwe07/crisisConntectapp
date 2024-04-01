import React, { Suspense, lazy, useEffect } from "react";
import Layout from "../components/Layout";

const Hero = lazy(() => import("../components/Hero"));
const EmergencyList = lazy(() => import("../components/EmergencyList"));

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <EmergencyList />
      </Suspense>
    </Layout>
  );
}
