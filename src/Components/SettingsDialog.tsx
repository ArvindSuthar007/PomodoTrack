import { useRef, useEffect } from "react";
import Switch from "./ui/Switch";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white white p-6 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto font-ArialRoundedBold"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-2 text-gray-400 ">
          <div className="flex items-center justify-center grow">
            <h2 className="text-lg font-bold">SETTING</h2>
          </div>
          <button className="hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Timer Section */}
        <div className="text-gray-400">
          <h3 className="text-md font-semibold">TIMER</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="pomodoro" className="block text-sm">
                Pomodoro
              </label>
              <input
                id="pomodoro"
                type="number"
                defaultValue={45}
                className="w-full p-2 border-none rounded-lg bg-gray-100 focus:outline-none text-gray-700 "
              />
            </div>

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
        </div>

        {/* Task Section */}
        <div className="">
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
        </div>

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
    </div>
  );
};

export default SettingsDialog;
