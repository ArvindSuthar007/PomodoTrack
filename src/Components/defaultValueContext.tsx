import { createContext, useEffect, useMemo } from "react";
import { DefaultValueContextType } from "../vite-env";

class LocalStorageManager {
  // Method to save
  static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Handle storage quota exceeded or serialization errors
      console.error(`Error saving ${key} to localStorage:`, error);
      console.error("Unable to save data.");
    }
  }

  // Method to retrieve data
  static get<T>(key: string, defaultValue: T): T {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage: ${error}`);
      return defaultValue;
    }
  }
}

const DefaultValueContext = createContext<DefaultValueContextType>({
  default_timers: {
    pomodoro: 1500,
    shortBreak: 5,
    longBreak: 900,
  },
  LocalStorageManager: LocalStorageManager,
});

export const DefaultValueContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const default_timers = useMemo(
    () => ({
      pomodoro: 1500,
      shortBreak: 300,
      longBreak: 900,
    }),
    []
  );

  useEffect(() => {
    LocalStorageManager.save("default_timers", JSON.stringify(default_timers));
  }, [default_timers]);

  const contextValue = useMemo(
    () => ({
      default_timers,
      LocalStorageManager,
    }),
    [default_timers]
  );
  return (
    <DefaultValueContext.Provider value={contextValue}>
      {children}
    </DefaultValueContext.Provider>
  );
};

export default DefaultValueContext;
