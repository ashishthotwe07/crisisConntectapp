import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async ({ user }) => {
    try {
      const response = await axios.get(
        `/api/chats/${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createChat = createAsyncThunk(
  "chats/createChat",
  async ({ user, message }) => {
    try {
      const response = await axios.post(
        `/api/chats/send/${user}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  selectedConversations: null,
  messages: [],
  error: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createChat.pending, (state) => {
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.error = null;
        state.messages.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatReducer = chatsSlice.reducer;
export const chatSelector = (state) => state.chatReducer;
