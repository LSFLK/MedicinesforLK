/*
 * got the idea from
 * https://contactmentor.com/how-to-add-loading-spinner-react-js/
 */
import React from "react";
import "./spinner.css";

interface SpinnerProps {
  loaderText?: string;
}

const SpinnerLoader = React.memo((props: SpinnerProps) => {
  const { loaderText } = props;
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      {loaderText && (
        <div>
          <span>{loaderText}</span>
        </div>
      )}
    </div>
  );
});

export default SpinnerLoader;
