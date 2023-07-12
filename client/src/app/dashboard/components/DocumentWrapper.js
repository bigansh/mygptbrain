import { useColors } from "@/utils/colors";
import React, { useRef, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useThreads } from "@/context";
import { getDoc, getUser } from "@/api";
import { useQuery } from "@tanstack/react-query";
const DocumentWrapper = ({ isSidebarOpen }) => {
  const { base, base800, base700, text } = useColors();
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

  const { data: documentData } = useQuery({
    queryKey: ["documents", currentDocument],
    queryFn: () =>
      getDoc({
        profile_id: userData?.profile_id,
        document_id: currentDocument,
      }),
    enabled: currentDocument !== "" && userData?.profile_id ? true : false,
    // onSuccess: (data) => {
    //   console.log(data, data[0].body, "read doc data");
    // },
    onError: (error) => {
      console.log(error, "err doc data");
    },
  });
  
  const divRef = useRef();
  
  return documentData ? (
    <Flex
      flexDir={"column"}
      transition={"all 0.5s ease-in"}
      background={base}
      h={"100vh"}
      overflow={"scroll"}
      gap={4}
      p={5}
      w={isSidebarOpen ? "60vw" : "80vw"}
      maxW={isSidebarOpen ? "60vw" : "80vw"}
      margin={"auto"}
    >
      <Heading>{documentData[0]?.heading}</Heading>

      <div dangerouslySetInnerHTML={{ __html: documentData[0]?.body }} />
    </Flex>
  ) : (
    <Flex
      lex
      flexDir={"column"}
      transition={"all 0.5s ease-in"}
      background={base}
      h={"100vh"}
      overflow={"scroll"}
      gap={4}
      p={5}
      w={isSidebarOpen ? "60vw" : "80vw"}
      maxW={isSidebarOpen ? "60vw" : "80vw"}
      margin={"auto"}
    ></Flex>
  );
};

export default DocumentWrapper;
