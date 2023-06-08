import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  pastChats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    addChat: (state, action) => {
      state.pastChats.push(action.payload);
    },
  },
});

export const { setCurrentChat, addChat } = chatSlice.actions;

export default chatSlice.reducer;
