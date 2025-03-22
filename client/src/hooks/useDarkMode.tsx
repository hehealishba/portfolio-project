import { useState, useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check user preference on initial load
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedMode = localStorage.getItem("darkMode");
    
    // Set initial theme
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(userPrefersDark);
    }
    
    // Apply theme to body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem("darkMode", String(newMode));
    setDarkMode(newMode);
  };

  return { darkMode, toggleDarkMode };
}