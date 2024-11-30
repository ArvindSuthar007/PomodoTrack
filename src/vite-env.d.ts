/// <reference types="vite/client" />

import React, { Dispatch, SetStateAction } from "react";

//List_item_container
interface currentTimes {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}
declare type ArrItemType = {
  id: number;
  title: string;
  currentTime: number;
  selectedTimer: "pomodoro" | "shortBreak" | "longBreak";
  pomodoros: currentTimes;
  done: boolean;
};

//List_Item
interface List_itemProps {
  text: string;
  index: number;
  isCompleted: boolean;
}

//globalContext
declare type GlobalContextType = {
  arr: ArrItemType[];
  setArr: Dispatch<SetStateAction<ArrItemType[]>>;
  buttonState: boolean;
  setButtonState: Dispatch<SetStateAction<boolean>>;
  selectedTimer: "pomodoro" | "shortBreak" | "longBreak";
  setSelectedTimer: Dispatch<
    SetStateAction<"pomodoro" | "shortBreak" | "longBreak">
  >;
  handleDelete: (index: number) => void;
  handleEdits: (index: number, text: string) => void;
  handleEditsStatus: (index: number, marker: boolean) => void;
  handleTimer: (index: number) => void;
  item_adder: (text: string) => void;
  selectedItem: number;
  setSelectedItem: Dispatch<SetStateAction<number>>;
  duration: React.MutableRefObject<number>;
  handlePomodoros: (index: number) => void;
};

//defaultValueContext
declare type DefaultValueContextType = {
  default_timers: currentTimes;
  LocalStorageManager: typeof LocalStorageManager;
};
