const CustomCheckbox = () => {
  return (
    <div className="flex items-center my-4">
      <input
        type="checkbox"
        id="input-1"
        className="hidden peer/button-checkbox"
      />
      <label
        htmlFor="input-1"
        className="w-6 h-6 flex justify-center items-center border-2 border-white rounded-full cursor-pointer p-1 transition-all duration-300 peer-checked:bg-teal-500 peer-checked:border-teal-500 relative"
      >
        <svg viewBox="0 0 22 16" className="w-5 h-5" fill="none">
          <path
            d="M1 6.85L8.09677 14L21 1"
            className="stroke-white stroke-[3px] peer-checked/button-checkbox:animate-check"
          />
        </svg>
        <span className="absolute inset-0 bg-teal-300/40 rounded-full scale-0 peer-checked/button-checkbox:animate-ripple"></span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
