//import { GPTBrain, UserSvg } from '@/app/assets'
import { useColors } from "@/utils/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { PiUserCircleLight } from "react-icons/pi";
import Typist from "react-typist";

const SingleChatComponent = ({ message, isLast }) => {
  const { base, base800, base700, text } = useColors();
  return (
    <>
      <Flex flexDir={"column"}>
        <Flex justifyContent={"start"} gap={2} bg={base700} p={5}>
          <Flex gap={2} w={"65vw"} minW={"55vw"} maxW={"65vw"} margin={"auto"}>
            <Box>
              <PiUserCircleLight fontSize={40} strokeWidth={1} />
            </Box>
            <Text marginBlock={"auto"}>{message.user}</Text>
          </Flex>
        </Flex>
        <Flex justifyContent={"start"} gap={2} p={5}>
          <Flex gap={2} w={"65vw"} minW={"55vw"} maxW={"65vw"} margin={"auto"}>
            <Box>
              <LuBrainCircuit fontSize={40} strokeWidth={1} />
            </Box>

            <Text whiteSpace={"break-spaces"} marginBlock={"auto"}>
              {isLast ? (
                <Typist key={message.llm} avgTypingDelay={1} blink={true}>
                  {message.llm}
                </Typist>
              ) : (
                message.llm
              )}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SingleChatComponent;
