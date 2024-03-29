import React, { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BecomeVolunteer, updateUser } from "../redux/reducers/authSlice";

const Volunteer = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleBecomeVolunteerClick = () => {
    if (!termsChecked) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    dispatch(BecomeVolunteer({ role: "volunteer" }))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Successfully became a volunteer");
      })
      .catch((error) => {
       
        toast.error("You are already a volunteer");
      });
  };

  return (
    <Layout>
      <div className="container w-2/3 mx-auto px-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Become a Volunteer</h2>
        <p className="mb-4">
          Thank you for your interest in joining our volunteer program! At [Your
          Organization Name], volunteers play a crucial role in supporting our
          community during emergencies and contributing to our mission of
          serving others.
        </p>

        <div className="mb-8">
          <h3 className="font-bold mb-2">Volunteer Responsibilities</h3>
          <ul className="list-disc ml-6">
            <li>
              Assist users during emergencies by providing timely support and
              assistance.
            </li>
            <li>
              Collaborate with other volunteers and staff members to ensure
              effective response and coordination.
            </li>
            <li>
              Participate in training sessions or meetings to enhance skills and
              stay updated with protocols.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="font-bold mb-2">Requirements</h3>
          <ul className="list-disc ml-6">
            <li>
              Relevant skills or qualifications in areas such as first aid,
              communication, or crisis management.
            </li>
            <li>
              Availability for a minimum number of hours per week to respond to
              emergencies.
            </li>
            <li>
              Agreement to abide by our code of conduct and policies, ensuring
              professionalism and confidentiality.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="font-bold mb-2">Benefits of Volunteering</h3>
          <ul className="list-disc ml-6">
            <li>
              Make a positive impact on the community by helping those in need
              during challenging times.
            </li>
            <li>
              Build valuable skills and gain practical experience in crisis
              response and community service.
            </li>
            <li>
              Networking opportunities to connect with like-minded individuals
              and professionals in related fields.
            </li>
            <li>
              Fulfillment from contributing to a meaningful cause and making a
              difference in people's lives.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="font-bold mb-2">Terms and Conditions</h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span className="text-sm">
              I have read and agree to the terms and conditions.
            </span>
          </label>
          <p className="text-sm text-gray-600">
            By checking this box, you agree to abide by our volunteer program's
            terms and conditions, including confidentiality agreements and
            compliance with organizational policies.
          </p>
        </div>

        <div className="mb-8">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleBecomeVolunteerClick}
          >
            Become a Volunteer
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Volunteer;
