import { CreditCardIcon, PuzzleIcon, UserIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Sidebar = ({ activeButton, handleButtonClick }) => {
  return (
    <div className="flex flex-col items-start justify-start h-fit bg-[#F4F7FF]">
      <nav className="p-4">
        <ul className="list-none p-0 ">
          <li className="flex-grow flex items-start justify-start w-full mx-3">
            <button
              className={`p-2 rounded w-full text-left text-xl ${
                activeButton === "account" ? "bg-[#DFE8FF] text-black" : ""
              }`}
              onClick={() => handleButtonClick("account")}>
              <div className="flex items-start justify-center space-x-8">
                <div>account</div>
                <UserIcon className="w-6 h-6" />
              </div>
            </button>
          </li>
          <li className="flex-grow">
            <button
              className={`p-2 rounded w-full text-left text-xl ${
                activeButton === "platform" ? "bg-[#DFE8FF] text-black" : ""
              }`}
              onClick={() => handleButtonClick("platform")}>
              <div className="flex items-start justify-center space-x-8">
                <div>Platform</div>
                <PuzzleIcon className="w-6 h-6" />
              </div>
            </button>
          </li>
          <li className="flex-grow">
            <button
              className={`p-2 rounded w-full text-left text-xl ${
                activeButton === "billing" ? "bg-[#DFE8FF] text-black" : ""
              }`}
              onClick={() => handleButtonClick("billing")}>
              <div className="flex items-start justify-center space-x-8">
                <div>Billing</div>
                <CreditCardIcon className="w-6 h-6" />
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
