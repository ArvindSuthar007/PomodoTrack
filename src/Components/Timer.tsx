import { useState, useRef, useEffect, useContext } from "react";
import GlobalContext from "./globalContext";

export default function Timer() {
  const { selectedTimer, buttonState, setButtonState, setSelectedTimer } =
    useContext(GlobalContext);

  const duration = useRef(1500);
  const [time, setTime] = useState(() => {
    const minutes = Math.floor(duration.current / 60);
    const seconds = duration.current % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  });

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

  //TODO: use useMemo() instead of useEffect()
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
  }, [buttonState, setButtonState, duration]);

  const handleStart = () => {
    setButtonState(!buttonState);
  };

  const TimerSelector = ({
    the_timer,
    timer_type,
  }: {
    the_timer: string;
    timer_type: string;
  }) => {
    return (
      <>
        <input
          type="radio"
          className={`hidden`}
          id={timer_type}
          name="timer_type"
          checked={timer_type === selectedTimer}
          onChange={() => {
            setTime(the_timer);
            setSelectedTimer(timer_type);
          }}
        />
        <label
          htmlFor={timer_type}
          className={`select-none hover:cursor-pointer rounded px-1 py-0.5 ${
            timer_type === selectedTimer
              ? "font-ArialRoundedBold bg-black/25"
              : ""
          } `}
        >
          {timer_type === "pomodoro"
            ? "Pomodoro"
            : timer_type === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </label>
      </>
    );
  };

  return (
    <div className="my-[2rem] min-w-[27rem] min-h-[18rem] bg-slate-100/10 flex flex-col items-center justify-around rounded">
      <div className="w-5/6 flex justify-around items-center">
        <TimerSelector the_timer="25:00" timer_type="pomodoro" />
        <TimerSelector the_timer="05:00" timer_type="shortBreak" />
        <TimerSelector the_timer="15:00" timer_type="longBreak" />
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
