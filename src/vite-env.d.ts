/// <reference types="vite/client" />

import { Dispatch, SetStateAction } from "react";

//List_item_container
declare type ArrItemType = {
  id: number;
  text: string;
  timer: number;
  timerType: string;
  shortBreaks: number;
  longBreaks: number;
  totalTime: number;
  isCompleted: boolean;
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
  selectedTimer: string;
  setSelectedTimer: Dispatch<SetStateAction<string>>;
  handleDelete: (index: number) => void;
  handleEdits: (index: number, text: string) => void;
  handleEditsStatus: (index: number, marker: boolean) => void;
  handleTimer: (
    index: number,
    receivedTime: number,
    selectedTimer: string
  ) => void;
  item_adder: (text: string) => void;
  selectedItem: number;
  setSelectedItem: Dispatch<SetStateAction<number>>;
};
