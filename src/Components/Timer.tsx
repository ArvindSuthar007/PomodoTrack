import { useState, useRef, useEffect } from "react";

type TimerProps = {
  buttonState: boolean;
  setButtonState: (value: boolean) => void;
  selectedTimer: string;
  setSelectedTimer: (value: string) => void;
};

export default function Timer({
  buttonState,
  setButtonState,
  selectedTimer,
  setSelectedTimer,
}: TimerProps) {
  const duration = useRef(1500);
  const [time, setTime] = useState("25:00");

  useEffect(() => {
    if (selectedTimer === "pomodoro") {
      document.documentElement.style.setProperty(
        "--bg-color",
        "rgb(186, 73, 73)"
      );
      duration.current = 1500;
    } else if (selectedTimer === "shortBreak") {
      document.documentElement.style.setProperty(
        "--bg-color",
        "rgb(56, 133, 138)"
      );
      duration.current = 300;
    } else if (selectedTimer === "longBreak") {
      document.documentElement.style.setProperty(
        "--bg-color",
        "rgb(57, 112, 151)"
      );
      duration.current = 900;
    }
  }, [selectedTimer]);

  useEffect(() => {
    if (buttonState) {
      const timerId = setInterval(() => {
        duration.current--;
        const minutes = Math.floor(duration.current / 60);
        const seconds = duration.current % 60;
        setTime(
          `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        );

        if (duration.current === 0) {
          clearInterval(timerId);
          setButtonState(false);
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [buttonState]);

  const handleStart = () => {
    setButtonState(!buttonState);
  };

  return (
    <div className="my-[2rem] min-w-[27rem] min-h-[18rem] bg-slate-100/10 flex flex-col items-center justify-around">
      <div className="w-5/6 flex justify-between items-center">
        <input
          type="radio"
          className="hidden peer/pomodoro"
          id="pomodoro"
          name="timer_type"
          defaultChecked
          onChange={() => {
            setSelectedTimer("pomodoro");
            setTime("25:00");
          }}
        />
        <label
          htmlFor="pomodoro"
          className="hover:cursor-pointer rounded px-1 py-0.5 font-semibold peer-checked/pomodoro:bg-black/25"
        >
          Pomodoro
        </label>

        <input
          type="radio"
          className="hidden peer/shortBreak"
          id="shortBreak"
          name="timer_type"
          onChange={() => {
            setSelectedTimer("shortBreak");
            setTime("05:00");
          }}
        />
        <label
          htmlFor="shortBreak"
          className="hover:cursor-pointer rounded px-1 py-0.5 font-semibold peer-checked/shortBreak:bg-black/25"
        >
          Short Break
        </label>

        <input
          type="radio"
          className="hidden peer/longBreak"
          id="longBreak"
          name="timer_type"
          onChange={() => {
            setSelectedTimer("longBreak");
            setTime("15:00");
          }}
        />
        <label
          htmlFor="longBreak"
          className="hover:cursor-pointer rounded px-1 py-0.5 font-semibold peer-checked/longBreak:bg-black/25"
        >
          Long Break
        </label>
      </div>

      <span className="text-8xl font-ArialRoundedBold">{time}</span>

      <button
        onClick={handleStart}
        className="w-1/3 m-2 bg-slate-200 rounded-lg p-0 border-none cursor-pointer outline-offset-4"
      >
        <span className="block px-11 py-3 bg-white font-ArialRoundedBold text-[--bg-color] transition-colors duration-500 ease-in-out rounded-lg text-xl -translate-y-1.5 active:translate-y-0">
          {buttonState ? "Pause" : "Start"}
        </span>
      </button>
    </div>
  );
}
