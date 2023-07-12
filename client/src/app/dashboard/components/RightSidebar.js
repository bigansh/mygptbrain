import { useRef, useState } from "react";
//import ThemeSwitcherButton from "../../../lib/ThemeSwitcher";
//import Modal from "../Settings";
import { IoIosSync } from "react-icons/io";
import { BsFillMoonStarsFill, BsPlusLg } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi";
import { PiChatsThin } from "react-icons/pi";
import { SlCloudUpload } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useThreads } from "@/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChat, getDoc, getUser, readChat, uploadDoc } from "@/api";
import {
  Flex,
  Heading,
  Box,
  useColorMode,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
} from "@chakra-ui/react";
import Search from "./Search";
import FunctionalBtn from "./FunctionalBtn";
import SettingModal from "./SettingModal";
import { useColors } from "@/utils/colors";

const RightSideBar = () => {
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenSetting,
    onOpen: onOpenSetting,
    onClose: onCloseSetting,
  } = useDisclosure();
  const uploadRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();
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
  console.log(userData , 'wfejidrfn')

  const { data: threadsData } = useQuery({
    queryKey: ["threads"],
    queryFn: () => readChat({ profile_id: userData?.profile_id }),
    enabled: userData?.profile_id ? true : false,
    placeholderData: [{ chat_id: 1, chat_name: "title 1" }],
    onError: (error) => {
      console.log(data, "read chat data 3");
    },
  });

  const { data: docData } = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDoc({ profile_id: userData?.profile_id }),
    enabled: userData?.profile_id ? true : false,
    placeholderData: [{ document_id: 1, heading: "title 1" }],
    onError: (error) => {
      console.log(error, "current doc check");
    },
  });

  const {
    data,
    mutate: uploadDocMutate,
    isLoading: uploadDocIsLoading,
  } = useMutation({
    mutationFn: () => uploadDoc(uploadRef.current.files[0]),

    onSuccess: (data) => {
      console.log(data, 1);
      queryClient.invalidateQueries(["documents"]);
      // queryClient.setQueryData(['documents'], (oldData) => [
      // 	...oldData,
      // 	data.chat,
      // ])
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // UI funcs

  const [sidebarTopic, setSidebarTopic] = useState("threads");
  const [threadInput, setThreadInput] = useState("");
  const [documentInput, setDocumentInput] = useState("");
  const filteredThreads = threadsData?.filter((e) =>
    e.chat_name.includes(threadInput)
  );
  const filteredDocuments = docData?.filter((e) =>
    e.heading.includes(documentInput)
  );
  return (
    <Flex
      flexDir={"column"}
      background={base800}
      minW={"20vw"}
      maxW={"20vw"}
      maxH={"100vh"}
      p={6}
    >
      {sidebarTopic == "threads" && (
        <Flex flexDir={"column"} gap={2}>
          <Heading fontSize={"2xl"} fontWeight={"400"}>
            threads
          </Heading>
          <Box borderTop="2px" borderColor="black.900" w={"100%"}></Box>

          <Search searchTerm={threadInput} setSearchTerm={setThreadInput} />
          <FunctionalBtn
            title="add chat"
            onClick={() => {
              console.log("chat clicked");
              setCurrentThread("new");
              setCurrentView("chat");
            }}
            icon={<BsPlusLg fontSize={24} />}
          />
          <Box borderTop="2px" borderColor="black.900" w={"100%"}></Box>
          <Flex flexDir={"column"} gap={2} maxH={"400px"} overflow={"scroll"}>
            {filteredThreads?.map((item, index) => (
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                key={item.chat_id}
                background={currentThread === item.chat_id ? base700 : base800}
                _hover={{ background: base700 }}
                onClick={() => {
                  setCurrentThread(item.chat_id);
                  setCurrentView("chat");
                }}
                py={4}
                px="10px"
                gap={2}
                fontWeight={"400"}
              >
                <PiChatsThin fontSize={24} />
                <Text isTruncated>{item.chat_name}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>
      )}

      {sidebarTopic == "documents" && (
        <Flex flexDir={"column"} gap={2}>
          <Heading fontSize={"2xl"} fontWeight={"400"}>
            threads
          </Heading>
          <Box borderTop="2px" borderColor="black.900" w={"100%"}></Box>

          <Search searchTerm={documentInput} setSearchTerm={setDocumentInput} />

          <FunctionalBtn
            title="sync documents"
            icon={<IoIosSync fontSize={30} />}
          />
          <Input
            type="file"
            ref={uploadRef}
            onChange={() => uploadDocMutate()}
            display={"none"}
          />

          <FunctionalBtn
            title={uploadDocIsLoading ? "uploading.." : "upload documents"}
            onClick={() => uploadRef.current.click()}
            icon={<SlCloudUpload fontSize={30} />}
          />
          <Box borderTop="2px" borderColor="black.900" w={"100%"}></Box>

          <Flex flexDir={"column"} gap={2} maxH={"400px"} overflow={"scroll"}>
            {filteredDocuments?.map((item, index) => (
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                key={item.document_id}
                background={
                  currentDocument === item.document_id ? base700 : base800
                }
                _hover={{ background: base700 }}
                onClick={() => {
                  setCurrentDocument(item.document_id);
                  setCurrentView("document");
                }}
                py={4}
                px="10px"
                gap={2}
                fontWeight={"400"}
              >
                <IoDocumentTextOutline fontSize={24} />
                <Text isTruncated>{item.document_id}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>
      )}

      <Flex flexDir={"column"} gap={2} mt={"auto"}>
        <Box
          borderTop="2px"
          borderColor="black.900"
          w={"100%"}
          px={2}
          pt={4}
        ></Box>
        <Flex alignItems={"center"}>
          <Heading fontSize={"2xl"} fontWeight={"400"}>
            {colorMode === "light" ? "dark mode" : "light mode"}
          </Heading>
          <Button
            onClick={toggleColorMode}
            bg={"transparent"}
            ml={"auto"}
            _hover={{ bg: base700 }}
          >
            {colorMode === "light" ? <BsFillMoonStarsFill /> : <HiOutlineSun />}
          </Button>
        </Flex>
        <Heading
          fontSize={"2xl"}
          fontWeight={"400"}
          onClick={() =>
            setSidebarTopic(
              sidebarTopic !== "documents" ? "documents" : "threads"
            )
          }
        >
          {sidebarTopic !== "documents" ? "documents" : "threads"}
        </Heading>
        <Heading fontSize={"2xl"} fontWeight={"400"} onClick={onOpenSetting}>
          settings
        </Heading>
      </Flex>

      <SettingModal
        isOpenSetting={isOpenSetting}
        onCloseSetting={onCloseSetting}
      />
    </Flex>
  );
};

export default RightSideBar;
