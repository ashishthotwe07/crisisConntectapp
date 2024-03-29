import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/reducers/authSlice";

const Hero = () => {
  const { user } = useSelector(AuthSelector);

  const isVolunteer = user && user.role === "volunteer";

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="relative z-10 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Empowering Communities in Times of Crisis
          </h1>
          <p className="text-lg text-gray-200">
            {isVolunteer
              ? "Thank you for being a part of our volunteer team! Your dedication makes a difference."
              : "Providing swift, effective response to emergencies through technology and community collaboration"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/report-emergency"
            className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            Report Emergency
            <FaExternalLinkAlt className="ml-2 w-5 h-5" />
          </a>
          {!isVolunteer && (
            <a
              href="/volunteer/apply"
              className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-600"
            >
              Become a Volunteer
              <AiFillCheckCircle className="ml-2 w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
