import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axiosFun from "../AxiosFun/axiosFun";
import { Thecontex } from "../App";

const Search = ({ Redo, setdata, setdata2 }) => {
  const theInputLabel = useContext(Thecontex);
  const [search, setsearch] = useState({}); //用來儲存使用者在搜尋輸入框輸入的內容
  const [searchOrd, setsearchOrd] = useState({}); //儲存搜尋訂單的搜尋條件
  const [custval, setcustval] = useState(null);
  const inputRef2 = useRef("");
  const changing = (e) => {
    const { name, value } = e.target;
    setsearch({ ...search, [name]: value });
  };
  const changing2 = (e) => {
    const { name, value } = e.target;
    setsearchOrd({ ...searchOrd, [name]: value });
  };
  //使用者的搜尋客戶資料條件調過此async function發送到後端
  const Submit = async () => {
    try {
      let response = await axiosFun.get(
        "http://localhost:3503/SearchData",
        search
      );

      if (response.data.length === 0) {
        alert("沒有查到與搜尋條件相符的資料");
        return;
      }

      setdata(response.data);
      setsearch({});
    } catch (e) {
      console.log(e);
      alert("搜尋失敗");
    }
  };

  //使用者的搜尋訂單資料條件調過此async function發送到後端
  const Submit2 = async () => {
    try {
      let response = await axiosFun.get(
        "http://localhost:3503/SearchOrdData",
        searchOrd
      );
      if (response.data.length === 0) {
        alert("沒有查到與搜尋條件相符的資料");
        return;
      }
      setdata2(response.data);
      setsearchOrd({});
    } catch (e) {
      console.log(e);
      alert("搜尋失敗");
    }
  };

  return (
    <header className="">
      <div className="inputsss d-flex flex-row align-items-center">
        {theInputLabel.custpath &&
          theInputLabel.CustinputArr.map((item) => (
            <div>
              <label htmlFor="">{item}</label>
              <input
                type="text"
                name={item}
                placeholder={item}
                onChange={changing}
                value={search[item] || ""}
              />
            </div>
          ))}
        {/* {theInputLabel.ordpath &&
          theInputLabel.OrderinputArr.map((item) => (
            <div>
              <label htmlFor="">{item}</label>
              <input
                type="text"
                name={item}
                placeholder={item}
                onChange={changing}
              />
            </div>
          ))} */}
        {theInputLabel.ordpath && (
          <div>
            <label htmlFor="">OrderID</label>
            <input
              type="text"
              name="ID"
              placeholder="OrderID"
              onChange={changing2}
              value={searchOrd.ID || ""}
            />
          </div>
        )}
        {theInputLabel.ordpath && (
          <div>
            <label htmlFor="">Customer_ID</label>
            <input
              type="text"
              name="Customer_ID"
              placeholder="Customer_ID"
              onChange={changing2}
              value={searchOrd.Customer_ID || ""}
            />
          </div>
        )}
        {theInputLabel.ordpath && (
          <div>
            <label htmlFor="">TotalAmount</label>
            <input
              type="text"
              name="TotalAmount"
              placeholder="TotalAmount"
              onChange={changing2}
              value={searchOrd.TotalAmount || ""}
            />
          </div>
        )}
        {theInputLabel.ordpath && (
          <div>
            <label htmlFor="">OrdStatus</label>
            <input
              type="text"
              name="Status"
              placeholder="OrdStatus"
              onChange={changing2}
              value={searchOrd.Status || ""}
            />
          </div>
        )}
        {theInputLabel.ordpath && (
          <div>
            <label htmlFor="">SalesName</label>
            <input
              type="text"
              name="Sales_Name"
              placeholder="SalesName"
              onChange={changing2}
              value={searchOrd.Sales_Name || ""}
            />
          </div>
        )}

        {theInputLabel.ordpath && (
          <input
            type="date"
            name="Order_Date"
            id=""
            onChange={changing2}
            value={searchOrd.Order_Date || ""}
          />
        )}
        {theInputLabel.custpath && (
          <button className="headersearchbut" type="button" onClick={Submit}>
            搜尋
          </button>
        )}
        {theInputLabel.ordpath && (
          <button className="headersearchbut" type="button" onClick={Submit2}>
            搜尋
          </button>
        )}

        <button className="headersearchbut" onClick={Redo}>
          重新整理
        </button>
        {theInputLabel.custpath && (
          <button className="create" type="button">
            <Link to={"/custCreate"}>新增</Link>
          </button>
        )}
        {theInputLabel.ordpath && (
          <button className="create" type="button">
            <Link to={"/ordcreate"}>新增</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Search;
