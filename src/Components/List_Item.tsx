import { useEffect, useRef, useState } from "react";
import Check_box from "./Checkbox/Check_box.tsx";

interface List_itemProps {
  text: string;
  index: number;
  handleDelete: (index: number) => void;
  handleEdits: (index: number, text: string) => void;
  handleTimer: (index: number, totalTime: number) => void;
  buttonState: boolean;
}

function List_item({
  text,
  index,
  handleDelete,
  handleEdits,
  handleTimer,
  buttonState,
}: List_itemProps) {
  const [editing, setEditing] = useState(false);
  const [textvalue, setTextvalue] = useState(text);
  const radioRef = useRef<HTMLInputElement>(null);
  const countdown = useRef(0);

  useEffect(() => {
    if (buttonState === true && radioRef.current?.checked) {
      const timerId = setInterval(() => {
        countdown.current += 0.5;
      }, 1000);
      return () => {
        clearInterval(timerId);
        handleTimer(index, countdown.current);
        countdown.current = 0;
      };
    }
  }, [buttonState, handleTimer, index, radioRef]);

  const handleEdit = () => {
    setEditing(!editing);
    if (editing) handleEdits(index, textvalue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTextvalue(e.target.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && handleEdit();

  return (
    <div className="w-full flex justify-center has-[:checked]:translate-y-[2px] transition duration-200 ease-in-out">
      <input
        ref={radioRef}
        type="radio"
        className="hidden peer"
        name="list_item"
        id={`list_item${index}`}
      />
      <label
        htmlFor={`list_item${index}`}
        className={`m-2 p-6 w-[--genral-width] min-h-14 rounded border-l-8 border-white hover:border-black/20 bg-white flex peer-checked:border-slate-800
          ${editing ? "flex-col" : "items-center justify-between"}`}
      >
        <Check_box />
        {editing ? (
          <>
            <div className="flex justify-between">
              <input
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-auto min-w-0 text-2xl text-black bg-white focus:outline-none"
                value={textvalue}
              />
              <input type="checkbox" checked={editing} onChange={handleEdit} />
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl text-black">{textvalue}</h3>
            <input type="checkbox" checked={editing} onChange={handleEdit} />
          </>
        )}
      </label>
    </div>
  );
}

export default List_item;
