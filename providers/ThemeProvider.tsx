import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNWColorScheme } from "nativewind";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const { setColorScheme } = useNWColorScheme();

  const [mode, setMode] = useState<ThemeMode>("system");

  // Load saved theme
  useEffect(() => {
    AsyncStorage.getItem("theme").then((value: string | null) => {
      if (value === "light" || value === "dark" || value === "system") {
        setMode(value);
      }
    });
  }, []);

  // Apply theme
  useEffect(() => {
    const activeTheme = mode === "system" ? systemScheme : mode;

    setColorScheme(activeTheme === "dark" ? "dark" : "light");

    AsyncStorage.setItem("theme", mode);
  }, [mode, systemScheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
