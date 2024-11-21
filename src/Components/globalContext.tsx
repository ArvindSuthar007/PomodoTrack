import { createContext, useEffect, useState, ReactNode } from "react";
import { ArrItemType, GlobalContextType } from "../vite-env";
import toast from "react-hot-toast";

//TODO: Fix the toasts
//BUG: cannot change status without being selectedItem
const add = () => toast.success("Item Added");
const deleter = () => toast.success("deleted");
const edit = () => toast.success("edit");
const statusEdit = () => toast.success("edited");

const GlobalContext = createContext<GlobalContextType>({
  arr: [],
  setArr: () => {},
  buttonState: false,
  setButtonState: () => {},
  selectedTimer: "",
  setSelectedTimer: () => {},
  handleDelete: () => {},
  handleEdits: () => {},
  handleEditsStatus: () => {},
  handleTimer: () => {},
  item_adder: () => {},
  selectedItem: 0,
  setSelectedItem: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [arr, setArr] = useState<ArrItemType[]>(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  const [buttonState, setButtonState] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState("pomodoro");

  const [selectedItem, setSelectedItem] = useState(() => {
    const num = localStorage.getItem("selectedItem") ?? "0";
    return parseInt(num);
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(arr));
  }, [arr]);

  useEffect(() => {
    localStorage.setItem("selectedItem", `${selectedItem}`);
  }, [selectedItem]);

  const handleTimer = (
    index: number,
    receivedTime: number,
    selectedTimer: string
  ) => {
    setArr((prevState) => {
      const newList = [...prevState];
      if (selectedTimer === "pomodoro") {
        newList[index].totalTime += receivedTime;
      } else if (selectedTimer === "shortBreak") {
        newList[index].shortBreaks += receivedTime;
      } else if (selectedTimer === "longBreak") {
        newList[index].longBreaks += receivedTime;
      }
      return newList;
    });
  };

  const item_adder = (text: string) => {
    const newItem: ArrItemType = {
      id: Date.now(),
      text: text,
      timer: 1500,
      timerType: "pomodoro",
      shortBreaks: 0,
      longBreaks: 0,
      totalTime: 0,
      isCompleted: false,
    };
    setArr((prevState) => [...prevState, newItem]);
    add();
  };

  const handleDelete = (index: number) => {
    setArr((prevState) => prevState.filter((_, i) => i !== index));
    deleter();
  };

  const handleEdits = (index: number, text: string) => {
    setArr((prevState) => {
      const newList = [...prevState];
      newList[index].text = text;
      return newList;
    });
    edit();
  };

  const handleEditsStatus = (index: number, marker: boolean) => {
    setArr((prevState) => {
      const newList = [...prevState];
      newList[index].isCompleted = marker;
      return newList;
    });
    statusEdit();
  };

  return (
    <GlobalContext.Provider
      value={{
        arr,
        setArr,
        buttonState,
        setButtonState,
        selectedTimer,
        setSelectedTimer,
        selectedItem,
        setSelectedItem,
        handleDelete,
        handleEdits,
        handleEditsStatus,
        handleTimer,
        item_adder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
