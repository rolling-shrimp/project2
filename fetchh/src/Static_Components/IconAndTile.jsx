import React from "react";
import "../assets/search/search.css";
const IconAndTile = ({ isOrder }) => {
  return (
    <div className="header d-flex flex-column align-items-center justify-content-center">
      <h3 className="h3" style={{ color: "rgb(5, 13, 83)" }}>
        {isOrder ? (
          <>
            <i
              className="fa-solid fa-arrow-down-short-wide"
              style={{ color: "rgb(5, 13, 83)", marginRight: "1rem" }}
            ></i>
            訂單
          </>
        ) : (
          <>
            <i
              className="fa-solid fa-user"
              style={{ color: "rgb(5, 13, 83)", marginRight: "1rem" }}
            ></i>
            客戶
          </>
        )}
      </h3>
    </div>
  );
};

export default IconAndTile;
