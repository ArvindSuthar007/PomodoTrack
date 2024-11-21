import { useCallback, useState, useContext } from "react";
import GlobalContext from "./globalContext";

export default function Add_task() {
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
