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

      newList.splice(dragItemRef.current, 1);
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
          <article
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
              id={item.id}
              index={index}
              isCompleted={item.done}
            />
          </article>
        ))}
      </div>
      <AddTask />
    </div>
  );
}
