import clsx from "clsx";
import "./stepper.css";

interface Props {
  title: string;
  rounded?: boolean;
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Step = ({
  title,
  rounded = true,
  index,
  isActive = false,
  disabled = false,
  onClick,
}: Props) => {
  function handleClick() {
    if (!onClick || disabled) {
      return undefined;
    }

    return onClick();
  }

  return (
    <button
      onClick={handleClick}
      className={clsx("step", rounded && "step-rounded")}
      disabled={disabled}
    >
      <span className={clsx("step-number", isActive && "active")}>{index}</span>
      <span>{title}</span>
    </button>
  );
};

export default Step;
