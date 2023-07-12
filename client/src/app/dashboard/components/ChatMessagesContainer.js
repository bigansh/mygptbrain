import React, { useEffect, useRef } from "react";
import SingleChatComponent from "./SingleChatComponent";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useThreads } from "@/context";
import { getUser, readChat } from "@/api";
import uuid from "uuid";
import { Flex } from "@chakra-ui/react";

const ChatMessagesContainer = ({ inputValue, setInputValue, divRef }) => {
  const queryClient = useQueryClient();
  const { currentThread } = useThreads();
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

    onError: (error) => {
      console.log(error, "read chat data 1");
    },
  });
  const placeholderData = {
    chat_array: [
      {
        llm: `hey there! i'm here to make your life easier. i can provide you with summaries, bullet points, definitions, whatever, based on the data you give me. think of me as your personal chatgpt assistant, ready to answer all your questions within your context. ask me anything you want!

to make sure i give you accurate results, please keep in mind that my knowledge is limited to what you provide. unfortunately, i can't access the internet, but you can enhance my capabilities by connecting additional platforms using this link. you can also fine-tune my performance by filtering the documents i should refer to in the settings menu on the right.

feel free to customize your experience by changing the thread's name, the model i use to answer, and a few other settings. let's get started and make the most out of our conversation!`,
        user: "hey mygptbrain, what all can you do?",
      },
    ],
  };

  return (
    <Flex flexDir={"column"} overflow={"scroll"}>
      {currentThread == "new" &&
      (threadData == undefined || threadData.length == 0)
        ? placeholderData?.chat_array?.map((message, index) => (
            <SingleChatComponent
              message={message}
              isLast={index + 1 == placeholderData?.chat_array.length}
            />
          ))
        : threadData &&
          threadData[0]?.chat_array?.map((message, index) => (
            <SingleChatComponent
              message={message}
              isLast={index + 1 == threadData[0]?.chat_array.length}
            />
          ))}
      <Flex ref={divRef}></Flex>
    </Flex>
  );
};

export default ChatMessagesContainer;
