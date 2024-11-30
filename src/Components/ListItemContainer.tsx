import { useContext } from "react";
import ListItem from "./ListItem";
import AddTask from "./AddTask";
import GlobalContext from "./globalContext";

export default function ListItemContainer() {
  const { arr } = useContext(GlobalContext);

  return (
    <div className="w-1/2 min-h-auto max-h-auto flex flex-col items-center">
      {arr.map((item, index) => (
        <ListItem
          key={item.id}
          text={item.title}
          index={index}
          isCompleted={item.done}
        />
      ))}
      <AddTask />
    </div>
  );
}
