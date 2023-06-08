"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useState } from "react";

const Sidebar = ({ position }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <motion.div
        className={`fixed z-50 ${
          isSidebarOpen ? "bottom-4 left-4" : "bottom-4 right-4"
        }`}
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : 100,
          y: isSidebarOpen ? 0 : 100,
          transition: { duration: 0.3 },
        }}>
        <button
          className={`bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none`}
          onClick={handleToggleSidebar}>
          {isSidebarOpen ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          )}
        </button>
      </motion.div>

      <motion.div
        initial={{ x: position === "left" ? "-100%" : "100%" }}
        animate={{
          x: isSidebarOpen ? 0 : position === "left" ? "-100%" : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-0 h-screen ${
          position === "left" ? "left-0" : "right-0"
        } w-64 bg-white shadow-lg`}>
        {/* Sidebar content goes here */}
        <div className="p-4">Sidebar Content</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 bottom-0 ${
          isSidebarOpen ? "block" : "hidden"
        } bg-black`}></motion.div>
    </div>
  );
};

export default Sidebar;
