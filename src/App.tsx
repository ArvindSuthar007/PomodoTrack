import { useState } from "react";

import List_item from "./Components/List_Item";
import Timer from "./Components/Timer";
import Add_task from "./Components/Add_task";
import Arc_Menu from "./Components/Arc_Menu";

type ItemType = {
  id: number;
  text: string;
  shortBreaks: number;
  longBreaks: number;
  totalTime: number;
};

function App() {
  const [arr, setArr] = useState<ItemType[]>(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  const [buttonState, setButtonState] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState("pomodoro");

  const handleTimer = (index: number, receivedTime: number) => {
    setArr((prevState) => {
      const newList = [...prevState];
      if (selectedTimer === "pomodoro") {
        newList[index].totalTime += receivedTime;
      } else if (selectedTimer === "shortBreak") {
        newList[index].shortBreaks += receivedTime;
      } else if (selectedTimer === "longBreak") {
        newList[index].longBreaks += receivedTime;
      }
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  const item_adder = (text: string) => {
    const newItem = {
      id: Date.now(),
      text: text,
      shortBreaks: 0,
      longBreaks: 0,
      totalTime: 0,
    };
    setArr((prevState) => {
      const newList = [...prevState, newItem];
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  const handleDelete = (index: number) => {
    setArr((prevState) => {
      const newList = prevState.filter((_, i) => i !== index);
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  const handleEdits = (index: number, text: string) => {
    setArr((prevState) => {
      const newList = [...prevState];
      newList[index].text = text;
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <Timer
        buttonState={buttonState}
        setButtonState={setButtonState}
        selectedTimer={selectedTimer}
        setSelectedTimer={setSelectedTimer}
      />

      <Arc_Menu />

      <div className="w-1/2 min-h-auto max-h-auto flex flex-col items-center">
        {arr.map((item, index) => (
          <List_item
            key={item.id}
            text={item.text}
            index={index}
            handleDelete={handleDelete}
            handleEdits={handleEdits}
            handleTimer={handleTimer}
            buttonState={buttonState}
          />
        ))}

        <Add_task item_adder={item_adder} />
      </div>
    </div>
  );
}

export default App;
