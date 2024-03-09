import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ProvideData } from "../pages/Interface";
const DateSearch = ({ thedate, setTheDate, setRedoDisable }) => {
  const { compareWhithQuery, setToRender } = useContext(ProvideData);
  const changeDate = (e) => {
    const { name, value } = e.target;
    setTheDate({ ...thedate, [name]: value });
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
  }, [thedate]);
  return (
    <Form.Group className="  d-flex flex-row align-items-center justify-content-start">
      <Form.Control
        className="dateInput "
        name="startDate"
        type="date"
        id=""
        value={thedate.startDate}
        onChange={changeDate}
      />
      <p className="dateInput">~</p>
      <Form.Control
        className="dateInput  "
        name="endDate"
        type="date"
        id=""
        value={thedate.endDate}
        onChange={changeDate}
      />
    </Form.Group>
  );
};

export default DateSearch;
