import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "./globalContext";
import DefaultValueContext from "./defaultValueContext";

export default function Timer() {
  const {
    buttonState,
    setButtonState,
    duration,
    selectedItem,
    selectedTimer,
    handlePomodoros,
  } = useContext(GlobalContext);
  const { defaultTimers } = useContext(DefaultValueContext);

  const [time, setTime] = useState(() => {
    const minutes = Math.floor(duration.current / 60);
    const seconds = duration.current % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  });

  useEffect(() => {
    setTime(() => {
      const minutes = Math.floor(duration.current / 60);
      const seconds = duration.current % 60;

      return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    });
  }, [selectedItem, duration, selectedTimer, defaultTimers]);

  useEffect(() => {
    if (buttonState) {
      const timerId = setInterval(() => {
        duration.current--;
        console.log(duration.current);
        const minutes = Math.floor(duration.current / 60);
        const seconds = duration.current % 60;
        setTime(
          `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        );

        if (duration.current === 0) {
          clearInterval(timerId);
          handlePomodoros(selectedItem);
          setButtonState(false);

          let newDuration;
          if (selectedTimer === "pomodoro") {
            newDuration = defaultTimers.pomodoro;
          } else if (selectedTimer === "shortBreak") {
            newDuration = defaultTimers.shortBreak;
          } else {
            newDuration = defaultTimers.longBreak;
          }

          // Immediately update the time display
          const newMinutes = Math.floor(newDuration / 60);
          const newSeconds = newDuration % 60;
          setTime(
            `${newMinutes < 10 ? "0" + newMinutes : newMinutes}:${
              newSeconds < 10 ? "0" + newSeconds : newSeconds
            }`
          );
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [
    buttonState,
    setButtonState,
    duration,
    selectedItem,
    handlePomodoros,
    defaultTimers,
    selectedTimer,
  ]);

  const handleStart = () => setButtonState(!buttonState);

  return (
    <div className="my-[2rem] min-w-[27rem] min-h-[18rem] bg-slate-100/10 flex flex-col items-center justify-around rounded">
      <div className="w-5/6 flex justify-around items-center">
        <TimerSelector
          the_timer="25:00"
          timer_type="pomodoro"
          setTime={setTime}
        />
        <TimerSelector
          the_timer="05:00"
          timer_type="shortBreak"
          setTime={setTime}
        />
        <TimerSelector
          the_timer="15:00"
          timer_type="longBreak"
          setTime={setTime}
        />
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
const TimerSelector = ({
  the_timer,
  timer_type,
  setTime,
}: {
  the_timer: string;
  timer_type: "pomodoro" | "shortBreak" | "longBreak";
  setTime: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { selectedTimer, setSelectedTimer } = useContext(GlobalContext);

  const handleTimerType = () => {
    if (timer_type === "pomodoro") {
      return "Pomodoro";
    } else if (timer_type === "shortBreak") {
      return "Short Break";
    } else if (timer_type === "longBreak") {
      return "Long Break";
    } else {
      throw new Error("Invalid timer type");
    }
  };
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
        {handleTimerType()}
      </label>
    </>
  );
};
