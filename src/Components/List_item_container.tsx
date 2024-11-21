import { useContext } from "react";
import List_item from "./List_Item";
import Add_task from "./Add_task";
import GlobalContext from "./globalContext";

export default function List_item_container() {
  const { arr } = useContext(GlobalContext);

  return (
    <div className="w-1/2 min-h-auto max-h-auto flex flex-col items-center">
      {arr.map((item, index) => (
        <List_item
          key={item.id}
          text={item.text}
          index={index}
          isCompleted={item.isCompleted}
        />
      ))}
      <Add_task />
    </div>
  );
}
