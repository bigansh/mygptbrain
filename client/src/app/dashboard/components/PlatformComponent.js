import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaReddit, FaTwitter } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiNotionLogoLight } from "react-icons/pi";
import { AiOutlineRedo } from "react-icons/ai";
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
      disabled={isAuthorizing}
    >
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

const PlatformComponent = () => {
  return (
    <Flex flexDir={"column"} mt={2} p={4} gap={5}>
      <Flex gap={5}>
        <PlatformCard name="twitter" color={"#00ACEE"} icon={<FaTwitter />} />
        <PlatformCard name="reddit" color={"#FF4300"} icon={<FaReddit />} />
        <PlatformCard
          name="notion"
          color={"#373530"}
          icon={<PiNotionLogoLight />}
        />
      </Flex>
      <Flex gap={5}>
        <PlatformCard
          name="twitter"
          color={"#58DD58"}
          icon={<AiOutlineRedo />}
        />
        <PlatformCard
          name="reddit"
          color={"#58DD58"}
          icon={<AiOutlineRedo />}
        />
        <PlatformCard
          name="notion"
          color={"#58DD58"}
          icon={<AiOutlineRedo />}
        />
      </Flex>
    </Flex>
    // <div>
    //   <h1>Connect Accounts</h1>
    //   <ConnectButtons />

    //   <h1>Reauthorize Accounts</h1>
    //   <ReauthorizeButtons />
    // </div>
  );
};

export default PlatformComponent;

const PlatformCard = ({ name, color, icon }) => {
  return (
    <Flex flexDir={"column"} gap={2}>
      <Text fontSize={"xl"} fontWeight={"400"}>
        {name}
      </Text>
      <Flex
        alignItems={"center"}
        bg={color}
        gap={20}
        color={"white"}
        rounded={"5px"}
        p={2.5}
      >
        <Text>connect</Text>
        {icon}
      </Flex>
    </Flex>
  );
};
