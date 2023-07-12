"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Flex,
  Heading,
  Grid,
} from "@chakra-ui/react";
import FunctionalBtn from "./FunctionalBtn";
import { useColors } from "@/utils/colors";
import { GoCreditCard } from "react-icons/go";
import { PiPuzzlePiece } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import {
  AccountComponent,
  PlatformComponent,
  BillingComponent,
} from "@/app/dashboard/components";
const SettingModal = ({ isOpenSetting, onCloseSetting }) => {
  const { base, base800, base700, text } = useColors();
  const [activeButton, setActiveButton] = useState("account");

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
    <Modal size={"6xl"} isOpen={isOpenSetting} onClose={onCloseSetting}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Grid
            h={"80vh"}
            templateColumns={"1fr 4fr"}
            rounded={"lg"}
            overflow={"hidden"}
          >
            <Flex
              h={"100%"}
              flexDir="column"
              bg={base800}
              p={5}
              height={"100%"}
              gap={2}
            >
              <Heading fontSize={"2xl"} fontWeight={"500"} mb={4}>
                setting
              </Heading>
              <SidebarItem
                activeButton={activeButton}
                onClick={() => handleButtonClick("account")}
                title="account"
                icon={<AiOutlineUser />}
              />
              <SidebarItem
                activeButton={activeButton}
                onClick={() => handleButtonClick("platform")}
                title="platform"
                icon={<PiPuzzlePiece />}
              />
              <SidebarItem
                activeButton={activeButton}
                onClick={() => handleButtonClick("billing")}
                title="billing"
                icon={<GoCreditCard />}
              />
            </Flex>
            <Flex>
              {childComponent}
            </Flex>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingModal;

const SidebarItem = ({ title, icon, onClick, activeButton }) => {
  const { base, base800, base700, text } = useColors();
  return (
    <Button
      onClick={onClick}
      bg={activeButton == title ? base700 : base800}
      w={"100%"}
      // _active={{ background: base800 }}
      justifyContent={"space-between"}
      fontWeight={"400"}
    >
      {title}
      {icon}
    </Button>
  );
};
