import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import AccountComponent from "./AccountComponent";
import BillingComponent from "./BillingComponent";
import PlatformComponent from "./PlatformComponent";
import Sidebar from "./Sidebar";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  let childComponent;
  switch (activeButton) {
    case "account":
      childComponent = <AccountComponent />;
      break;
    case "platform":
      childComponent = <PlatformComponent />;
      break;
    case "billing":
      childComponent = <BillingComponent />;
      break;
    default:
      childComponent = null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div
        className={`bg-white rounded-lg shadow-xl transform transition-all duration-300 h-[90vh] w-[90vw] ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}>
        <div className="flex items-start justify-center  h-full">
          <div className="p-4 flex flex-col items-start justify-start bg-[#F4F7FF] h-full mx-4">
            <div>settings</div>
            <Sidebar
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
            />
          </div>

          <div className="flex-1 bg-white">{childComponent}</div>
          <div className="justify-start bg-white p-4">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={handleClose}>
              <XIcon className="h-12 w-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
