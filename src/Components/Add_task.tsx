import { useState } from "react";

export interface Add_taskProps {
  item_adder: (text: string) => void;
}

export default function Add_task({ item_adder }: Add_taskProps) {
  const [text, setText] = useState("");
  const [inputState, setInputState] = useState(true);

  const handleButtonClick = () => {
    if (text.trim() === "") return;
    setInputState(!inputState);
    item_adder(text.trim());
    setText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleButtonClick();
  };

  return (
    <>
      {inputState ? (
        <div
          className="m-2 w-[--genral-width] min-h-14 p-6 
                rounded-lg border-4 border-dashed border-white opacity-50
                text-xl font-extrabold
                hover:opacity-100 hover:cursor-pointer
                flex justify-center items-center
                transition duration-300 ease-in-out"
          onClick={() => setInputState(!inputState)}
        >
          Add Task
        </div>
      ) : (
        <div
          className="m-2 w-[--genral-width] min-h-14 p-6 
                rounded-lg border-4 border-dashed border-white
                text-xl text-white font-extrabold bg-transparent"
        >
          <input
            type="text"
            placeholder="Enter text here..."
            className="w-full h-full bg-transparent outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* <button onClick={handleButtonClick}>Save</button> */}
        </div>
      )}
    </>
  );
}
