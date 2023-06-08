import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";

import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button
      className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 focus:outline-none"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}>
      {theme === "dark" ? (
        <SunIcon className="h-8 w-8 text-yellow-500" />
      ) : (
        <MoonIcon className="h-8 w-8 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
