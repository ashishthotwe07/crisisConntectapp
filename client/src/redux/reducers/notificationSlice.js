import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { store } from "../store";

const socket = io("http://localhost:5000");

const initialState = {
  notifications: [],
  currentNotification: null,
  newNoty: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    receiveNotification(state, action) {
      const newNotification = action.payload;
      state.notifications.unshift(newNotification);
      state.currentNotification = newNotification;
      state.newNoty = true;
    },
    setCountZero(state) {
      state.newNoty = false;
    },
    clearAllNotifications(state) {
      state.notifications = [];
      state.currentNotification = null;
    },
  },
});

// Listen for new notification events from the server for emergency reports
socket.on("newEmergencyReport", (notification) => {
  console.log(notification);
  store.dispatch(notificationSlice.actions.receiveNotification(notification));
});

// Listen for new notification events from the server for updated notifications
socket.on("updatedNotification", (notification) => {
  store.dispatch(notificationSlice.actions.receiveNotification(notification));
});

// Listen for new message notifications from the server
socket.on("newMessageNotification", (notification) => {
  console.log(notification)
  store.dispatch(notificationSlice.actions.receiveNotification(notification));
});

export const { receiveNotification, clearAllNotifications, setCountZero } =
  notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export const NotificationSelector = (state) => state.notificationReducer;
