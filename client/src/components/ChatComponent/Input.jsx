import React from "react";

const Input = ({ inputValue, setInputValue, messages, setMessages }) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([newMessage, ...messages]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="p-2 px-6 sticky  py-2  my-2 flex items-center  ">
        <textarea
          rows={2}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 my-2 rounded-lg focus:outline-none  resize-none text-xl bg-[#DFE8FF80]"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2  text-black   rotate-45 bg-[#DFE8FF80]"
          onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Input;
