import { useEffect, useRef, useState, useContext } from "react";
import { List_itemProps } from "../vite-env";
import GlobalContext from "./globalContext";
import Checkmarker from "./Checkmarker";

export default function ListItem({
  text,
  id,
  index,
  isCompleted,
}: Readonly<List_itemProps>) {
  const [editing, setEditing] = useState(false);
  const [textvalue, setTextvalue] = useState(text);
  const radioRef = useRef<HTMLInputElement>(null); //can be removed with replaced functionality

  const {
    buttonState,
    selectedItem,
    setSelectedItem,
    handleTimer,
    handleEdits,
    handleDelete,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (id === selectedItem) {
      handleTimer(index);
    }
    return () => {};
  }, [buttonState, index, handleTimer, selectedItem, id]);

  const handleEdit = () => {
    setEditing(!editing);
    if (editing) handleEdits(index, textvalue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTextvalue(e.target.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && handleEdit();

  return (
    <section
      className={
        "overflow-hidden w-full flex justify-center has-[:checked]:translate-y-[2px] has-[:checked]:animate-expand outline-none"
      }
    >
      <input
        ref={radioRef}
        type="radio"
        className="hidden peer"
        name="list_item"
        id={`list_item${id}`}
        checked={selectedItem === id}
        onChange={() => {}}
        onClick={() => {
          setSelectedItem(id);
        }}
      />
      <label
        htmlFor={`list_item${id}`}
        className={`m-[0.3rem] py-4 px-2 w-[--genral-width] min-h-16 rounded border-l-8
          border-white hover:border-black/20 bg-white flex peer-checked:border-slate-800
          transition-[max-height] duration-300 overflow-hidden ${
            editing
              ? "flex-col max-h-[300px]"
              : "items-center justify-between max-h-[60px]"
          }`}
      >
        {editing ? (
          <>
            <div className="flex items-betweeen justify-center">
              <Checkmarker index={index} isCompleted={isCompleted} />
              <input
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="grow text-xl text-black bg-white focus:outline-none"
                value={textvalue}
              />
              <input
                type="checkbox"
                className="mr-4"
                checked={editing}
                onChange={handleEdit}
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  handleDelete(index, id);
                  console.log("clicked", index);
                }}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <Checkmarker index={index} isCompleted={isCompleted} />
            <h3 className="grow text-xl text-black peer-checked:line-through peer-checked:opacity-40">
              {textvalue}
            </h3>
            <input
              type="checkbox"
              className="mr-4"
              checked={editing}
              onChange={handleEdit}
            />
          </>
        )}
      </label>
    </section>
  );
}
