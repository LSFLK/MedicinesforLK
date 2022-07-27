import React from "react";
import clsx from "clsx";
import "./stepper.css";

interface Props {
  title: string;
  rounded?: boolean;
  index?: number;
  isActive?: boolean;
  onClick?(): void;
  disabled?: boolean;
}

function Step({
  title,
  rounded = true,
  index,
  isActive = false,
  disabled = false,
  onClick,
}: Props) {
  function handleClick() {
    if (!onClick || disabled) {
      return undefined;
    }

    return onClick();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "step",
        rounded && "step-rounded",
        !onClick && "no-hover"
      )}
      disabled={disabled}
    >
      <span className={clsx("step-number", isActive && "active")}>{index}</span>
      <span>{title}</span>
    </button>
  );
}

export default Step;
