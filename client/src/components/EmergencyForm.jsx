import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

const EmergencyReportForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    address: "",
    details: "",
    phone: "",
    latitude: null,
    longitude: null,
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);

    try {
      const response = await axios.post(
        "/api/emergency/report",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          type: "",
          address: "",
          details: "",
          phone: "",
          latitude: null,
          longitude: null,
          image: null,
        });

        toast.success("Emergency Reported Successfully");
      } else {
        throw new Error("Failed to create emergency report");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-600"
          >
            Emergency Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="Health">Health</option>
            <option value="AnimalAttack">Animal Attack</option>
            <option value="Accident">Accident</option>
            <option value="Robbery">Robbery</option>
            <option value="CybersecurityIncident">
              Cybersecurity Incident
            </option>
            <option value="PublicSafetyThreat">Public Safety Threat</option>
            <option value="Crime">Crime</option>
            <option value="GasLeak">Gas Leak</option>
            <option value="Fire">Fire</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter the address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-semibold text-gray-600"
          >
            Details
          </label>
          <textarea
            id="details"
            value={formData.details}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter details about the emergency"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-600"
          >
            Contact Information
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter contact information"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleLocationClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Get Current Location
          </button>
          {formData.latitude && formData.longitude && (
            <p className="text-sm text-gray-600 mt-2">
              Latitude: {formData.latitude}, Longitude: {formData.longitude}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-600"
          >
            Upload Image
          </label>
          <div className="flex items-center mt-2">
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-100 py-2 px-4 rounded-md text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:bg-indigo-100"
            >
              <FiUpload className="mr-2" /> Choose File
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {formData.image && (
              <span className="ml-4">{formData.image.name}</span>
            )}
          </div>
        </div>


        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmergencyReportForm;
