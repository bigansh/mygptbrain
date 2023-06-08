import { useState } from "react";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="z-50 bg-white h-[90%] w-[90%]">{children}</div>
    </div>
  );
};

export default Modal;
