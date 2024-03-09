import React from "react";
import "../assets/search/search.css";
const AddingButton = ({ isOrder, openModal }) => {
  return (
    <div className="header d-flex flex-column align-items-center justify-content-center">
      <button className="addBtn" type="button" onClick={openModal}>
        <i className="fa-solid fa-circle-plus"></i> 新增
        {isOrder ? "訂單" : "客戶"}
      </button>
    </div>
  );
};

export default AddingButton;
