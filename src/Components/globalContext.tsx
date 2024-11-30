import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from "react";
import { ArrItemType, GlobalContextType } from "../vite-env";
import DefaultValueContext from "./defaultValueContext";
import toast from "react-hot-toast";

const GlobalContext = createContext<GlobalContextType>({
  arr: [],
  setArr: () => {},
  buttonState: false,
  setButtonState: () => {},
  selectedTimer: "pomodoro",
  setSelectedTimer: () => {},
  handleDelete: () => {},
  handleEdits: () => {},
  handleEditsStatus: () => {},
  handleTimer: () => {},
  item_adder: () => {},
  selectedItem: 0,
  setSelectedItem: () => {},
  duration: { current: 1500 },
  handlePomodoros: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { default_timers, LocalStorageManager } =
    useContext(DefaultValueContext);
  //Used by ListitemContainer
  const [arr, setArr] = useState<ArrItemType[]>(
    LocalStorageManager.get("list", [])
  );

  //Used by Listitem
  const [selectedItem, setSelectedItem] = useState(() =>
    LocalStorageManager.get("selectedItem", 0)
  );

  //Used by Timer
  const [buttonState, setButtonState] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<
    "pomodoro" | "shortBreak" | "longBreak"
  >(() => arr[selectedItem]?.selectedTimer ?? "pomodoro");

  // updation of duration as per item selected
  const duration = useRef(
    arr.length > 0 && arr[selectedItem]
      ? arr[selectedItem].currentTime
      : default_timers.pomodoro
  );

  // Stores arr in localstorage
  useEffect(() => {
    LocalStorageManager.save("list", arr);
  }, [arr, LocalStorageManager]);

  //Stores selectedItem in localstorage & updates duration as per selected Item
  useEffect(() => {
    LocalStorageManager.save("selectedItem", selectedItem);

    if (selectedTimer === "pomodoro") {
      duration.current =
        arr.length > 0 && arr[selectedItem]
          ? arr[selectedItem].currentTime
          : default_timers.pomodoro;
    } else if (selectedTimer === "shortBreak") {
      duration.current = default_timers.shortBreak;
    } else if (selectedTimer === "longBreak") {
      duration.current = default_timers.longBreak;
    }
  }, [arr, selectedItem, selectedTimer, default_timers, LocalStorageManager]);

  //changes background color as per selected timer
  useEffect(() => {
    switch (selectedTimer) {
      case "pomodoro":
        document.documentElement.style.setProperty(
          "--bg-color",
          "rgb(186, 73, 73)"
        );
        break;
      case "shortBreak":
        document.documentElement.style.setProperty(
          "--bg-color",
          "rgb(56, 133, 138)"
        );
        break;
      case "longBreak":
        document.documentElement.style.setProperty(
          "--bg-color",
          "rgb(57, 112, 151)"
        );
        break;
    }
  }, [selectedTimer]);

  const handleTimer = useCallback(
    (index: number) => {
      setArr((prevState) => {
        const newList = [...prevState];

        const itemAtIndex = newList[index];
        if (!itemAtIndex) return prevState;
        if (selectedTimer === "pomodoro")
          itemAtIndex.currentTime = duration.current;

        return newList;
      });
    },
    [selectedTimer]
  );

  //Basic storage/data-manipulation functions
  const handlePomodoros = useCallback(
    (index: number) => {
      setArr((prevState) => {
        const newList = [...prevState];

        const itemAtIndex = newList[index];
        if (!itemAtIndex) return prevState;

        if (selectedTimer === "pomodoro") {
          itemAtIndex.pomodoros.pomodoro += 1;
          newList[index].currentTime = default_timers.pomodoro;
          duration.current = default_timers.pomodoro;
        } else if (selectedTimer === "shortBreak") {
          itemAtIndex.pomodoros.shortBreak += 1;
          duration.current = default_timers.shortBreak;
        } else if (selectedTimer === "longBreak") {
          itemAtIndex.pomodoros.longBreak += 1;
          duration.current = default_timers.longBreak;
        }

        return newList;
      });
    },
    [selectedTimer, default_timers]
  );

  const item_adder = useCallback(
    (title: string) => {
      const newItem: ArrItemType = {
        id: Date.now(),
        title: title.trim(),
        currentTime: default_timers.pomodoro,
        selectedTimer: "pomodoro",
        pomodoros: {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
        },
        done: false,
      };

      if (newItem.title) {
        setArr((prevState) => [...prevState, newItem]);
        toast.success("Task added successfully");
      }
    },
    [default_timers.pomodoro]
  );

  const handleDelete = useCallback(
    (index: number) => {
      if (index >= 0 && index < arr.length) {
        setArr((prevState) => {
          const newList = prevState.filter((_, i) => i !== index);

          let newSelectedItem: number = selectedItem;
          if (index === selectedItem) {
            newSelectedItem = 0;
          }
          setSelectedItem(newSelectedItem);

          return newList;
        });
        toast.success("Task deleted");
      }
    },
    [arr.length, selectedItem]
  );

  const handleEdits = useCallback(
    (index: number, title: string) => {
      if (index >= 0 && index < arr.length && title.trim()) {
        setArr((prevState) => {
          const newList = [...prevState];
          newList[index].title = title.trim();
          return newList;
        });
        toast.success("Task updated");
      }
    },
    [arr.length]
  );

  const handleEditsStatus = useCallback(
    (index: number, marker: boolean) => {
      if (index >= 0 && index < arr.length) {
        setArr((prevState) => {
          const newList = [...prevState];
          newList[index].done = marker;
          return newList;
        });
        toast.success("Task status changed");
      }
    },
    [arr.length]
  );

  const contextValue = useMemo(
    () => ({
      arr,
      setArr,
      buttonState,
      setButtonState,
      selectedTimer,
      setSelectedTimer,
      selectedItem,
      setSelectedItem,
      duration,
      handlePomodoros,
      handleDelete,
      handleEdits,
      handleEditsStatus,
      handleTimer,
      item_adder,
    }),
    [
      arr,
      buttonState,
      selectedTimer,
      selectedItem,
      duration,
      handlePomodoros,
      handleDelete,
      handleEdits,
      handleEditsStatus,
      handleTimer,
      item_adder,
    ]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
