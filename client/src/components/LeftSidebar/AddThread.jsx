import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChat, setCurrentChat } from "../../store/reducers/chatSlice";

const AddChatButton = () => {
  const handleAddChat = (e) => {
    // Logic to add a new chat
    e.preventDefault();
    const newChat = {
      messages: [],
    };
    dispatch(addChat(newChat));
    dispatch(setCurrentChat(newChat));
  };

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-[#DFE8FF80]">
      <button
        className="     text-black   py-2 px-4 rounded-md text-2xl focus:outline-none"
        onClick={handleAddChat}>
        new thread
      </button>
      <div className="px-4">
        <svg
          className="w-6 h-6 inline"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.8125 9C17.8125 9.14918 17.7532 9.29226 17.6477 9.39775C17.5423 9.50324 17.3992 9.5625 17.25 9.5625H9.5625V17.25C9.5625 17.3992 9.50324 17.5423 9.39775 17.6477C9.29226 17.7532 9.14918 17.8125 9 17.8125C8.85082 17.8125 8.70774 17.7532 8.60225 17.6477C8.49676 17.5423 8.4375 17.3992 8.4375 17.25V9.5625H0.75C0.600816 9.5625 0.457742 9.50324 0.352252 9.39775C0.246763 9.29226 0.1875 9.14918 0.1875 9C0.1875 8.85082 0.246763 8.70774 0.352252 8.60225C0.457742 8.49676 0.600816 8.4375 0.75 8.4375H8.4375V0.75C8.4375 0.600816 8.49676 0.457742 8.60225 0.352252C8.70774 0.246763 8.85082 0.1875 9 0.1875C9.14918 0.1875 9.29226 0.246763 9.39775 0.352252C9.50324 0.457742 9.5625 0.600816 9.5625 0.75V8.4375H17.25C17.3992 8.4375 17.5423 8.49676 17.6477 8.60225C17.7532 8.70774 17.8125 8.85082 17.8125 9Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddChatButton;
