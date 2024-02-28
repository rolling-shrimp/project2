import React, { useContext } from "react";
import axiosFun from "../AxiosFun/axiosFun";
import { ProvideData } from "../pages/Interface";
import { Thecontex } from "../App";
import { editData, deleteInf } from "../eventHandler/eventHandling";
const CustomerOrderArray = ({ data, item, isOrder }) => {
  const { redo, basicUrl } = useContext(ProvideData);
  const { checkDataDetail, query, setQuery } = useContext(Thecontex);

  if (isOrder) {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              editData(
                item._id,
                query,
                isOrder,
                axiosFun,
                basicUrl,
                redo,
                setQuery
              );
            }}
          >
            修改
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
            刪除
          </button>
        </td>

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
          {item.OrderDate}
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              checkDataDetail(item._id);
            }}
          >
            查看
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              editData(
                item._id,
                query,
                isOrder,
                axiosFun,
                basicUrl,
                redo,
                setQuery
              );
            }}
          >
            修改
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
                redo
              );
            }}
          >
            刪除
          </button>
        </td>
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
      </tr>
    );
  }
};

export default CustomerOrderArray;
