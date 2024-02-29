import React, { useState, createContext, useContext } from "react";
import Search from "../components/Search";
import Show from "../components/Show";
import useFetchData from "../components/useFetchData";
import axiosFun from "../AxiosFun/axiosFun";
import "../assets/interface/interface.css";
import { Thecontex } from "../App";

export const ProvideData = createContext();
const Interface = ({ isOrder, changePage }) => {
  const [toRender, compareWhithQuery, setToRender, setCompareWhithQuery] =
    useFetchData(isOrder, null, "https://crud-project-yh8x.onrender.com");

  const [basicUrl /* ignored */] = useState(
    "https://crud-project-yh8x.onrender.com"
  );
  const [eachPageAmount /* ignored */] = useState(5);
  const { Loading } = useContext(Thecontex);
  const redo = async () => {
    let url;
    isOrder
      ? (url = `${basicUrl}/OrdDataAll`)
      : (url = `${basicUrl}/CustDataAll`);
    try {
      let response = await axiosFun.getOnly(url);

      setToRender(response.data);
      setCompareWhithQuery(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="interface">
      <Search
        basicUrl={basicUrl}
        setToRender={setToRender}
        isOrder={isOrder}
        toRender={toRender}
        redo={redo}
        changePage={changePage}
        setCompareWhithQuery={setCompareWhithQuery}
        compareWhithQuery={compareWhithQuery}
      />
      {!toRender ? (
        <Loading />
      ) : (
        <ProvideData.Provider
          value={{
            basicUrl,
            redo,
            isOrder,
            data: toRender,
          }}
        >
          <Show
            key="order"
            eachPageAmount={eachPageAmount}
            data={toRender}
            isOrder={isOrder}
            redo={redo}
          />
        </ProvideData.Provider>
      )}
    </div>
  );
};

export default Interface;
