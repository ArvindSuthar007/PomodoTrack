import { useCallback, useState, useContext } from "react";
import GlobalContext from "./globalContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const [inputState, setInputState] = useState(true);
  const { item_adder } = useContext(GlobalContext);

  const handleButtonClick = useCallback(() => {
    if (text.trim() === "") return;
    setInputState(!inputState);
    item_adder(text.trim());
    setText("");
  }, [text, inputState, item_adder]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleButtonClick();
  };

  return (
    <>
      {inputState ? (
        <button
          className="m-2 w-[--genral-width] min-h-14 p-6 
            text-xl font-extrabold
            rounded-lg border-4 border-dashed border-white opacity-50
            hover:opacity-100 hover:cursor-pointer
            flex justify-center items-center
            transition duration-300 ease-in-out"
          onClick={() => setInputState(!inputState)}
        >
          Add Task
        </button>
      ) : (
        <div
          className="m-2 w-[--genral-width] min-h-14 p-6 
            text-xl text-white font-extrabold bg-transparent
            rounded-lg border-4 border-dashed border-white"
        >
          <input
            type="text"
            placeholder="Enter text here..."
            className="w-full h-full bg-transparent outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </>
  );
}
