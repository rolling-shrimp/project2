import React, { useContext, useState } from "react";
import AxiosFun from "../AxiosFun/axiosFun";
import { Form } from "react-bootstrap";
import { submitSearch } from "../eventHandler/eventHandling";
import "../assets/search/search.css";
import { ProvideData } from "../pages/Interface";
const InputSearchArea = ({
  thedate,
  setTheDate,
  setRedoDisable,
  redoDisable,
}) => {
  const [search, setSearch] = useState("");

  const {
    basicUrl,
    isOrder,
    setCompareWhithQuery,
    setToRender,
    compareWhithQuery,
  } = useContext(ProvideData);
  const redo = async (disableRedo, clearDate, date) => {
    disableRedo(true);
    let [startDate, endDate] = Object.keys(date);

    clearDate({ ...date, [startDate]: "", [endDate]: "" });
    let url;
    isOrder
      ? (url = `${basicUrl}/OrdDataAll`)
      : (url = `${basicUrl}/CustDataAll`);
    try {
      let response = await AxiosFun.getOnly(url);

      setToRender(response.data);
      setCompareWhithQuery(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const changeSearch = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  return (
    <>
      <Form.Control
        className="inputsss"
        placeholder={
          isOrder ? "搜尋ID/客戶名/狀態.." : "搜尋ID/姓名/國籍/狀態..."
        }
        type="text"
        onChange={changeSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitSearch(
              compareWhithQuery,
              search,
              setToRender,
              setSearch,
              setRedoDisable
            );
          }
        }}
        value={search}
      ></Form.Control>
      <button
        onClick={() => {
          submitSearch(
            compareWhithQuery,
            search,
            setToRender,
            setSearch,
            setRedoDisable
          );
        }}
        className="inputAreabutton"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <button
        style={
          redoDisable
            ? {
                backgroundColor: "white",
                color: "rgb(5, 13, 83)",
              }
            : {}
        }
        disabled={redoDisable}
        className="inputAreabutton"
        onClick={() => {
          redo(setRedoDisable, setTheDate, thedate);
        }}
      >
        重新整理
      </button>
    </>
  );
};

export default InputSearchArea;
