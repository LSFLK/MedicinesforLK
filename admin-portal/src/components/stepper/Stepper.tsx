import React, { cloneElement, Fragment, ReactElement } from "react";
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
  return (
    <div className="stepper">
      {Array.from(children).map((child, index) => {
        const onClick = onStepChange ? () => onStepChange(index) : undefined;

        const childProps = {
          index: index + 1,
          isActive: index === activeStep,
          onClick,
          disabled,
          ...child.props,
        };

        return (
          <Fragment key={index}>
            {cloneElement(child, childProps)}
            {index !== children.length - 1 && <span className="divider" />}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
