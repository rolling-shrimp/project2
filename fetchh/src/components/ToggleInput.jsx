import React from "react";
import "../assets/search/search.css";
const ToggleInput = ({
  close,
  isOrder,
  listRef,
  dataTorender,
  onChange,
  query,
}) => {
  return (
    <div className="toggleInput" ref={listRef}>
      {dataTorender.map((item) => (
        <input
          onChange={onChange}
          type={item === "TotalAmount" ? "number" : "text"}
          name={item}
          placeholder={item}
          value={query.hasOwnProperty(item) ? query[item] : ""}
        ></input>
      ))}
      {isOrder && (
        <input
          type="date"
          name="OrderDate"
          placeholder="OrderDate"
          onChange={onChange}
          value={query.hasOwnProperty("OrderDate") ? query.OrderDate : ""}
        />
      )}
      <button onClick={close}>收回</button>
    </div>
  );
};

export default ToggleInput;
