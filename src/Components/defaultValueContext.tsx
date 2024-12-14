import { createContext, useEffect, useMemo, useState } from "react";
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
  defaultTimers: {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  },
  setDefaultTimers: () => {},
  LocalStorageManager,
});

export const DefaultValueContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [defaultTimers, setDefaultTimers] = useState(() =>
    LocalStorageManager.get("default_timers", {
      pomodoro: 1500,
      shortBreak: 300,
      longBreak: 900,
    })
  );

  useEffect(() => {
    LocalStorageManager.save("default_timers", defaultTimers);
  }, [defaultTimers]);

  const contextValue = useMemo(
    () => ({
      defaultTimers,
      setDefaultTimers,
      LocalStorageManager,
    }),
    [defaultTimers]
  );
  return (
    <DefaultValueContext.Provider value={contextValue}>
      {children}
    </DefaultValueContext.Provider>
  );
};

export default DefaultValueContext;
