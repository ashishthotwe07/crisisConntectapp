import React from "react";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About CrisisConnect Emergency Response App
          </h2>
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <p className="text-gray-700">
              CrisisConnect emergency response app is a community-driven platform designed
              to empower individuals to assist each other during times of
              crisis. Whether it's a medical emergency, a natural disaster, or a
              safety concern, our app connects nearby users and facilitates
              rapid response and aid delivery.
            </p>
            <p className="text-gray-700 mt-4">
              By leveraging the collective strength of local communities, our
              app enables users to:
            </p>
            <ul className="list-disc pl-6 mt-3">
              <li className="text-gray-700">
                Receive real-time alerts about emergencies in their vicinity.
              </li>
              <li className="text-gray-700">
                Offer assistance to those in need by providing support,
                resources, or guidance.
              </li>
              <li className="text-gray-700">
                Seek help from other users or local authorities in case of
                emergencies.
              </li>
              <li className="text-gray-700">
                Share critical information and updates related to ongoing
                crises.
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Supported Emergencies
            </h3>
            <p className="text-gray-700">
              CrisisConnect covers a wide range of emergency situations, including but
              not limited to:
            </p>
            <ul className="list-disc pl-6 mt-3">
              <li className="text-gray-700">
                Medical emergencies such as accidents, injuries, or sudden
                illnesses.
              </li>
              <li className="text-gray-700">
                Natural disasters like earthquakes, floods, hurricanes, and
                wildfires.
              </li>
              <li className="text-gray-700">
                Safety concerns such as fires, robberies, or incidents of
                violence.
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">
              At CrisisConnect emergency response app, our mission is to build resilient
              communities that can effectively respond to crises and support one
              another in times of need. We believe that by fostering a culture
              of collaboration and solidarity, we can create safer and more
              resilient neighborhoods where every individual feels empowered to
              make a difference.
            </p>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default AboutPage;
