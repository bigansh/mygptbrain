import { useState } from "react";
import { FaReddit, FaTwitter } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

const ConnectButton = ({ title, icon }) => (
  <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none">
    {icon}
    <span>{title}</span>
  </button>
);

const ReauthorizeButton = ({ title, icon }) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuthorization = () => {
    setIsAuthorizing(true);
    // Perform authorization logic here
    // Once authorized, set setIsAuthorizing(false)
  };

  return (
    <button
      className={`flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none ${
        isAuthorizing ? "cursor-not-allowed" : "hover:bg-blue-600"
      }`}
      onClick={handleAuthorization}
      disabled={isAuthorizing}>
      {isAuthorizing ? (
        <IoIosArrowRoundForward className="animate-spin" />
      ) : (
        icon
      )}
      <span>{title}</span>
    </button>
  );
};

const ConnectButtons = () => (
  <div className="flex space-x-4">
    <ConnectButton title="Connect to Twitter" icon={<FaTwitter />} />
    <ConnectButton title="Connect to Reddit" icon={<FaReddit />} />
    <ConnectButton title="Connect to Notion" icon={<FaReddit />} />
  </div>
);

const ReauthorizeButtons = () => (
  <div className="flex space-x-4">
    <ReauthorizeButton title="Reauthorize Twitter" icon={<FaTwitter />} />
    <ReauthorizeButton title="Reauthorize Reddit" icon={<FaReddit />} />
    <ReauthorizeButton title="Reauthorize Notion" icon={<FaReddit />} />
  </div>
);

export default function MyComponent() {
  return (
    <div>
      <h1>Connect Accounts</h1>
      <ConnectButtons />

      <h1>Reauthorize Accounts</h1>
      <ReauthorizeButtons />
    </div>
  );
}
