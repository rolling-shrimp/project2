import React, { useContext, useRef } from "react";
import axiosFun from "../AxiosFun/axiosFun";
import { Thecontex } from "../App";
import { submitSearch, createNewData } from "../eventHandler/eventHandling";
import "../assets/search/search.css";
import ToggleInput from "./ToggleInput";
const Search = ({
  basicUrl,
  setToRender,
  setCompareWhithQuery,
  isOrder,
  compareWhithQuery,
  redo,
  changePage,
}) => {
  const theInputLabel = useContext(Thecontex);
  const { setQuery, query } = useContext(Thecontex);
  const listRef = useRef();
  const showInputList = () => {
    listRef.current.classList.toggle("showToggleInput");
  };
  const changing = (e) => {
    const { name, value } = e.target;

    setQuery({ ...query, [name]: value });
  };
  return (
    <header>
      <div className="inputsss d-flex flex-row align-items-center justify-content-start p-2">
        {isOrder ? (
          <>
            {theInputLabel.OrderinputArr.map((item) => (
              <input
                type={item === "TotalAmount" ? "number" : "text"}
                name={item}
                placeholder={item}
                onChange={changing}
                value={query.hasOwnProperty(item) ? query[item] : ""}
              />
            ))}
            <input
              type="date"
              name="OrderDate"
              placeholder="OrderDate"
              onChange={changing}
              value={query.hasOwnProperty("OrderDate") ? query.OrderDate : ""}
            />
          </>
        ) : (
          theInputLabel.CustinputArr.map((item) => (
            <input
              type="text"
              name={item}
              placeholder={item}
              onChange={changing}
              value={query.hasOwnProperty(item) ? query[item] : ""}
            />
          ))
        )}
        <button
          type="button"
          onClick={() => {
            submitSearch(compareWhithQuery, query, setToRender, setQuery);
          }}
        >
          search
        </button>
        <button
          onClick={() => {
            redo();
          }}
        >
          redo
        </button>
        <button
          onClick={() => {
            createNewData(isOrder, query, basicUrl, redo, setQuery, axiosFun);
          }}
          type="button"
        >
          add
        </button>

        <button type="button" onClick={changePage}>
          switch
        </button>
      </div>

      {/*the div which appears when the viewport changed to cell phone devices */}
      <div className="buttonArea">
        <button
          className="showBtn navbar-toggler"
          style={{ color: "white" }}
          onClick={showInputList}
        >
          下拉輸入框
        </button>
        <button
          className="showBtn"
          type="button"
          onClick={() => {
            submitSearch(
              compareWhithQuery,
              query,
              setCompareWhithQuery,
              setQuery
            );
          }}
        >
          search
        </button>
        <button
          className="showBtn"
          onClick={() => {
            redo();
          }}
        >
          redo
        </button>
        <button
          className="showBtn"
          onClick={() => {
            createNewData(isOrder, query, basicUrl, redo, setQuery, axiosFun);
          }}
          type="button"
        >
          add
        </button>
        <button className="showBtn" type="button" onClick={changePage}>
          switch
        </button>{" "}
      </div>

      {/*The <input> which appears when the button clicked */}
      <ToggleInput
        listRef={listRef}
        dataTorender={
          isOrder ? theInputLabel.OrderinputArr : theInputLabel.CustinputArr
        }
        query={query}
        isOrder={isOrder}
        onChange={changing}
        close={showInputList}
      />
    </header>
  );
};

export default Search;
