import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationSelector,
  clearAllNotifications,
  setCountZero,
} from "../redux/reducers/notificationSlice";
import { AuthSelector } from "../redux/reducers/authSlice";

const Notification = () => {
  const { notifications } = useSelector(NotificationSelector);
  console.log(notifications);
  const { user } = useSelector(AuthSelector);

  const { message } = notifications;
 
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(clearAllNotifications());
    dispatch(setCountZero());
  };

  useEffect(() => {
    dispatch(setCountZero());
  });

  // Filter out notifications that match the user's ID
  const filteredNotifications = notifications.filter(
 
    (notification) => notification.user !== user._id
  );

  
  return (
    <Layout>
      <div className="md:w-1/2 mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="md:text-2xl text-sm font-bold text-center mb-4">
          Notifications
        </h2>
        <button onClick={handleClearAll}>Clear All Notifications</button>
        <div className="border border-gray-200 rounded-md p-4">
          {filteredNotifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              
              <div>
                <p className="md:text-sm text-xs">{notification.message}</p>
              </div>

              <div>
                <button className="text-indigo-600 text-xs  hover:text-indigo-800 focus:outline-none">
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notification;
