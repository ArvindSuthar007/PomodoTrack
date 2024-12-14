import { useRef, useEffect, useContext } from "react";
import Switch from "./ui/Switch";
import DefaultValueContext from "./defaultValueContext";

const SettingsDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { defaultTimers, setDefaultTimers } = useContext(DefaultValueContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white white p-6 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto font-ArialRoundedBold space-y-4"
      >
        {/* Header Section */}
        <section className="flex justify-between items-center border-b pb-2 text-gray-400 ">
          <div className="flex items-center justify-center grow">
            <h2 className="text-lg font-bold">SETTING</h2>
          </div>
          <button className="hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </section>

        {/* Timer Section */}
        <section className="text-gray-400 space-y-3">
          <h3 className="text-md font-semibold">TIMER</h3>
          <div className="grid grid-cols-3 gap-4">
            <section>
              <label htmlFor="pomodoro" className="block text-sm">
                Pomodoro
              </label>
              <input
                id="pomodoro"
                type="number"
                defaultValue={defaultTimers.pomodoro / 60}
                className="w-full p-2 border-none rounded-lg bg-gray-100 focus:outline-none text-gray-700 "
                onChange={(e) => {
                  const pomodoro = Number(e.target.value) * 60;
                  setDefaultTimers({ ...defaultTimers, pomodoro });
                }}
              />
            </section>

            <div>
              <label htmlFor="shortBreak" className="block text-sm ">
                Short Break
              </label>
              <input
                id="shortBreak"
                type="number"
                defaultValue={5}
                className="w-full p-2 border-none rounded-lg bg-gray-100 focus:outline-none text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="longBreak" className="block text-sm ">
                Long Break
              </label>
              <input
                id="longBreak"
                type="number"
                defaultValue={10}
                className="w-full p-2 border-none rounded-lg bg-gray-100 focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-base text-gray-600">
              Auto Start Breaks
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-base text-gray-600">
              Auto Start Pomodoros
            </div>
            <Switch />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="longBreakInterval"
              className="block text-base text-gray-600 grow"
            >
              Long Break Interval
            </label>
            <input
              id="longBreakInterval"
              type="number"
              defaultValue={3}
              className="w-1/5 p-2 border-gray-100 rounded-lg bg-gray-100 focus:outline-none text-gray-700"
            />
          </div>
        </section>

        {/* Task Section */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-400">Task</h3>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-base text-gray-600">
              Auto Check Tasks
            </span>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center text-base text-gray-600">
              Auto Switch Tasks
            </span>
            <Switch />
          </div>
        </section>

        {/* Sound Section */}
        {/* <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-700">Sound</h3>
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Alarm Sound</label>
            <select className="w-full p-2 border rounded">
              <option>Kitchen</option>
              <option>Bell</option>
              <option>Beep</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Volume</label>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Repeat</label>
            <input
              type="number"
              defaultValue={1}
              className="w-full p-2 border rounded"
            />
          </div>
        </div> */}

        {/* Theme Section */}
      </div>
    </section>
  );
};

export default SettingsDialog;
