import React, { useEffect, useState, useContext } from "react";

import CustomerOrderArray from "./CustomerOrderArray";
import { ProvideData } from "../pages/Interface";
const ArraySegment = ({ isOrder, page, eachPageAmount }) => {
  const { data } = useContext(ProvideData);

  const [dataSlice, setDataSlice] = useState([]);

  useEffect(() => {
    let dataToRender;

    dataToRender =
      page * eachPageAmount >= data.length
        ? data.slice(eachPageAmount * (page - 1))
        : data.slice(eachPageAmount * (page - 1), eachPageAmount * page);

    setDataSlice(dataToRender);
  }, [data, page, eachPageAmount]);

  return (
    <tbody>
      {dataSlice.map((item) => (
        <CustomerOrderArray key={item._id} isOrder={isOrder} item={item} />
      ))}
    </tbody>
  );
};

export default ArraySegment;
