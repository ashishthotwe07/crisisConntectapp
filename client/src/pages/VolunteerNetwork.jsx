import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import ChatApp from "../components/ChatBox";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/reducers/authSlice";

const VolunteerNetwork = () => {
  const { user } = useSelector(AuthSelector);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/volunteer/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const toggleChat = (userId) => {
    setIsChatOpen(!isChatOpen); // Open the chat
    setSelectedUserId(userId);
  };
  const openChat = (userId) => {
    setIsChatOpen(true); // Open the chat
    setSelectedUserId(userId); // Set the selected user ID
  };

  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        {/* Table */}
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table header */}
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Volunteer Name</th>
                  <th className="px-5 py-3">From</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-gray-500">
                {currentUsers.length > 1 ? (
                  <>
                    {" "}
                    {currentUsers
                      .filter((users) => users._id !== user._id)
                      .map((users, index) => (
                        <tr key={index}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-full w-full rounded-full"
                                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                  alt={users.fullName}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="whitespace-no-wrap text-lg">
                                  {users.username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-lg">
                              {users.address}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-lg">
                              {users.email}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() => openChat(users._id)}
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Message
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                ) : (
                  "No Volunteers Present"
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isChatOpen && <ChatApp toggleChat={toggleChat} user={selectedUserId} />}
    </Layout>
  );
};

export default VolunteerNetwork;
