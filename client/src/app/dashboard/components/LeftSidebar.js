"use client";
import React, { useState } from "react";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useColors } from "@/utils/colors";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useThreads } from "@/context";
import { getUser, readChat } from "@/api";
import { PiChatsThin } from "react-icons/pi";
import FunctionalBtn from "./FunctionalBtn";
import { HiOutlineFilter, HiOutlinePencil } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
const LeftSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { text, base, base800, base700 } = useColors();

  const queryClient = useQueryClient();
  const {
    threads,
    setThreads,
    currentThread,
    setCurrentThread,
    documents,
    setDocuments,
    currentDocument,
    setCurrentDocument,
    currentView,
    setCurrentView,
  } = useThreads();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: threadData } = useQuery({
    queryKey: ["threads", currentThread],
    queryFn: () =>
      readChat({ profile_id: userData?.profile_id, chat_id: currentThread }),
    enabled:
      currentThread !== "" && currentThread !== "new" && userData?.profile_id
        ? true
        : false,
    onSuccess: (data) => {
      console.log(data, "read chat data 1");
    },
    onError: (error) => {
      console.log(data, "read chat data 1");
    },
  });
  console.log(threadData, "threadDataaaaye");
  return (
    <Flex
      transition={"all 0.5s ease-in"}
      pos={"relative"}
      background={base800}
      minW={isSidebarOpen ? "20vw" : ""}
      maxW={isSidebarOpen ? "20vw" : ""}
      display={isSidebarOpen ? "flex" : "none"}
      maxH={"100vh"}
      p={6}
      flexDir={"column"}
    >
      <Flex flexDir={"column"} gap={2} w={"100%"}>
        <Heading fontSize={"2xl"} fontWeight={"400"}>
          sources
        </Heading>
        {threadData && (
          <Flex flexDir={"column"} gap={2} mt={2}>
            {threadData[0]?.source_documents?.map((item, index) => (
              <Button
                display={"flex"}
                overflow={"hidden"}
                justifyContent={"flex-start"}
                key={item.chat_id}
                background={currentDocument === item ? base700 : base800}
                _hover={{ background: base700 }}
                onClick={() => {
                  setCurrentDocument(item);
                  setCurrentView("document");
                }}
                py={4}
                px="10px"
                gap={2}
                fontWeight={"400"}
              >
                <PiChatsThin fontSize={24} />
                <Text isTruncated>{item}</Text>
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
      <Flex flexDir={"column"} gap={2} w={"100%"} mt={"auto"}>
        <Heading fontSize={"2xl"} fontWeight={"400"}>
          preferences
        </Heading>
        <Flex flexDir={"column"} gap={2}>
          <FunctionalBtn
            title="what is internet ?"
            icon={<HiOutlinePencil fontSize={20} />}
          />
          <FunctionalBtn
            title="llm model"
            icon={<BsChevronDown fontSize={20} />}
          />
          <FunctionalBtn
            title="send type"
            icon={<BsChevronDown fontSize={20} />}
          />
          <FunctionalBtn
            title="filter documents"
            icon={<HiOutlineFilter fontSize={20} />}
          />
        </Flex>
      </Flex>
      <Button
        p={"10px"}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        position={"absolute"}
        right={"100%"}
        bottom={0}
        borderLeftRadius={4}
        borderRightRadius={0}
        background={base700}
        // display={isSidebarOpen ? "none" : "flex"}
      >
        {" "}
        <BsLayoutSidebarInsetReverse fontSize={24} />
      </Button>
    </Flex>
  );
};
export default LeftSidebar;
