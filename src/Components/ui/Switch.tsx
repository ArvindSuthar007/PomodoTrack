import { useState } from "react";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center space-x-3">
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out 
          focus:outline-none
          ${isChecked ? "bg-[--bg-color]" : "bg-gray-200"}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 
            transform rounded-full bg-white shadow-lg 
            ring-0 transition duration-200 ease-in-out
            ${isChecked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export default Switch;
