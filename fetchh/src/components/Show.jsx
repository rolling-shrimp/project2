import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Thecontex } from "../App";
import "../assets/show/show.css";

import ArraySegment from "./ArraySegment";

const Show = ({ isOrder, data, eachPageAmount }) => {
  //the object which has two arrays to set the input columns
  const theVal = useContext(Thecontex);

  const [page, setPage] = useState(1);
  const [maxLimit, setMaxLimit] = useState(null);
  const nextPage = () => {
    if (page < maxLimit) {
      setPage((prev) => prev + 1);
    }
  };
  const lastPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (data.length % eachPageAmount === 0 && data.length !== 0) {
      eachPageAmount * page <= data.length
        ? setPage((prev) => prev)
        : setPage((prev) => prev - 1);
      setMaxLimit(data.length / eachPageAmount);
    } else {
      if (data.length < eachPageAmount) {
        setMaxLimit(1);
        setPage(1);
      } else {
        let remainder = data.length % eachPageAmount;
        let removeRemainder = data.length - remainder;
        setMaxLimit(removeRemainder / eachPageAmount + 1);
        setPage((prev) => prev);
      }
    }
  }, [data, eachPageAmount, page]);

  return (
    <>
      <Row>
        <Col md={1}></Col>
        <Col className="d-flex flex-row justifiy-content-center align-items-center">
          {isOrder ? (
            <table>
              <thead>
                <tr>
                  {theVal.OrderinputArr.map((item) => (
                    <th key={item}>{item}</th>
                  ))}
                  <th>Date</th>
                  <th colSpan="2">{""}</th>
                </tr>
              </thead>
              {data.length !== 0 ? (
                <ArraySegment
                  key={page}
                  eachPageAmount={eachPageAmount}
                  page={page}
                  isOrder={isOrder}
                />
              ) : (
                <tbody
                  className="w-100 h-100"
                  style={{
                    backgroundColor: "rgb(5,13,83)",
                    borderTop: "white solid 1px ",
                    color: "white",
                  }}
                >
                  <tr>
                    <td colSpan={7}>無資料</td>
                  </tr>
                </tbody>
              )}
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  {theVal.CustinputArr.map((item) => (
                    <th key={item}>{item}</th>
                  ))}

                  <th>近三年的訂單消費總和</th>
                  <th colSpan="3">{""}</th>
                </tr>
              </thead>
              {data.length !== 0 ? (
                <ArraySegment
                  key={page}
                  eachPageAmount={eachPageAmount}
                  page={page}
                  isOrder={isOrder}
                />
              ) : (
                <tbody
                  className="w-100 h-100"
                  style={{
                    backgroundColor: "rgb(5,13,83)",
                    borderTop: "white solid 1px ",
                    color: "white",
                  }}
                >
                  <tr>
                    <td colSpan={7}>無資料</td>
                  </tr>
                </tbody>
              )}
            </table>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col className="pageSpan d-flex flex-row align-items-center justify-content-center">
          <span>
            <button onClick={lastPage}>
              {" "}
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <span>{page}</span>

            <button onClick={nextPage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </span>
        </Col>
      </Row>
    </>
  );
};

export default Show;
