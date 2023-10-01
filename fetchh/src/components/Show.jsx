import React, { useState, useContext } from "react";
import { Thecontex } from "../App";
import "../assets/show/show.css";
import { Link } from "react-router-dom";

const Show = ({ data, data2, deleteInf2, deleteInf }) => {
  const theVal = useContext(Thecontex); // 透過useContext從app.js拿到的數據，可能來判斷目前處於哪個route並決定出現在該route的元素

  return (
    <>
      {/* 只要route是顯示客戶資料的route就顯示此<table>*/}
      {theVal.custpath && (
        <table>
          <thead>
            <tr>
              <th colSpan="2">{""}</th>
              {theVal.CustinputArr.map((item) => (
                <th>{item}</th>
              ))}
              <th>Status</th>
              <th>三年的訂單消費總和</th>
            </tr>
          </thead>
          <tbody>
            {/* data是在父親元件interface.jsx當中儲存查詢客戶資料結果的變數，查找到的內容會在這邊呈現 */}
            {data &&
              data.map((item) => (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {/* 會進入客戶資料的修改頁面*/}
                    <button>
                      <Link to={`/custEdit/${item.ID}`}>修改</Link>
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {/* deleteInf是富元素interface.jsx當中的可帶入參數進行刪除客戶資料的function，這邊帶入藥傳到後端的route和查找到的id*/}
                    <button
                      onClick={() => {
                        deleteInf(
                          `http://localhost:3503/CustDelete/${item.UID}`,
                          { id: item.ID }
                        );
                      }}
                    >
                      刪除
                    </button>
                  </td>
                  <td>{item.UID}</td>
                  <td>{item.ID}</td>
                  <td>{item.Name}</td>
                  <td>{item.Country}</td>
                  <td>{item.State}</td>
                  <td>{item.Zip}</td>
                  <td>{item.City}</td>
                  <td>{item.Address}</td>
                  <td>{item.Status}</td>
                  <td>{item.ThreeYearTotalAmount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* 只要route是顯示訂單資料的route就顯示此<table>*/}
      {theVal.ordpath && (
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
          <tbody>
            {/* data2是在父親元件interface.jsx當中儲存查詢定但資料結果的變數，查找到的內容會在這邊呈現 */}
            {data2 &&
              data2.map((item) => (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {/* 會進入訂單資料的修改頁面*/}
                    <button>
                      <Link to={`/ordEdit/${item.ID}`}>修改</Link>
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {/* deleteInf2是父元件interface.jsx當中的可帶入參數進行刪除訂單資料的function，這邊帶入藥傳到後端的route和查找到的id*/}
                    <button
                      onClick={() => {
                        deleteInf2(
                          `http://localhost:3503/OrdDelete/${item.ID}`,
                          { id: item.ID }
                        );
                      }}
                    >
                      刪除
                    </button>
                  </td>

                  <td>{item.ID}</td>
                  <td>{item.Customer_ID}</td>
                  <td>{item.TotalAmount}</td>
                  <td>{item.Status}</td>
                  <td>{item.Sales_Name}</td>
                  <td>{item.Order_Date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Show;
