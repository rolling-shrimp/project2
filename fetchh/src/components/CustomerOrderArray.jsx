import React, { useContext, useState } from "react";
import axiosFun from "../AxiosFun/axiosFun";
import { ProvideData } from "../pages/Interface";
import { Thecontex } from "../App";
import { deleteInf, redoAfterCreatEddit } from "../eventHandler/eventHandling";
import CreateAndEddit from "./CreateAndEddit";
const CustomerOrderArray = ({ data, item, isOrder }) => {
  const { redo, basicUrl, setToRender, setCompareWhithQuery } =
    useContext(ProvideData);
  const { setDetailDataOpen, query, setQuery, CustinputArr, OrderinputArr } =
    useContext(Thecontex);
  const [open, setOpen] = useState(false);
  const checkDataDetail = () => {
    setDetailDataOpen(item._id);
  };
  const openEdit = () => {
    setOpen(true);
  };
  if (isOrder) {
    return (
      <tr>
        <CreateAndEddit
          setOpen={setOpen}
          open={open}
          theInputLabel={OrderinputArr}
          setQuery={setQuery}
          query={query}
          isOrder={isOrder}
          basicUrl={basicUrl}
          type="修改"
          id={item._id}
          setToRender={setToRender}
          setCompareWhithQuery={setCompareWhithQuery}
          singleData={item}
        />
        <td className="infTd" data-cell="OrderID">
          {item.OrderID}
        </td>
        <td className="infTd" data-cell="CustID">
          {item.CustID}
        </td>
        <td className="infTd" data-cell="TotalAmount">
          {item.TotalAmount}
        </td>
        <td className="infTd" data-cell="OrdStatus">
          {item.OrdStatus}
        </td>
        <td className="infTd" data-cell="SalesName">
          {item.SalesName}
        </td>
        <td className="infTd" data-cell="OrderDate">
          {item.OrderDate.split("T")[0]}
        </td>
        <td style={{ textAlign: "center" }}>
          <button onClick={openEdit}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              deleteInf(
                data,
                `${basicUrl}/OrdDelete/${item._id}`,
                {
                  id: item._id,
                },
                axiosFun,
                redo
              );
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <CreateAndEddit
          setOpen={setOpen}
          open={open}
          theInputLabel={CustinputArr}
          setQuery={setQuery}
          query={query}
          isOrder={isOrder}
          basicUrl={basicUrl}
          redo={redo}
          type="修改"
          id={item._id}
          setCompareWhithQuery={setCompareWhithQuery}
          setToRender={setToRender}
          singleData={item}
        />
        <td className="infTd" data-cell="CustID">
          {item.CustID}
        </td>
        <td className="infTd" data-cell="Name">
          {item.Name}
        </td>
        <td className="infTd" data-cell="Country">
          {item.Country}
        </td>
        <td className="infTd" data-cell="State">
          {item.State}
        </td>
        <td className="infTd" data-cell="Zip">
          {item.Zip}
        </td>
        <td className="infTd" data-cell="City">
          {item.City}
        </td>
        <td className="infTd" data-cell="Address">
          {item.Address}
        </td>
        <td className="infTd" data-cell="Status">
          {item.Status}
        </td>
        <td className="infTd" data-cell="threeYearAmount">
          {item.threeYearAmount ? item.threeYearAmount : "近三年無訂單"}
        </td>
        <td style={{ textAlign: "center" }}>
          <button onClick={checkDataDetail}>
            <i className="fa-solid fa-eye"></i>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button onClick={openEdit}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              deleteInf(
                data,
                `${basicUrl}/CustDelete/${item._id}`,
                {
                  id: item._id,
                },
                axiosFun,
                redoAfterCreatEddit,
                setToRender,
                setCompareWhithQuery,
                basicUrl,
                isOrder
              );
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
};

export default CustomerOrderArray;
