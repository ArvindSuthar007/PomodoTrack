import { useContext, useRef, useState } from "react";
import ListItem from "./ListItem";
import AddTask from "./AddTask";
import GlobalContext from "./globalContext";

export default function ListItemContainer() {
  const { arr, setArr } = useContext(GlobalContext);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const dragItemRef = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItemRef.current = index;
    setDraggedItem(arr[index].id);
  };

  const handleDragEnter = (index: number) => {
    if (dragItemRef.current !== null && dragItemRef.current !== index) {
      const newList = [...arr];
      const draggedItemContent = newList[dragItemRef.current];

      // Remove the dragged item from its original position
      newList.splice(dragItemRef.current, 1);
      // Insert the dragged item at the new position
      newList.splice(index, 0, draggedItemContent);

      setArr(newList);
      dragItemRef.current = index;
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    dragItemRef.current = null;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center select-none">
      <div className="w-full flex flex-col outline-none">
        {arr.map((item, index) => (
          <button
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`
              outline-none
              relative group
              ${draggedItem === item.id && "opacity-30"}
            `}
          >
            <ListItem
              text={item.title}
              index={item.id}
              isCompleted={item.done}
            />
          </button>
        ))}
      </div>
      <AddTask />
    </div>
  );
}
