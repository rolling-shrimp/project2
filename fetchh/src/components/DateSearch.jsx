import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ProvideData } from "../pages/Interface";
const DateSearch = ({ thedate, setTheDate, setRedoDisable }) => {
  const { compareWhithQuery, setToRender } = useContext(ProvideData);
  const changeDate = (e) => {
    const { name, value } = e.target;
    setTheDate({ ...thedate, [name]: value });
  };
  const [inputType, setInputType] = useState({
    startDate: "text",
    endDate: "text",
  });
  const focus = (e) => {
    const { name } = e.target;
    setInputType({ ...inputType, [name]: "date" });
  };
  const blur = (e) => {
    const { name } = e.target;
    setInputType({ ...inputType, [name]: "text" });
  };
  useEffect(() => {
    if (thedate.startDate !== "" || thedate.endDate !== "") {
      setRedoDisable(false);
      let newArray = compareWhithQuery.filter((item) => {
        let start = thedate.startDate !== "" ? new Date(thedate.startDate) : "";
        let end = thedate.endDate !== "" ? new Date(thedate.endDate) : "";
        let itemDate = new Date(item.OrderDate);

        if (start === "" && end !== "") {
          return itemDate <= end;
        } else if (start !== "" && end !== "") {
          return itemDate >= start && itemDate <= end;
        } else if (start !== "" && end === "") {
          return itemDate >= start;
        }

        return false;
      });
      setToRender(newArray);
    }
  }, [thedate, compareWhithQuery, setRedoDisable, setToRender]);
  return (
    <Form.Group className="  d-flex flex-row align-items-center justify-content-start">
      <Form.Control
        className="dateInput "
        name="startDate"
        id=""
        value={thedate.startDate}
        onChange={changeDate}
        type={inputType.startDate}
        onFocus={focus}
        onBlur={blur}
        placeholder="開始日期"
      />
      <p className="dateInput">~</p>
      <Form.Control
        className="dateInput "
        name="endDate"
        type={inputType.endDate}
        id=""
        value={thedate.endDate}
        onChange={changeDate}
        onFocus={focus}
        onBlur={blur}
        placeholder="結束日期"
      />
    </Form.Group>
  );
};

export default DateSearch;
