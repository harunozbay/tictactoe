import React from "react";
import "./square.css";

function Square({ value, onClick, sqrClass }) {
  return (
    <div className={sqrClass} onClick={onClick}>
      {value}
    </div>
  );
}

export default Square;
