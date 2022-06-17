import React, { cloneElement, ReactElement } from "react";
import Step from "./Step";
import "./stepper.css";

interface Props {
  children: ReactElement<typeof Step>[];
  onStepChange?(step: number): void;
  activeStep: number;
  disabled?: boolean;
}

function Stepper({
  children,
  onStepChange,
  activeStep,
  disabled = false,
}: Props) {
  function changeStep(step: number) {
    if (!onStepChange || step === activeStep) {
      return undefined;
    }

    return onStepChange(step);
  }

  return (
    <div className="stepper">
      {Array.from(children).map((child, index) => {
        const childProps = {
          index: index + 1,
          onClick: () => changeStep(index),
          isActive: index === activeStep,
          disabled,
          ...child.props,
        };
        return (
          <>
            {cloneElement(child, childProps)}
            {index !== children.length - 1 && <hr className="divider" />}
          </>
        );
      })}
    </div>
  );
}

export default Stepper;
