import React, { useContext } from "react";
import { Thecontex } from "../App";
import useFetchData from "../components/useFetchData";
import "../assets/custDataOne/custDataOnes.css";
import SingleData from "./SingleData";
const CheckData = ({ theId }) => {
  const { checkDataDetail } = useContext(Thecontex);

  const resource = useFetchData(theId);

  return (
    <section className="custDataOneSection pt-1 pb-1 d-flex flex-column justify-content-center align-items-center">
      <div className="top d-flex flex-row justify-content-evenly align-items-start mb-1 p-2">
        <div className="rightLeft left p-2">
          <h2 className="p-2">Customer Data</h2>
          {resource && (
            <SingleData dataToRender={resource.customerData} version={"cust"} />
          )}
        </div>

        <div className="rightLeft right p-2">
          <h2 className="p-2">Customer's Order Record</h2>
          {resource && (
            <SingleData dataToRender={resource.orderData} version={"ord"} />
          )}
        </div>
      </div>
      <button
        onClick={() => {
          checkDataDetail(null);
        }}
      >
        關閉
      </button>
    </section>
  );
};

export default CheckData;
