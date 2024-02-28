import React, { useState, useContext, useEffect } from "react";
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
    if (data.length % eachPageAmount === 0) {
      setMaxLimit(data.length / eachPageAmount);
      eachPageAmount * page <= data.length
        ? setPage((prev) => prev)
        : setPage((prev) => prev - 1);
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
  }, [data]);

  return (
    <>
      {isOrder ? (
        <table>
          <thead>
            <tr>
              <th colSpan="2">{""}</th>

              {theVal.OrderinputArr.map((item) => (
                <th>{item}</th>
              ))}
              <th colSpan="4">Date</th>
            </tr>
          </thead>
          <ArraySegment
            key={page}
            eachPageAmount={eachPageAmount}
            page={page}
            isOrder={isOrder}
          />
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th colSpan="3">{""}</th>
              {theVal.CustinputArr.map((item) => (
                <th>{item}</th>
              ))}

              <th>近三年的訂單消費總和</th>
            </tr>
          </thead>
          <ArraySegment
            key={page}
            eachPageAmount={eachPageAmount}
            page={page}
            isOrder={isOrder}
          />
        </table>
      )}

      <span>
        <button onClick={lastPage}>上一頁</button>

        <span>{page}</span>

        <button onClick={nextPage}>下一頁</button>
      </span>
    </>
  );
};

export default Show;
