import { useContext, useState } from "react";
import checkmark_mono from "../assets/checkmark_mono.svg";
import GlobalContext from "./globalContext";

const Checkmarker = ({
  index,
  isCompleted,
}: {
  index: number;
  isCompleted: boolean;
}) => {
  const [checkmarkState, setCheckmarkState] = useState<boolean>(isCompleted);
  const { handleEditsStatus } = useContext(GlobalContext);

  const handleCheckmarkClick = () => {
    setCheckmarkState(!checkmarkState);

    handleEditsStatus(index, !checkmarkState);
  };

  return (
    <button onClick={handleCheckmarkClick} className="mr-2 ">
      <img
        src={checkmark_mono}
        alt="checkmark"
        width={40}
        height={40}
        className={
          checkmarkState
            ? "[filter:brightness(0)_saturate(100%)_invert(40%)_sepia(40%)_saturate(837%)_hue-rotate(312deg)_brightness(88%)_contrast(99%)]"
            : ""
        }
      />
    </button>
  );
};

export default Checkmarker;
