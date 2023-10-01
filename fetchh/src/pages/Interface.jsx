import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import Search from "../components/Search";
import Show from "../components/Show";
import { Thecontex } from "../App";
import axiosFun from "../AxiosFun/axiosFun";
import "../assets/interface/interface.css";

const Interface = () => {
  console.log("before render");
  const thePath = useContext(Thecontex);

  const [data, setdata] = useState([]); //用來接收查找客戶資料結果
  const [data2, setdata2] = useState([]); // 用來接收查找訂單資料結果

  //當使用者進入客戶資料頁面時，可以先看到全部的客戶資料
  const CsutCallback = useCallback(() => {
    const ShowCustALL = async () => {
      try {
        let response = await axiosFun.getOnly(
          "http://localhost:3503/CustDataAll"
        );
        setdata(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    ShowCustALL();
  }, []);
  useEffect(() => {
    CsutCallback();
    console.log("Cust after render");
  }, [CsutCallback]);

  //當使用者進入訂單資料頁面時，可以先看到全部的訂單資料
  const OrdCallback = useCallback(() => {
    const ShowOrdALL = async () => {
      try {
        let response = await axiosFun.getOnly(
          "http://localhost:3503/OrdDataAll"
        );
        setdata2(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    ShowOrdALL();
  }, []);
  useEffect(() => {
    OrdCallback();
    console.log("Ord after render");
  }, [OrdCallback]);

  //當使用者按下刪除，在資料庫進行刪除客戶資料後，會進行重新查找更新的動作
  const AfterDeleteShowCustALL = async () => {
    try {
      let response = await axiosFun.getOnly(
        "http://localhost:3503/CustDataAll"
      );
      setdata(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteInf = async (url, obj) => {
    try {
      let respnse = await axiosFun.delete(url, obj);
      console.log(respnse);
      alert("刪除成功");
      AfterDeleteShowCustALL();
    } catch (e) {
      console.log(e);
      alert("刪除失敗");
    }
  };

  //當使用者按下刪除，在資料庫進行刪除訂單資料後，會進行重新查找更新的動作
  const AfterDeleteShowOrdALL = async () => {
    try {
      let response = await axiosFun.getOnly("http://localhost:3503/OrdDataAll");
      setdata2(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteInf2 = async (url, obj) => {
    try {
      let respnse = await axiosFun.delete(url, obj);
      console.log(respnse);
      alert("刪除成功");
      AfterDeleteShowOrdALL();
    } catch (e) {
      console.log(e);
      alert("刪除失敗");
    }
  };

  //重新整理function當使用者按下重新整理會恢復成員本剛進入頁面時的畫面
  const Redo = (path) => {
    if (path === "/") {
      CsutCallback();
    } else {
      OrdCallback();
    }
  };

  return (
    <div className="interface">
      {console.log("render")}
      {thePath.custpath && (
        <Search
          setdata={setdata}
          Redo={() => {
            Redo(thePath.custpath);
          }}
        />
      )}

      {thePath.ordpath && (
        <Search
          setdata2={setdata2}
          Redo={() => {
            Redo(thePath.ordpath);
          }}
        />
      )}

      {thePath.custpath && <Link to={"/order"}>檢視訂單頁</Link>}
      {thePath.ordpath && <Link to={"/"}>檢視客戶頁</Link>}
      <p
        style={{
          fontSize: "1rem",
          marginLeft: "0.5rem",
          marginTop: "0.8rem",
          padding: "0.5rem",
          backgroundColor: "black",
          color: "white",
        }}
      >
        使用搜尋條件搜尋只會出現Status為1的資料
      </p>
      {thePath.custpath && (
        <Show
          data={data}
          AfterDeleteShowCustALL={AfterDeleteShowCustALL}
          deleteInf={deleteInf}
        />
      )}
      {thePath.ordpath && <Show deleteInf2={deleteInf2} data2={data2} />}
    </div>
  );
};

export default Interface;
