import { createContext, useContext, useState } from "react";

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState("new");
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState("");
  const [currentView, setCurrentView] = useState("chat");
  return (
    <ThreadsContext.Provider
      value={{
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
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreads = () => {
  const data = useContext(ThreadsContext);
  return data;
};
